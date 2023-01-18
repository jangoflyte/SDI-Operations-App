const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()

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
  getAllNotificationsById,
  patchNotifications,
  deleteNotificationsById,
  postNotification,
  deleteNotificationsByUserId,
  getIfScheduleFilled,
  postPwReset,
  getPositionByDate
} = require('./controller.js')

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.cyberhelm.com',
  'http://www.cyberhelm.com',
  'https://api.cyberhelm.com',
  'http://api.cyberhelm.com'
]
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else if (origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// middleware ////////////////////////////////
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
// app.use(express.bodyParser({ limit: '50mb' }));

// auth check middleware /////////////////////////////////////
const authenticateToken = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.auth
  // console.log(token);
  if (token === undefined) return res.status(401).send('no token')

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err)
    req.user = user
    next()
  })
}

app.post('/login', async (req, res) => {
  // authenticate user
  const user = await userCheck(req.body.email)
  // console.log('usercheck: ', user, `\nemail: `, req.body.email);
  if (user === null) return res.status(400).send('Cannot find user')
  try {
    // console.log(user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userToken = { email: user.email }
      const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET)
      delete user.password
      res
        .status(200)
        // .cookie('auth', accessToken, { maxAge: 900000 })
        .send({
          status: 'success',
          user: user,
          cookie: ['auth', accessToken, { maxAge: 900000 }]
        })
    } else {
      res.status(403).send({
        status: 'not allowed'
      })
    }
  } catch {
    err => res.status(500).send({ status: err })
  }
})

//{first_name: 'John', last_name: 'Doe', rank: 'e5', flight: 'alpha-1',cert_id: 4, weapon_arming: true, admin: true }
app.post('/register', async (req, res) => {
  // console.log('recieved registration req', req.body);
  try {
    const { first_name, last_name, email, password, rank } = req.body
    // check if all information is provided
    if (!(email && password && first_name && last_name && rank)) {
      res.status(400).send('All input is required')
    }
    // create user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // console.log('salt', salt);
    // console.log('hashed pw', hashedPassword);
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      rank: rank,
      admin: false
    }

    // check if user exists already
    const userExist = await userCheck(email)
    // console.log('user exists', userExist);
    if (userExist !== null && userExist.password !== null) {
      return res.status(409).send('User Already Exist. Please Login')
    } else if (userExist !== null && userExist.password === null) {
      delete user.admin
      addPassword({ user: user, id: userExist.id })
        .then(results => {
          // console.log('creating token');
          const userToken = { email: user.email }
          const accessToken = jwt.sign(
            userToken,
            process.env.ACCESS_TOKEN_SECRET
          )
          delete results[0].password

          return res.status(201).send({
            status: 'success',
            user: results[0],
            cookie: ['auth', accessToken, { maxAge: 900000 }]
          })
        })
        .catch(err => res.status(500).send(err))
    } else {
      // push user to db
      postUsers([user])
        .then(results => {
          // console.log('creating token');
          const userToken = { email: user.email }

          const accessToken = jwt.sign(
            userToken,
            process.env.ACCESS_TOKEN_SECRET
          )
          delete results[0].password
          res.status(201).send({
            status: 'success',
            user: results[0],
            cookie: ['auth', accessToken, { maxAge: 900000 }]
          })
        })
        .catch(err => res.status(500).send(err))
    }
  } catch {
    res.status(500).send()
  }
})

app.post('/pwreset', authenticateToken, async (req, res) => {
  try {
    const { email, password } = req.body
    // check if all information is provided
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    // create user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log('salt', salt);
    // console.log('hashed pw', hashedPassword);
    const userUpdate = {
      email: email,
      password: hashedPassword
    }

    postPwReset(userUpdate)
      .then(data => {
        delete data[0].password
        console.log(data[0])
        res.status(200).send(data[0])
      })
      .catch(err => res.status(500).send(err))
  } catch {
    err => res.status(500).send({ status: err })
  }
})

