import React, { useState, useContext, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, Divider } from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MemberContext } from '../Components/MemberContext';
import PostMemberModal from './AddMember';
import EditSchedule from './EditSchedule';

export default function CollapsibleTable() {
  const { API } = useContext(MemberContext);
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [shift, setShift] = useState('Days');
  const [schedDate, setSchedDate] = useState(new Date());

  // let currentDate = new Date().toISOString().split('T')[0];

  let dateEnd = new Date();
  dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7))
    .toISOString()
    .split('T')[0];

  // console.log('todays date, date end', currentDate, dateEnd);

  const fetchPosts = () => {
    console.log('fetching positions');
    fetch(`${API}/position`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setPositions(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const fetchSchedule = () => {
    console.log('fetching schedule', schedDate);
    let fetchDate = schedDate.toISOString().split('T')[0];
    fetch(`${API}/schedule/date`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ date: fetchDate, dateEnd: dateEnd }),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setSchedule(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const delSchedule = id => {
    console.log(`deleting schedule ${id}`);
    fetch(`${API}/schedule/${id}`, {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log(data);
        fetchSchedule();
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  useEffect(() => {
    fetchSchedule();
    fetchPosts();
  }, [schedDate]);

  const PostList = (
    name,
    man_req,
    weapon_req,
    cert_req,
    users,
    post_id,
    fetchSchedule,
    delSchedule,
    currentDate,
    shift
  ) => {
    let weapons = weapon_req.map(weapon => weapon.weapon);
    weapons = weapons.join(' ');
    let cert = cert_req;

    return {
      name,
      man_req,
      weapons,
      cert,
      users,
      post_id,
      fetchSchedule,
      delSchedule,
      currentDate,
      shift,
    };
  };

  const rows = useMemo(() => {
    let row = [];
    let shiftTime;
    if (shift === 'Days') shiftTime = '06:00:00';
    if (shift === 'Mids') shiftTime = '18:00:00';

    if (positions.length > 0) {
      row = positions.map(position => {
        // figure out personnel position and push to postlist generation
        // console.log('selectedDate', selectedDate)

        // if (schedule[0] !== undefined)  console.log('schedule date', schedule[0].date)
        let filUsers = schedule.filter(
          sched =>
            sched.position_id === position.id &&
            sched.date.split('T')[0] ===
              schedDate.toISOString().split('T')[0] &&
            sched.time === shiftTime
        );
        // console.log(position.name)
        while (filUsers.length < position.man_req) {
          filUsers.push({ noUser: true });
        }
        // console.log('fil schedule', filUsers)
        return PostList(
          position.name,
          position.man_req,
          position.weapon_req,
          position.cert_req,
          filUsers,
          position.id,
          fetchSchedule,
          delSchedule,
          schedDate,
          shift
        );
      });
    }
    return row;
  }, [positions, schedule, schedDate, shift]);

  let dateRange = [];
  for (let i = 0; i < 7; i++) {
    let workingDate = new Date();
    workingDate = new Date(workingDate.setDate(workingDate.getDate() + i));
    dateRange.push(workingDate);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography variant='h1' component='h2'>
        {schedDate.toDateString()}
      </Typography>
      {shift === 'Days' && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h5'>{`Panama 12's `}</Typography>
          <Typography
            variant='h5'
            ml={2}
            sx={{ color: '#29b6f6', fontWeight: 'bold' }}
          >
            {shift}
          </Typography>
        </Box>
      )}
      {shift === 'Mids' && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h5'>{`Panama 12's `}</Typography>
          <Typography
            variant='h5'
            ml={2}
            sx={{ color: '#ffa726', fontWeight: 'bold' }}
          >
            {shift}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {dateRange.map((date, index) => (
          <Paper key={index} elevation={5}>
            <Box
              sx={
                schedDate.toDateString() === date.toDateString()
                  ? {
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 2,
                      borderColor: '#4fc3f7',
                      borderRadius: 1,
                    }
                  : {
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }
            >
              <Typography sx={{ px: 3, py: 2 }}>
                {date.toDateString()}
              </Typography>
              <Divider flexItem={true}>SHIFT</Divider>
              <Button
                fullWidth={true}
                color='info'
                sx={
                  shift === 'Days' &&
                  schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(66, 135, 245, 0.2)',
                        borderRadius: 0,
                      }
                    : { borderRadius: 0 }
                }
                onClick={e => {
                  setSchedDate(date);
                  setShift('Days');
                  fetchSchedule();
                }}
              >
                Days
              </Button>
              <Button
                fullWidth={true}
                color='warning'
                sx={
                  shift === 'Mids' &&
                  schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(229, 115, 115, 0.2)',
                        borderRadius: 0,
                      }
                    : { borderRadius: 0 }
                }
                onClick={e => {
                  setSchedDate(date);
                  setShift('Mids');
                  fetchSchedule();
                }}
              >
                Mids
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 5,
        }}
      >
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Post</TableCell>
              <TableCell align='right'>Manning Requirements</TableCell>
              <TableCell align='right'>Weapon Requirements</TableCell>
              <TableCell align='right'>Certification Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const Row = props => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* change color to needs edited icon */}
        <TableCell component='th' scope='row'>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {row.name}
            {row.users.filter(user => user.noUser === true).length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f44336',
                  borderRadius: 20,
                  ml: 3,
                  px: 1,
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                  style={{ width: 30 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12
                  9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73
                  0 2.813-1.874 1.948-3.374L13.949
                  3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12
                  15.75h.007v.008H12v-.008z'
                  />
                </svg>
              </Box>
            )}
          </Box>
        </TableCell>
        <TableCell align='right'>{row.man_req}</TableCell>
        <TableCell align='right'>{row.weapons}</TableCell>
        <TableCell align='right'>{row.cert[0].cert}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant='h6'
                gutterBottom
                component='div'
              ></Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: "bold"}}>Posted</TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Members</TableCell>
                    <TableCell align='right'> </TableCell>
                    <TableCell align='right'> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.users.map((userRow, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {/* {!userRow.noUser ? `${userRow.role}` : <Button onClick={() => PostMemberModal()} sx={{ backgroundColor: 'orange' }}>Add User</Button>} */}
                        {!userRow.noUser ? (
                          <span>
                            <EditSchedule
                              role={index}
                              post={row.name}
                              weapon_req={row.weapons}
                              cert_req={row.cert}
                              post_id={row.post_id}
                              fetchSchedule={row.fetchSchedule}
                              currentDate={row.currentDate}
                              userRow={userRow}
                              delSchedule={row.delSchedule}
                              shift={row.shift}
                            />
                            {`${userRow.role}`}
                          </span>
                        ) : (
                          <PostMemberModal
                            role={index}
                            post={row.name}
                            weapon_req={row.weapons}
                            cert_req={row.cert}
                            post_id={row.post_id}
                            fetchSchedule={row.fetchSchedule}
                            currentDate={row.currentDate}
                            shift={row.shift}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!userRow.noUser
                          ? `${userRow.user_info[0].first_name} ${userRow.user_info[0].last_name}`
                          : `No One Posted`}
                      </TableCell>
                      <TableCell align='right'>
                        {!userRow.noUser &&
                          `${userRow.user_info[0].weapons.map(
                            wep => `${wep.weapon} `
                          )}`}
                      </TableCell>
                      <TableCell align='right'>
                        {!userRow.noUser &&
                          `${userRow.user_info[0].certs[0].cert}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
