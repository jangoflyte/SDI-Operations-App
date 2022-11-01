import React, { useState, useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Divider,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material/';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MemberContext } from '../Components/MemberContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

export const Calendar = () => {
  const { API, toggleAlert, setToggleAlert, userAccount } =
    useContext(MemberContext);
  const theme = useTheme();
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [shift, setShift] = useState('Days');
  const [schedDate, setSchedDate] = useState(new Date());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [schedFilled, setSchedFilled] = useState([]);

  // set up function to fetch and check if positions have been filled in
  // fetch with array of objects containing date and filled boolean
  // [{ date: '2022-11-01', filled: null, shift: 'all'}, { date: '2022-11-02', filled: null, shift: 'all'}...]
  // returns if filled true/false

  const fetchIfScheduleFilled = () => {
    console.log('fetching if schedule filled');
    let datesToPost = [];
    if (dateRange.length === 0) return;
    for (let dateIn of dateRange) {
      let workingDate = {
        date: dateIn.toISOString().split('T')[0],
        filled: null,
        shift: 'all',
      };
      datesToPost.push(workingDate);
    }
    fetch(`${API}/schedule/filled`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(datesToPost),
    })
      .then(res => {
        console.log(res.status);
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
  useEffect(() => {
    fetchIfScheduleFilled();
  }, [dateRange]);

  // icons for schedule ex...
  // endIcon={
  //   postsAssigned === rows.length ? (
  //     <CheckCircleOutlineIcon />
  //   ) : (
  //     <HighlightOffIcon />
  //   )

  useMemo(() => {
    let dateRange2 = [];
    // change i to start on a sunday so that the week days are allways on
    // the same column
    for (let i = 0; i < 42; i++) {
      let workingDate = new Date('2022-10-30');
      // workingDate.setMonth(currMonth, -6);
      let beforeDays = -6;

      workingDate.setFullYear(currYear, currMonth, beforeDays);
      let newDate = new Date(workingDate.setDate(workingDate.getDate() + i));
      //console.log('created date', newDate.toISOString());
      dateRange2.push(newDate);
    }
    setDateRange(dateRange2);
  }, [currMonth]);

  const handleChangeMonthGreater = () => {
    if (currMonth < 11) {
      setCurrMonth(currMonth + 1);
    } else {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    }
  };
  const handleChangeMonthLesser = () => {
    if (currMonth > 0) {
      setCurrMonth(currMonth - 1);
    } else {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    }
  };
  const handleChangeToday = () => {
    setCurrMonth(new Date().getMonth());
    setCurrYear(new Date().getFullYear());
    setSchedDate(new Date());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{ width: '80vw', display: 'flex', justifyContent: 'space-between' }}
      >
        <Box
          pl={4}
          sx={{ minWidth: 120, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <FormControl fullWidth>
            <InputLabel id='Month'>Month</InputLabel>
            <Select
              color='info'
              labelId='Month'
              id='Month'
              value={currMonth}
              label='Month'
              onChange={e => {
                setCurrMonth(e.target.value);
              }}
            >
              <MenuItem value={0}>January</MenuItem>
              <MenuItem value={1}>February</MenuItem>
              <MenuItem value={2}>March</MenuItem>
              <MenuItem value={3}>April</MenuItem>
              <MenuItem value={4}>May</MenuItem>
              <MenuItem value={5}>June</MenuItem>
              <MenuItem value={6}>July</MenuItem>
              <MenuItem value={7}>August</MenuItem>
              <MenuItem value={8}>September</MenuItem>
              <MenuItem value={9}>October</MenuItem>
              <MenuItem value={10}>November</MenuItem>
              <MenuItem value={11}>December</MenuItem>
            </Select>
          </FormControl>
          <Button variant='outlined' color='info' onClick={handleChangeToday}>
            Today
          </Button>
        </Box>
        <Box
          sx={{
            width: '60%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Button
            size='small'
            color='info'
            sx={{ height: '50%' }}
            onClick={handleChangeMonthLesser}
          >
            <Typography variant='h2' component='span'>{`<`}</Typography>
          </Button>
          <Typography variant='h2' color='primary'>
            {currMonth === 0 && `January`}
            {currMonth === 1 && `February`}
            {currMonth === 2 && `March`}
            {currMonth === 3 && `April`}
            {currMonth === 4 && `May`}
            {currMonth === 5 && `June`}
            {currMonth === 6 && `July`}
            {currMonth === 7 && `August`}
            {currMonth === 8 && `September`}
            {currMonth === 9 && `October`}
            {currMonth === 10 && `November`}
            {currMonth === 11 && `December`}
          </Typography>
          <Button
            size='small'
            color='info'
            sx={{ height: '50%' }}
            onClick={handleChangeMonthGreater}
          >
            <Typography variant='h2' component='span'>{`>`}</Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '80%',
          alignContent: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {dateRange.map((date, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={
              date.getMonth() === currMonth
                ? {
                    cursor: 'pointer',
                    width: '13%',
                    minHeight: 120,
                    border: 1,
                    borderColor: theme.palette.grey[400],
                    backgroundColor:
                      schedDate.toDateString() === date.toDateString()
                        ? 'rgba(66, 135, 245, 0.2)'
                        : 'none',
                  }
                : {
                    cursor: 'pointer',
                    width: '13%',
                    minHeight: 120,
                    border: 1,
                    borderColor: theme.palette.grey[400],
                    backgroundColor:
                      schedDate.toDateString() === date.toDateString()
                        ? 'rgba(66, 135, 245, 0.2)'
                        : theme.palette.grey[200],
                  }
            }
            onClick={() => {
              setSchedDate(date);
              setShift('Days');
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: schedDate.toDateString() === date.toDateString() && 1,
                borderRadius: 1,
                height: '100%',
                borderColor:
                  schedDate.toDateString() === date.toDateString() && '#6D7AE5',
              }}
            >
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <Typography
                  component='span'
                  sx={
                    date.getMonth() === currMonth
                      ? {
                          color: '',
                        }
                      : { color: theme.palette.grey[500] }
                  }
                >
                  {date.toDateString().split(' ')[0]}
                </Typography>
                <Typography
                  component='span'
                  sx={
                    date.getMonth() === currMonth
                      ? {
                          color: '',
                        }
                      : { color: theme.palette.grey[500] }
                  }
                >
                  {date.toDateString().split(' ')[3]}
                </Typography>
              </Box>
              <Divider flexItem={true} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  width: '100%',
                }}
              >
                <Typography
                  variant='h4'
                  component='span'
                  sx={
                    date.getMonth() === currMonth
                      ? {
                          color: theme.palette.info.main,
                        }
                      : { color: theme.palette.grey[500] }
                  }
                >
                  {date.toDateString().split(' ')[1]}
                </Typography>
                <Typography
                  variant='h4'
                  component='span'
                  sx={
                    date.getMonth() === currMonth
                      ? {
                          color: theme.palette.warning.main,
                        }
                      : { color: theme.palette.grey[500] }
                  }
                >
                  {date.toDateString().split(' ')[2]}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
              ></Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
