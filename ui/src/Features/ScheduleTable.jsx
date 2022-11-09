import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  Button,
  Divider,
  Alert,
  Fade,
  TextField,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MemberContext } from '../Components/MemberContext';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useParams } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { RowTableSched } from './RowTableSched';
import PrintIcon from '@mui/icons-material/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ScheduleTable = () => {
  const { API, toggleAlert, setToggleAlert, userAccount } =
    useContext(MemberContext);
  const navigate = useNavigate();
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [shift, setShift] = useState('Days');
  const [schedDate, setSchedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [postsAssigned, setPostsAssigned] = useState(0);
  const [schedFilled, setSchedFilled] = useState([]);
  const { urlDate } = useParams();
  const theme = useTheme();

  let dateEnd = new Date(startDate);
  dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() + 7))
    .toISOString()
    .split('T')[0];

  useEffect(() => {
    console.log('fetching if schedule filled');
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

  useEffect(() => {
    if (urlDate !== undefined) {
      let splitDate = urlDate.split('-');
      if (splitDate[2] < 10) splitDate[2] = `0${splitDate[2]}`;
      setStartDate(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]));
      setSchedDate(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]));
    }
  }, [urlDate]);

  useEffect(() => {
    fetchSchedule();
    fetchPosts();
  }, [schedDate, shift]);

  const fetchPosts = () => {
    //console.log('fetching positions');
    fetch(`${API}/position`, {
      method: 'GET',
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
      .then(data => {
        // console.log(shift.toLowerCase(), 'this is data ', data)
        const filteredPosts = data.filter(
          post => post.shift === shift.toLowerCase()
        );
        // console.log('this is filtered psots ', filteredPosts)
        setPositions(filteredPosts);
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
          shift === 'Days' ? 'Day' : 'Mid'
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
    let numberOfAssigned = 0;
    let row = [];
    let shiftTime;
    if (shift === 'Days') shiftTime = '06:00:00';
    if (shift === 'Mids') shiftTime = '18:00:00';

    if (positions.length > 0) {
      row = positions.map(position => {
        // figure out personnel position and push to postlist generation
        let filUsers = schedule.filter(
          sched =>
            sched.position_id === position.id &&
            sched.date.split('T')[0] ===
              schedDate.toISOString().split('T')[0] &&
            sched.time === shiftTime
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
          shift
        );
      });
    }
    return row;
  }, [positions, schedule, schedDate, shift]);

  const handleDownloadTable = () => {
    const pdf = new jsPDF();
    //pdf.text('Hello world!', 10, 10);
    var head = [['Post', 'Position', 'Member', 'Weapon', 'Cert']];
    //pdf.autoTable({ html: '#table' });

    let tableBody = [];
    console.log('rows', rows);

    rows.forEach(row => {
      let postUsers = row.users.map(user => {
        if (user.user_info === undefined)
          return [row.name, 'N/A', 'No one posted', 'N/A', 'N/A'];
        let workingRow = [
          `${user.user_info[0].first_name} ${user.user_info[0].last_name}`,
        ];
        let wepResults = '';
        for (let wep of user.user_info[0].weapons) {
          if (wepResults.length > 0) {
            wepResults += `, ${wep.weapon}`;
          } else {
            wepResults += `${wep.weapon}`;
          }
        }
        workingRow.push(wepResults);
        let certResults = '';
        for (let cert of user.user_info[0].certs) {
          if (certResults.length > 0) {
            certResults += `, ${cert.cert}`;
          } else {
            certResults += `${cert.cert}`;
          }
        }
        workingRow.push(certResults);
        workingRow.unshift(user.role);
        workingRow.unshift(row.name);
        return workingRow;
      });
      for (let userRow of postUsers) {
        console.log(userRow);
        tableBody.push(userRow);
      }
    });

    console.log('body: ', tableBody);
    pdf.text(`Schedule for: ${schedDate.toDateString()}`, 10, 10);
    pdf.autoTable({ head: head, body: tableBody });
    pdf.save('schedule.pdf');
  };

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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'end',
          justifyContent: 'center',
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
            justifyContent: 'start',
            gap: 2,
            width: 620,
            //width: '90%',
          }}
        >
          <TextField
            id='date'
            label='Start Date'
            type='date'
            defaultValue={startDate.toISOString().split('T')[0]}
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
              } else {
                setStartDate(new Date(`${e.target.value}T00:00:00`));
                setSchedDate(new Date(`${e.target.value}T00:00:00`));
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

          <Box sx={{}}>
            <Tooltip title="Print Today's Schedule">
              <IconButton onClick={() => handleDownloadTable()}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography
          variant='h1'
          component='span'
          sx={{
            color: shift === 'Days' ? '#ffa726' : '#7A8AFF',
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
          justifyContent: 'center',
          gap: 3,
          whiteSpace: 'no-wrap',
          // maxWidth: '100%',
          // overflowX: 'auto',
        }}
      >
        {dateRange.map((date, index) => (
          <Paper key={index} elevation={4}>
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
                      borderColor: shift === 'Days' ? '#ffa726 ' : '#6D7AE5',
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
                {/* <Typography
                  fontWeight='bold'
                  component='span'
                  sx={{ color: theme.palette.grey[700] }}
                >
                  {date.toDateString().split(' ')[3]}
                </Typography> */}
              </Box>
              <Divider flexItem={true} sx={{ color: theme.palette.grey[600] }}>
                SHIFT
              </Divider>

              <Button
                fullWidth={true}
                color='warning'
                sx={
                  shift === 'Days' &&
                  schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(229, 115, 115, 0.2)',
                        borderRadius: 0,
                      }
                    : { borderRadius: 0 }
                }
                onClick={() => {
                  setSchedDate(date);
                  setShift('Days');
                  fetchSchedule();
                }}
                endIcon={checkboxDisplay(date, index, 'days')}
              >
                Days
              </Button>
              <Button
                fullWidth={true}
                color='info'
                sx={
                  shift === 'Mids' &&
                  schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(66, 135, 245, 0.2)',
                        borderRadius: 0,
                      }
                    : { borderRadius: 0 }
                }
                onClick={() => {
                  setSchedDate(date);
                  setShift('Mids');
                  fetchSchedule();
                }}
                endIcon={checkboxDisplay(date, index, 'mids')}
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
          borderColor: shift === 'Days' ? '#ffa726' : '#6D7AE5',
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
  );
};
