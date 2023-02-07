import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  Button,
  Divider,
  Alert,
  Fade,
  TextField,
  Box,
  Stack,
} from '@mui/material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MemberContext } from '../MemberContext';
import { EditShiftModal } from './EditShiftModal';
import { Legend } from './Legend';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useParams } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { RowTableSched } from './RowTableSched';
import { Roster } from './Roster';

export const ScheduleTable = () => {
  const { API, toggleAlert, setToggleAlert, userAccount, setRows } =
    useContext(MemberContext);
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [shift, setShift] = useState('days');
  const [allShifts, setAllShifts] = useState([]);
  const [schedDate, setSchedDate] = useState(new Date(Date()));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [postsAssigned, setPostsAssigned] = useState(0);
  const [schedFilled, setSchedFilled] = useState([]);
  const { urlDate } = useParams();
  const theme = useTheme();

  // let dateEnd = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
  // dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7))
  //dateEnd = new Date(dateEnd.setUTCHours(0, 0, 0, 0))

  useEffect(() => {
    // for each date in dateRange
    // grab all the shifts for the date
    // use Set to get unique shifts for the date

    let shiftsPerDay = dateRange.map(date => {
      let currentDateShifts = [];
      let workingCurrentDate = date.toISOString().split('T')[0];

      positions.forEach(position => {
        let workingStartDate = position.start_datetime.split('T')[0];
        // let workingEndDate = position.end_datetime.split('T')[0];

        if (workingStartDate === workingCurrentDate) {
          currentDateShifts.push(position.shift);
        }
      });

      let currentDateSet = new Set(currentDateShifts);
      let resultObj = {
        shifts: Array.from(currentDateSet).sort(),
        date: workingCurrentDate,
      };
      return resultObj;
    });

    // console.log('shifts per each day', shiftsPerDay);

    // let positionShifts = positions.map(position => {
    //   return position.shift;
    //   // return
    //   //   shift: position.shift,
    //   //   date: position.start_datetime,
    //   // };
    // });

    // let shiftsSet = new Set(positionShifts);
    // let workingArray = Array.from(shiftsSet);
    // console.log(workingArray);
    setAllShifts(shiftsPerDay);
    // need to grab and set array of shifts from position fetch
  }, [positions]);

  useEffect(() => {
    if (urlDate !== undefined) {
      let splitDate = urlDate.split('-');
      if (splitDate[2] < 10) splitDate[2] = `0${splitDate[2]}`;
      let workingDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
      // workingDate.setUTCHours(0, 0, 0)
      setStartDate(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]));
      setSchedDate(new Date(workingDate));
      let dateEnd = new Date(workingDate.setDate(workingDate.getDate() + 7));
      setEndDate(dateEnd);
    } else {
      // console.log('ran effect without url');
      let dateEnd = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
      dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7));
      setStartDate(new Date());
      setEndDate(new Date(dateEnd));
    }
  }, [urlDate]);

  useEffect(() => {
    fetchSchedule();
    fetchPosts();
  }, [schedDate, shift, startDate]);

  useEffect(() => {
    // console.log('fetching if schedule filled');
    let datesToPost = [];
    if (dateRange.length === 0) return;
    for (let dateIn of dateRange) {
      let workingDate = {
        date: `${dateIn.getFullYear()}-${
          dateIn.getMonth() + 1
        }-${dateIn.getDate()}`,
        filled: null,
        shift: 'all',
      };
      datesToPost.push(workingDate);
    }
    fetch(`${API}/schedule/filled`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(datesToPost),
    })
      .then(res => {
        //console.log(res.status);
        return res.json();
      })
      .then(data => {
        //console.log(data);
        setSchedFilled(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }, [dateRange, schedule]);

  const fetchPosts = () => {
    //console.log('fetching positions');
    let splitStartDate = startDate.toISOString().split('T')[0].split('-');
    let fetchStartDate = new Date(
      Date.UTC(
        splitStartDate[0],
        splitStartDate[1] - 1,
        splitStartDate[2],
        0,
        0,
        0
      )
    );

    fetch(`${API}/position/date`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        start_date: fetchStartDate.toISOString(),
        end_date: endDate.toISOString(),
      }),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log(shift.toLowerCase(), 'this is data ', data)
        // const filteredPosts = data.filter(
        //  post => post.shift === shift.toLowerCase()
        // )
        // console.log('this is filtered psots ', filteredPosts)
        // console.log('this is positions ', data);
        setPositions(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const fetchSchedule = () => {
    //console.log('fetching schedule');
    let fetchDate = schedDate.toISOString().split('T')[0];
    fetch(`${API}/schedule/date`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ date: fetchDate, dateEnd: endDate }),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log("THis is schedule",data);
        setSchedule(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const delSchedule = id => {
    //console.log(`deleting schedule ${id}`);
    fetch(`${API}/schedule/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(() => {
        // console.log(data);
        fetchSchedule();
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const handleFinalize = () => {
    // console.log(userAccount);
    fetch(`${API}/notifications/all`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        name: 'New Schedule Posted',
        link_text: 'Click to See Schedule',
        link: `/date/${schedDate.getFullYear()}-${
          schedDate.getMonth() + 1
        }-${schedDate.getDate()}`,

        notes: `Schedule finalized by ${userAccount.first_name} ${
          userAccount.last_name
        } for ${
          shift === 'days' ? 'Day' : 'Mid'
        } Shift on ${schedDate.toDateString()}`,
      }),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        data;
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const checkboxDisplay = (date, index, shiftInfo) => {
    if (schedFilled.length > 0) {
      if (
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` ===
          schedFilled[index].date &&
        schedFilled[index].filled.filter(item => item === shiftInfo).length ===
          schedFilled[index][`positions_${shiftInfo}`]
      ) {
        return <CheckCircleOutlineIcon color='info' />;
      } else {
        return <HighlightOffIcon color='error' />;
      }
    } else {
      return <HighlightOffIcon color='error' />;
    }
  };

  useMemo(() => {
    let dateRange2 = [];
    for (let i = 0; i < 7; i++) {
      let workingDate = new Date(startDate);
      let newDate = new Date(workingDate.setDate(workingDate.getDate() + i));
      dateRange2.push(newDate);
    }
    setDateRange(dateRange2);
  }, [startDate]);

  useMemo(() => {
    setTimeout(() => {
      setToggleAlert(false);
    }, 3000);
  }, [toggleAlert]);

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
    shift,
    position
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
      position,
    };
  };

  const rows = useMemo(() => {
    let numberOfAssigned = 0;
    let row = [];
    let shiftTime;
    if (shift === 'days') shiftTime = '06:00:00';
    if (shift === 'mids') shiftTime = '18:00:00';

    if (positions.length > 0) {
      row = positions
        .filter(
          position =>
            position.start_datetime.split('T')[0] ===
              schedDate.toISOString().split('T')[0] && position.shift === shift
        )
        .map(position => {
          // console.log('This is scheddate ', schedDate);
          let filUsers = schedule.filter(
            sched =>
              sched.position_id === position.id &&
              sched.date.split('T')[0] === schedDate.toISOString().split('T')[0]
          );
          while (filUsers.length < position.man_req) {
            filUsers.push({ noUser: true });
          }
          if (!filUsers.some(user => user.noUser === true)) {
            numberOfAssigned += 1;
          }
          setPostsAssigned(numberOfAssigned);

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
            shift,
            position
          );
        });
    }
    return row;
  }, [positions, schedule, schedDate, shift]);

  useEffect(() => {
    setRows(rows);
  }, [positions, schedule, schedDate, shift]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Fade in={toggleAlert} timeout={1000}>
        <Box
          sx={{
            width: '100vw',
            position: 'absolute',
            left: 0,
            top: '10vh',
          }}
        >
          <Alert severity='success' spacing={2} mb={2}>
            Airman has been successfully assigned to the post position.
          </Alert>
        </Box>
      </Fade>

      <Stack
        component='span'
        direction='row'
        alignItems='top'
        justifyContent='space-between'
        mt={2}
        sx={{ display: 'flex' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 300,
            //height: '110vh',
            //flexDirection: 'row',
            //alignItems: 'end',
            //justifyContent: 'start',
            gap: 2,
            width: '25%',
          }}
        >
          <Paper sx={{ width: '95%', boxShadow: 2 }}>
            <Box
              sx={{
                display: 'flex',
                //flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'left',
                width: '100%',
                //height: '100vh',
                gap: 2,
              }}
            >
              <Roster rows={rows} positions={positions} schedDate={schedDate} />
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            //flexDirection: 'row',
            // alignItems: 'end',
            justifyContent: 'left',
            gap: 2,
            width: '75%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'end',
              // justifyContent: 'left',
              width: '100%',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'end',
                justifyContent: 'left',
                gap: 2,
                width: 620,
                //width: '90%',
              }}
            >
              <TextField
                id='date'
                label='Start Date'
                type='date'
                value={startDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {
                  if (e.target.value === '') {
                    setStartDate(new Date());
                    e.target.value = new Date().toISOString().split('T')[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                    let dateEnd = new Date(
                      new Date(new Date(`${e.target.value}T00:00:00`))
                    );
                    dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7));
                    setEndDate(new Date(dateEnd));
                    navigate(`/date/${e.target.value}`);
                  } else {
                    console.log('textfield e.target.value: ', e.target.value);
                    setStartDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                    let dateEnd = new Date(
                      new Date(new Date(`${e.target.value}T00:00:00`))
                    );
                    dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7));
                    setEndDate(new Date(dateEnd));
                    navigate(`/date/${e.target.value}`);
                  }
                }}
              />
              <Button
                color='info'
                variant='outlined'
                sx={{ height: 55 }}
                onClick={() => navigate('/calendar')}
              >
                Month View
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Button
                  disabled={
                    postsAssigned === rows.length && userAccount.admin
                      ? false
                      : true
                  }
                  variant='outlined'
                  color={
                    postsAssigned !== rows.length
                      ? 'primary'
                      : userAccount !== null && userAccount.admin
                      ? 'secondary'
                      : 'primary'
                  }
                  sx={{ height: 55, cursor: 'pointer' }}
                  onClick={() => handleFinalize()}
                >
                  {`${postsAssigned} of ${rows.length}`}
                  {postsAssigned !== rows.length && ' Assigned'}

                  {postsAssigned === rows.length &&
                  userAccount !== null &&
                  userAccount.admin ? (
                    <Typography
                      color='secondary'
                      variant='contained'
                      sx={{ borderRadius: '30px', ml: 0.5 }}
                    >
                      Finalize
                    </Typography>
                  ) : null}
                </Button>
              </Box>
            </Box>

            <Typography
              variant='h1'
              component='span'
              sx={{
                color:
                  shift === 'days'
                    ? '#ffa726'
                    : shift === 'mids'
                    ? '#7A8AFF'
                    : '#4caf50',
                textShadow: '1px 1px 2px #454545',
              }}
            >
              {schedDate.toDateString()}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'left',
              gap: 1,
              whiteSpace: 'no-wrap',
              // maxWidth: '100%',
              // overflowX: 'auto',
            }}
          >
            {dateRange.map((date, index) => (
              <Paper key={index} elevation={4}>
                <Box
                  sx={
                    schedDate.getUTCDay() === date.getUTCDay()
                      ? {
                          display: 'flex',
                          flexWrap: 'wrap',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 4,
                          borderColor:
                            shift === 'days'
                              ? '#ffa726'
                              : shift === 'mids'
                              ? '#7A8AFF'
                              : '#00cc8f',
                          borderRadius: 1,
                          minHeight: '10rem',
                        }
                      : {
                          display: 'flex',
                          flexWrap: 'wrap',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '10rem',
                        }
                  }
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      px: 1,
                      pt: 1,
                      gap: 1,
                    }}
                  >
                    <Typography
                      fontWeight='bold'
                      component='span'
                      sx={{ color: theme.palette.grey[700] }}
                    >
                      {date.toDateString().split(' ')[0]}
                    </Typography>
                    <Typography
                      variant='h4'
                      component='span'
                      sx={{ color: theme.palette.info.main }}
                    >
                      {date.toDateString().split(' ')[1]}
                    </Typography>
                    <Typography variant='h4' component='span'>
                      {date.toDateString().split(' ')[2]}
                    </Typography>
                  </Box>
                  {userAccount !== null && userAccount.admin ? (
                    <Divider
                      flexItem={true}
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      <EditShiftModal />
                    </Divider>
                  ) : (
                    <Divider
                      flexItem={true}
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      <Typography>SHIFT</Typography>
                    </Divider>
                  )}
                  {allShifts.reduce((accumulator, currentValue) => {
                    if (currentValue.date !== date.toISOString().split('T')[0])
                      return accumulator;
                    accumulator.push(
                      currentValue.shifts.map((buttonShift, index) => (
                        // can make the color change based on the index and set to the index of a color array ///////////
                        <Button
                          key={index}
                          fullWidth={true}
                          color={
                            buttonShift === 'days'
                              ? 'warning'
                              : buttonShift === 'mids'
                              ? 'info'
                              : 'success'
                          }
                          sx={
                            shift === 'days' &&
                            buttonShift === 'days' &&
                            schedDate.toDateString() === date.toDateString()
                              ? {
                                  backgroundColor: 'rgba(229, 115, 115, 0.2)',
                                  borderRadius: 0,
                                }
                              : shift === 'mids' &&
                                buttonShift === 'mids' &&
                                schedDate.toDateString() === date.toDateString()
                              ? {
                                  backgroundColor: 'rgba(66, 135, 245, 0.2)',
                                  borderRadius: 0,
                                }
                              : shift === 'swings' &&
                                buttonShift === 'swings' &&
                                schedDate.toDateString() === date.toDateString()
                              ? {
                                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                  borderRadius: 0,
                                }
                              : { borderRadius: 0 }
                          }
                          onClick={() => {
                            let splitDate = date
                              .toISOString()
                              .split('T')[0]
                              .split('-');
                            setSchedDate(
                              new Date(
                                splitDate[0],
                                splitDate[1] - 1,
                                splitDate[2],
                                0,
                                0,
                                0
                              )
                            );
                            setShift(buttonShift);
                            fetchSchedule();
                          }}
                          endIcon={checkboxDisplay(date, index, 'days')}
                        >
                          {buttonShift}
                        </Button>
                      ))
                    );
                    return accumulator;
                  }, [])}
                </Box>
              </Paper>
            ))}
            <Paper elevation={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 2,
                  borderColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  borderRadius: 1,
                }}
              >
                <Legend schedDate={schedDate} allShifts={allShifts} />
              </Box>
            </Paper>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 5,
              borderColor:
                shift === 'days'
                  ? '#ffa726'
                  : shift === 'mids'
                  ? '#7A8AFF'
                  : '#00cc8f',
            }}
          >
            <Table aria-label='collapsible table' stickyHeader id='table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontWeight: 'bold' }}>Post</TableCell>
                  <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                    Manning Requirements
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Weapon Requirements
                  </TableCell>
                  <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                    Certification Required
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <RowTableSched key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Box>
  );
};