// notifications ///////////////////////////////////////////////////
app.get('/notifications', authenticateToken, (req, res) => {
  getAllNotifications()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/notifications/:userId', authenticateToken, (req, res) => {
  getAllNotificationsById(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

// todo, secure this route for users requesting pw reset
// app.post('/notifications/:userId', authenticateToken, (req, res) => {
app.post('/notifications/:userId', (req, res) => {
  //post notification with userid?
  postNotification({ userId: req.params.userId, notification: req.body })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.delete('/notifications/:joinId', authenticateToken, (req, res) => {
  deleteNotificationsById(req.params.joinId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.delete('/notifications/user/:userId', authenticateToken, (req, res) => {
  deleteNotificationsByUserId(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.patch('/notifications/:id', authenticateToken, (req, res) => {
  patchNotifications({ id: req.params.id, notification: req.body })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
  //update notification read status
})

///////////////////////////////////////////// home ///////////

// app.get('/', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.status(200).send('Welcome to the API');
// });

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.status(200).sendFile(path.join(__dirname, '/index.html'))
})

// Schedule ///////////////////////////////////////////////////////////
app.get('/schedule', authenticateToken, (req, res) => {
  getAllSchedule()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/schedule/:userId', authenticateToken, (req, res) => {
  getScheduleById(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.post('/schedule/date', authenticateToken, (req, res) => {
  console.log('recieved schedule date req', req.body)
  getScheduleByDate(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.patch('/schedule', authenticateToken, (req, res) => {
  console.log('recieved schedule patch', req.body)
  patchSchedule(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.delete('/schedule/:id', authenticateToken, (req, res) => {
  let { id } = req.params
  console.log('recieved schedule patch', req.body)
  deleteScheduleById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.post('/schedule/filled', authenticateToken, (req, res) => {
  getIfScheduleFilled(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

///////////////////////////////////////////// schedule ////////////////

app.get('/users', authenticateToken, (req, res) => {
  getAllUsers()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/usersearch', authenticateToken, (req, res) => {
  getAllUsers()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/usersearch/:search', authenticateToken, (req, res) => {
  searchUsers(req.params.search)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/users/:id', authenticateToken, (req, res) => {
  let { id } = req.params
  individualUser(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/allweapons', authenticateToken, (req, res) => {
  allWeapons()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/position', authenticateToken, (req, res) => {
  getAllposition()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.post('/position/date', authenticateToken, (req, res) => {
  console.log('recieved position date req', req.body)
  getPositionByDate(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.get('/flight', authenticateToken, (req, res) => {
  allFlights()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.patch('/position/:id', authenticateToken, (req, res) => {
  console.log('patching position')
  patchPosition(req)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.post('/position', authenticateToken, (req, res) => {
  console.log('posting position')
  postPosition(req)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.delete('/position/:id', authenticateToken, (req, res) => {
  console.log('deleting position')
  deletePosition(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
})

app.post('/postusers', authenticateToken, (req, res) => {
  console.log('posting users')
  postUsers(req.body)
    .then(() => res.send({ message: 'We have posted a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

app.post('/postweaponuser', authenticateToken, (req, res) => {
  postWeaponUser(req.body)
    .then(() => res.send({ message: 'We have posted a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

app.patch('/updateuser/:id', authenticateToken, (req, res) => {
  updateUser(req)
    .then(() => res.send({ message: 'We have updated a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

app.patch('/updateusers', authenticateToken, (req, res) => {
  updateMultipleUsers(req.body)
    .then(data =>
      res.send({ message: 'We have updated a users.', users: data })
    )
    .catch(err => res.status(500).send(console.log(err)))
})

app.patch('/updateweaponuser/:id', authenticateToken, (req, res) => {
  updateWeaponUser(req)
    .then(() => res.send({ message: 'We have updated a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

app.delete('/deleteuser/:id', authenticateToken, (req, res) => {
  deleteUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

app.delete('/deleteweaponuser/:id', authenticateToken, (req, res) => {
  deleteWeaponUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a weapon from a user.' }))
    .catch(err => res.status(500).send(console.log(err)))
})

module.exports = app
