const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// controller imports ///////////////////////////
const {
  getAllUsers,
  postUsers,
  individualUser,
  postWeaponUser,
  deleteUser,
  updateUser,
  updateWeaponUser,
  allWeapons,
  deleteWeaponUser,
  onlyWeaponUserTable,
  getAllSchedule,
  getScheduleByDate,
  getAllposition,
  searchUsers,
  patchSchedule,
  deleteScheduleById,
  patchPosition,
  userCheck,
  allFlights,
  postPosition,
  deletePosition,
  updateMultipleUsers,
  getScheduleById,
  addPassword,
  getAllNotifications,
} = require('./controller.js');

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.cyberhelm.com',
  'http://www.cyberhelm.com',
  'https://api.cyberhelm.com',
  'http://api.cyberhelm.com',
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// middleware ////////////////////////////////
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// app.use(express.bodyParser({ limit: '50mb' }));

// auth check middleware /////////////////////////////////////
const authenticateToken = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.auth;
  // console.log(token);
  if (token === undefined) return res.status(401).send('no token');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    req.user = user;
    next();
  });
};

app.post('/login', async (req, res) => {
  // authenticate user
  const user = await userCheck(req.body.email);
  console.log('usercheck: ', user, `\nemail: `, req.body.email);
  if (user === null) return res.status(400).send('Cannot find user');
  try {
    // console.log(user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userToken = { email: user.email };
      const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET);
      delete user.password;
      res
        .status(200)
        // .cookie('auth', accessToken, { maxAge: 900000 })
        .send({
          status: 'success',
          user: user,
          cookie: ['auth', accessToken, { maxAge: 900000 }],
        });
    } else {
      res.status(403).send({
        status: 'not allowed',
      });
    }
  } catch {
    err => res.status(500).send({ status: err });
  }
});

//{first_name: 'John', last_name: 'Doe', rank: 'e5', flight: 'alpha-1',cert_id: 4, weapon_arming: true, admin: true }
app.post('/register', async (req, res) => {
  console.log('recieved registration request', req.body);
  try {
    const { first_name, last_name, email, password, rank } = req.body;
    // check if all information is provided
    if (!(email && password && first_name && last_name && rank)) {
      res.status(400).send('All input is required');
    }
    // create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log('salt', salt);
    console.log('hashed pw', hashedPassword);
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      rank: rank,
      admin: false,
    };

    // check if user exists already
    const userExist = await userCheck(email);
    console.log('user exists', userExist);
    if (userExist !== null && userExist.password !== null) {
      return res.status(409).send('User Already Exist. Please Login');
    } else if (userExist !== null && userExist.password === null) {
      delete user.admin;
      addPassword({ user: user, id: userExist.id })
        .then(results => {
          console.log('creatifng token');
          const userToken = { email: user.email };
          const accessToken = jwt.sign(
            userToken,
            process.env.ACCESS_TOKEN_SECRET
          );
          delete results[0].password;
          return (
            res
              .status(201)
              // .cookie('auth', accessToken, { maxAge: 900000 })
              .send({
                status: 'success',
                user: results[0],
                cookie: ['auth', accessToken, { maxAge: 900000 }],
              })
          );
        })
        .catch(err => res.status(500).send(err));
    } else {
      // push user to db
      postUsers([user])
        .then(results => {
          console.log('creating token');
          const userToken = { email: user.email };

          const accessToken = jwt.sign(
            userToken,
            process.env.ACCESS_TOKEN_SECRET
          );
          delete results[0].password;
          res
            .status(201)
            // .cookie('auth', accessToken, { maxAge: 900000 })
            .send({
              status: 'success',
              user: results[0],
              cookie: ['auth', accessToken, { maxAge: 900000 }],
            });
        })
        .catch(err => res.status(500).send(err));
    }
  } catch {
    res.status(500).send();
  }
});

app.get('/notifications', (req, res) => {
  getAllNotifications()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.status(200).send('Welcome to the API');
});

app.get('/schedule', (request, response) => {
  getAllSchedule()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/schedule/:userId', (request, response) => {
  getScheduleById(request.params.userId)
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.post('/schedule/date', (req, res) => {
  console.log('recieved schedule date req', req.body);
  getScheduleByDate(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.patch('/schedule/', (req, res) => {
  console.log('recieved schedule patch', req.body);
  patchSchedule(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/schedule/:id', (req, res) => {
  let { id } = req.params;
  console.log('recieved schedule patch', req.body);
  deleteScheduleById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/users', (request, response) => {
  getAllUsers()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/usersearch', (request, response) => {
  getAllUsers()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/usersearch/:search', (request, response) => {
  searchUsers(request.params.search)
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/users/:id', (req, res) => {
  let { id } = req.params;
  individualUser(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/allweapons', (req, res) => {
  allWeapons()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/onlyweaponusertable', (req, res) => {
  onlyWeaponUserTable()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/position', (req, res) => {
  getAllposition()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/flight', (req, res) => {
  allFlights()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.patch('/position/:id', (req, res) => {
  console.log('patching position');
  patchPosition(req)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/position', (req, res) => {
  console.log('posting position');
  postPosition(req)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/position/:id', (req, res) => {
  console.log('deleting position');
  deletePosition(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/postusers', (req, res) => {
  console.log('posting users');
  postUsers(req.body)
    .then(() => res.send({ message: 'We have posted a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.post('/postweaponuser', (req, res) => {
  postWeaponUser(req.body)
    .then(() => res.send({ message: 'We have posted a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.patch('/updateuser/:id', (req, res) => {
  updateUser(req)
    .then(() => res.send({ message: 'We have updated a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.patch('/updateusers', (req, res) => {
  updateMultipleUsers(req.body)
    .then(data =>
      res.send({ message: 'We have updated a users.', users: data })
    )
    .catch(err => res.status(500).send(console.log(err)));
});

app.patch('/updateweaponuser/:id', (req, res) => {
  updateWeaponUser(req)
    .then(() => res.send({ message: 'We have updated a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.delete('/deleteuser/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.delete('/deleteweaponuser/:id', (req, res) => {
  deleteWeaponUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a weapon from a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

module.exports = app;
