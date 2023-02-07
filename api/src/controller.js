const knex = require('knex')(
  require('../knexfile.js')[process.env.NODE_ENV || 'development']
);

// login or registration ////////////////////////////////////////

// const postNewUser = async userInfo => {
//   // console.log(userInfo);
//   let results = await knex('user_table').insert(userInfo, ['*']);
//   delete results.password;
//   return results;
// }; // delete if found after 2022 cause it didnt break anything

const userCheck = async email => {
  console.log(email);
  let results = await knex('user_table').select('*').where('email', email);
  if (results[0] === undefined) {
    return null;
  } else {
    console.log('user found', results[0]);
    return results[0];
  }
};

// helper functions //////////////////////////////////////
const addWeapon = async users => {
  let modifiedUsers = users;
  for (let user of modifiedUsers) {
    let newWeapons = await knex('weapon_user')
      .select('weapon', 'weapon.*')
      .where('user_id', user.id)
      .fullOuterJoin('weapon', 'weapon_id', '=', 'weapon.id');
    user.weapons = newWeapons;
    //if this throws us for a loop on the front end, write
    //function to empty weapons array null values
  }
  return modifiedUsers;
};
const addCerts = async users => {
  let modifiedUsers = users;
  for (let user of modifiedUsers) {
    let newCerts = await knex('certification')
      .select('*')
      .where('id', user.cert_id);
    user.certs = newCerts;
  }
  return modifiedUsers;
};

const addFlight = async users => {
  let modifiedUsers = users;
  for (let user of modifiedUsers) {
    let flightInfo = await knex('flight').select('*').where('id', user.flight);
    user.flight = flightInfo[0];
    if (user.flight === undefined) {
      user.flight = null;
    }
  }
  return modifiedUsers;
};

const postWeapon = async posts => {
  let modifiedPosts = posts;
  for (let post of modifiedPosts) {
    let newWeapons = await knex('weapon_position')
      .select('*')
      .where('position_id', post.id)
      .fullOuterJoin('weapon', 'weapon_id', '=', 'weapon.id');
    post.weapon_req = newWeapons;
  }
  return modifiedPosts;
};

const postCert = async posts => {
  let modifiedPosts = posts;
  for (let post of modifiedPosts) {
    let newCert = await knex('certification')
      .select('*')
      .where('id', post.cert_id);
    post.cert_req = newCert;
  }
  return modifiedPosts;
};

const postFlight = async posts => {
  let modifiedPosts = posts;
  for (let post of modifiedPosts) {
    let flightInfo = await knex('certification')
      .select('*')
      .where('id', post.flight_assigned);
    post.flightInfo = flightInfo;
    if (post.flightInfo === undefined) {
      post.flightInfo = null;
    }
  }
  return modifiedPosts;
};

// user /////////////////////////////////////////////////////////////
const getAllUsers = async () => {
  let users = await knex('user_table')
    .select(
      'id',
      'first_name',
      'last_name',
      'rank',
      'flight',
      'cert_id',
      'weapon_arming',
      'admin',
      'notes',
      'email',
      'avatar',
      'avatar_background',
      'status'
    )
    .orderBy('last_name', 'asc');
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  let flightUsers = await addFlight(certUsers);
  return flightUsers;
};

const searchUsers = async searchInput => {
  searchInput = searchInput.toLowerCase();
  console.log('search input: ', searchInput);
  let users = await knex('user_table')
    .select('*')
    .whereILike('first_name', `%${searchInput}%`)
    .orWhereILike('last_name', `%${searchInput}%`);
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  return certUsers;
};

const individualUser = async id => {
  let users = await knex('user_table').where({ id: id });
  let wepUsers = await addWeapon(users);
  let certUsers = await addCerts(wepUsers);
  let flightUsers = await addFlight(certUsers);
  return flightUsers;
};

const deleteWeaponUser = async userId => {
  let results = await knex('weapon_user')
    .where({ user_id: userId })
    .delete(['*']);
  return results;
};

const postWeaponUser = async (userId, wepArray) => {
  console.log('userId: ', userId, 'wep array, ', wepArray);

  if (wepArray.length > 0) {
    let insertInfo = wepArray.map(wep => {
      let postObject = {
        user_id: parseInt(userId),
        weapon_id: wep,
      };
      return postObject;
    });
    let result = await knex('weapon_user').insert(insertInfo, ['*']);
    console.log('results of insert to weapon_user', result);
    return result;
  }
};

const postUsers = async users => {
  for (let user of users) {
    if (user.weaponIdArray) {
      const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        admin: user.admin,
        rank: user.rank,
        cert_id: user.cert_id,
        email: user.email,
        weapon_arming: user.weapon_arming,
        notes: user.notes,
        flight: user.flight,
        password: user.password,
      };
      if (newUser.flight === '') {
        delete newUser.flight;
      }

      console.log('newUser information: ', newUser);
      let result = await knex('user_table').insert(newUser, ['*']);
      await postWeaponUser(result[0].id, user.weaponIdArray);
      return result;
    } else {
      let result = await knex('user_table').insert(users, ['*']);
      let notification = await knex('notification_user').insert({
        notification_id: 1,
        user_id: result[0].id,
        read: false,
      });
      console.log('register notification result ', notification);
      return result;
    }
  }
};

const postPwReset = async userPw => {
  console.log('PwReset controller', userPw);
  return await knex('user_table')
    .where({ email: userPw.email })
    .update(userPw, ['*']);
};

const updateUser = async req => {
  console.log('This is req.body for update user: ', req.body);

  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    admin: req.body.admin,
    rank: req.body.rank,
    cert_id: req.body.cert_id,
    email: req.body.email,
    weapon_arming: req.body.weapon_arming,
    notes: req.body.notes,
    flight: req.body.flight,
    avatar: req.body.avatar,
    // status: req.body.status
  };
  // console.log('new user ', newUser);

  if (req.body.weaponIdArray !== undefined) {
    await deleteWeaponUser(req.params.id);
    await postWeaponUser(req.params.id, req.body.weaponIdArray);
    return await knex('user_table')
      .where({ id: req.params.id })
      .update(newUser);
  } else {
    // knex.raw('TRUNCATE users_table CASCADE');
    return await knex('user_table')
      .where({ id: req.params.id })
      .update(req.body);
  }
};

const updateMultipleUsers = async users => {
  let results = [];
  for (let user of users) {
    for (let key in user) {
      if (user[key] === '') delete user[key];
    }
    if (Object.keys(user).length === 0) {
      return;
    }
    console.log('user', user);
    let output = await knex('user_table')
      .where('email', user.email)
      .update(user, ['*']);
    results.push(output[0]);
  }
  console.log('update multiple users: ', results);
  return results;
};

// schedules //////////////////////////////////////////////
const getAllSchedule = async () => {
  let schedules = await knex('post_schedule').select('*');
  let schedUsers = await schedAddUsers(schedules);
  let schedPositions = await schedAddPositions(schedUsers);
  return schedPositions;
};

const getScheduleById = async userId => {
  let schedules = await knex('post_schedule')
    .where({ user_id: userId })
    .select('*');
  let schedUsers = await schedAddUsers(schedules);
  let schedPositions = await schedAddPositions(schedUsers);
  return schedPositions;
};

const getIfScheduleFilled = async checkDates => {
  // console.log('if schedule filled: ', checkDates);
  // ToDo
  let dateFilledResults = checkDates;
  let positions = await knex('position').select('*').orderBy('id', 'asc');

  let positionsMids = await knex('position')
    .select('*')
    .where('shift', 'mids')
    .orderBy('id', 'asc');

  let positionsDays = await knex('position')
    .select('*')
    .where('shift', 'days')
    .orderBy('id', 'asc');

  for (let dateCheck of dateFilledResults) {
    // dateCheck ex. { date: '2022-11-01', filled: null, shift: 'all'}
    // grab all posts by shift
    // check by date if schedule has number of people for man required
    const totalManningFilledCheck = async () => {
      let totalManningFilled = [];
      for (let post of positions) {
        let schedules = await knex('post_schedule')
          .select('*')
          .where('position_id', post.id)
          .andWhere('date', `${dateCheck.date}T00:00:00.000Z`);

        if (schedules.length >= Number(post.man_req) && post.shift === 'days') {
          // console.log(post.shift);
          totalManningFilled.push('days');
        } else if (
          schedules.length >= Number(post.man_req) &&
          post.shift === 'mids'
        ) {
          totalManningFilled.push('mids');
        }
        // todo make a set to remove duplicates
      }
      return totalManningFilled;
    };
    let manningFilled = await totalManningFilledCheck();
    //console.log('dateCheck', dateCheck);
    dateCheck.filled = manningFilled;
    dateCheck.positions_all = positions.length;
    dateCheck.positions_days = positionsDays.length;
    dateCheck.positions_mids = positionsMids.length;
  }

  // return if the position has been filled
  return dateFilledResults;
};

const schedAddUsers = async schedules => {
  let newSchedules = schedules;
  for (let schedule of newSchedules) {
    // call user by id and add to sched
    let userInfo = await individualUser(schedule.user_id);
    delete userInfo[0].password;
    schedule.user_info = userInfo;
  }
  return newSchedules;
};
const schedAddPositions = async schedules => {
  let newSchedules = schedules;
  for (let schedule of newSchedules) {
    // call user by id and add to sched
    let positionInfo = await knex('position').where({
      id: schedule.position_id,
    });
    schedule.position_info = positionInfo;
  }
  return newSchedules;
};

const getScheduleByDate = async props => {
  // console.log('before knex date', props)
  let schedules = await knex('post_schedule')
    .select('*')
    .whereBetween('date', [props.date, props.dateEnd]);
  let schedUsers = await schedAddUsers(schedules);
  return schedUsers;
};

const patchSchedule = async schedule => {
  console.log(schedule);
  let results = await knex('post_schedule').insert(schedule, ['*']);
  return results;
};

const deleteScheduleById = async id => {
  console.log('deleteing schedule', id);
  let results = await knex('post_schedule').where('id', id).del(['*']);
  return results;
};

const deleteUser = async id => {
  await deleteWeaponUserByUser(id);
  await deletePostSchedule(id);
  await deleteNotificationsByUserId(id);
  return await knex('user_table').where({ id: id }).delete();
};

const gatAllPost = async () => {
  let posts = await knex('post').select('*').orderBy('id', 'asc');
  return posts;
};

const postName = async positions => {
  let currentPositions = positions;
  for (let position of currentPositions) {
    let postNames = await knex('post')
      .select('*')
      .where({ id: position.post_id });
    position.name = postNames[0];
  }
  return currentPositions;
};

// position /////////////////////////////////////////////////////////////
const getAllposition = async () => {
  let positions = await knex('position').select('*').orderBy('id', 'asc');
  let positionName = await postName(positions);
  let positionsWeapon = await postWeapon(positionName);
  let positionsCerts = await postCert(positionsWeapon);
  let positionFlights = await postFlight(positionsCerts);
  return positionFlights;
};

const getPositionByDate = async props => {
  // props should have { start_date: 'date', end_date: 'date'}
  console.log('before position date', props);
  let positions = await knex('position')
    .select('*')
    .whereBetween('start_datetime', [props.start_date, props.end_date])
    // .orWhereBetween('end_datetime', [props.start_date, props.end_date])
    .orderBy('id', 'asc');
  let positionName = await postName(positions);
  let positionsWeapon = await postWeapon(positionName);
  let positionsCerts = await postCert(positionsWeapon);
  let positionFlights = await postFlight(positionsCerts);
  return positionFlights;
};

const allWeapons = () => {
  return knex('weapon').select('*');
};

const allFlights = () => {
  return knex('flight').select('*');
};

const deleteWeaponPosition = async positionId => {
  let results = await knex('weapon_position')
    .where({ position_id: positionId })
    .delete(['*']);
  return results;
};

const postWeaponPosition = async (positionId, wepArray) => {
  let insertInfo = wepArray.map(wep => {
    let postObject = {
      position_id: parseInt(positionId),
      weapon_id: wep,
    };
    return postObject;
  });
  let result = await knex('weapon_position').insert(insertInfo, ['*']);
  console.log('results of insert to weapon_position', result);
  return result;
};

// post object
// {
// post_name: 'name',
// description: 'blah',
// }

const patchPosition = async req => {
  console.log('this is req.body for patch position: ', req.body);
  let patchObject = {
    man_req: req.body.man_req,
    cert_id: req.body.cert_id,
    shift: req.body.shift,
    flight_assigned: req.body.flight_assigned,
    post_id: req.body.post_id,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime,
  };

  if (req.body.weapon_req.length !== 0) {
    await deleteWeaponPosition(req.params.id);
    console.log('between delete and post');
    await postWeaponPosition(req.params.id, req.body.weapon_req);
    console.log('between post and patch');
  }
  console.log('After weapon req check');
  let result = await knex('position')
    .where({ id: req.params.id })
    .update(patchObject, ['*']);
  return result;
};

const postPosition = async req => {
  console.log('this is req.body for post position: ', req.body);
  let postObject = {
    man_req: req.body.man_req,
    cert_id: req.body.cert_id,
    shift: req.body.shift,
    flight_assigned: req.body.flight_assigned,
    post_id: req.body.post_id,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime,
  };

  // if (!postObject.post_id) {
  //   // blah
  // }

  let result = await knex('position').insert(postObject, ['*']);
  console.log('result ', result);
  await postWeaponPosition(result[0].id, req.body.weapon_req);
  return result;
};

const deletePosition = async positionId => {
  console.log('delete position ran');
  await deleteWeaponPosition(positionId);
  await deletePostScheduleByPosition(positionId);
  let result = await knex('position').where({ id: positionId }).delete(['*']);
  console.log('delete position result ', result);
  return result;
};

// Post //////////////////////////////////////////////////
const patchPost = async req => {
  if (req.params.id) {
    console.log('inside param check', req.params);
    let result = await knex('post')
      .where({ id: req.params.id })
      .update(req.body, ['*']);
    return result;
  } else {
    let result = await knex('post').insert(req.body, ['*']);
    return result;
  }
};

const deletePost = async post_id => {
  // need to check if post is being used by positions before deleting
  //
  //
  //
  let result = await knex('post').where({ id: post_id }).delete(['*']);
  return result;
};
///////////////////////////////////////////// Post ///////

const updateWeaponUser = req => {
  knex.raw('TRUNCATE weapon_user CASCADE');
  return knex('weapon_user').where({ id: req.params.id }).update(req.body);
};

const deleteWeaponUserByUser = async userId => {
  return knex('weapon_user').where({ user_id: userId }).delete();
};

const deletePostSchedule = async userId => {
  return knex('post_schedule').where({ user_id: userId }).delete();
};

const deletePostScheduleByPosition = async positionId => {
  return knex('post_schedule').where({ position_id: positionId }).delete();
};

const addPassword = async props => {
  let { user, id } = props;
  const result = await knex('user_table').where('id', id).update(user, ['*']);
  console.log('add password ', result);
  return result;
};

// notifications //////////////////////////////////////////////////
const getNotificationById = async id => {
  //console.log('get notification id ', id);
  const result = await knex('notification').select('*').where({ id: id });
  return result[0];
};

const getAllNotificationsById = async id => {
  console.log('get all notifications userID', id);
  let joinTable = await knex('notification_user')
    .select('*')
    .where({ user_id: id });
  for (let join of joinTable) {
    if (join.user_id !== null || join.notification_id !== null) {
      let userObj = await individualUser(join.user_id);
      delete userObj[0].password;
      join.user = userObj[0];

      let notifObj = await getNotificationById(join.notification_id);
      join.notification = notifObj;
    }
  }
  return joinTable;
};

const getAllNotifications = async () => {
  let joinTable = await knex('notification_user')
    .select('*')
    .orderBy('id', 'asc');

  for (let join of joinTable) {
    if (join.user_id !== null || join.notification_id !== null) {
      let userObj = await individualUser(join.user_id);
      delete userObj[0].password;
      join.user = userObj[0];

      let notifObj = await getNotificationById(join.notification_id);
      join.notification = notifObj;
    }
  }
  return joinTable;
};

const patchNotifications = async ({ notification }) => {
  console.log('patch notifications ran ', notification);

  let result = await knex('notification_user')
    .where({ id: notification.id })
    .update({ read: notification.read }, ['*']);
  return result;
};

const deleteNotificationsById = async joinId => {
  console.log('delete notifications', joinId);
  let result = await knex('notification_user')
    .where({ id: joinId })
    .delete(['*']);
  console.log('delete notification results', result);
  return result;
};

const deleteNotificationsByUserId = async userId => {
  console.log('delete notifications userId ', userId);
  let result = await knex('notification_user')
    .where({ user_id: userId })
    .delete(['*']);
  console.log('delete notification results', result);
  return result;
};

const postNotification = async ({ userId, notification }) => {
  console.log('post notification ran', userId, notification);
  let joinResult = await knex('notification').insert(notification, ['*']);

  if (userId === 'all') {
    let allUserIds = await knex('user_table').select('id');
    console.log(allUserIds);

    for (let user of allUserIds) {
      await knex('notification_user').insert(
        {
          user_id: user.id,
          notification_id: joinResult[0].id,
        },
        ['*']
      );
    }
  } else if (userId === 'admin') {
    let allAdmins = await knex('user_table')
      .select('id')
      .where({ admin: true });
    console.log(allAdmins);
    console.log('this is all admins ', allAdmins);
    for (let user of allAdmins) {
      await knex('notification_user').insert(
        {
          user_id: user.id,
          notification_id: joinResult[0].id,
        },
        ['*']
      );
    }
  } else {
    let result = await knex('notification_user').insert(
      {
        user_id: userId,
        notification_id: joinResult[0].id,
      },
      ['*']
    );
    // .where({ user_id: userId });
    console.log(
      'post notification join results',
      joinResult,
      'result ',
      result
    );
    return result;
  }
};

module.exports = {
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
  searchUsers,
  getAllposition,
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
  getPositionByDate,
  gatAllPost,
  patchPost,
  deletePost,
};
