import React, { useState, useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Divider,
  Chip,
  Alert,
  Fade,
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MemberContext } from '../Components/MemberContext';
import PostMemberModal from './AddMember';
import EditSchedule from './EditSchedule';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';
import { WeaponQuals } from './WeaponQuals';
import { useNavigate } from 'react-router-dom';
import { display } from '@mui/system';

export const Calendar = () => {
  const { API, toggleAlert, setToggleAlert, userAccount } =
    useContext(MemberContext);
  const [positions, setPositions] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [shift, setShift] = useState('Days');
  const [schedDate, setSchedDate] = useState(new Date());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(new Date());

  const [dateRange, setDateRange] = useState([]);

  useMemo(() => {
    let dateRange2 = [];
    for (let i = 0; i < 42; i++) {
      let workingDate = new Date();
      workingDate.setMonth(currMonth, -6);

      let newDate = new Date(workingDate.setDate(workingDate.getDate() + i));
      //console.log('created date', newDate.toISOString());
      dateRange2.push(newDate);
    }
    setDateRange(dateRange2);
  }, [currMonth]);

  // grab the month from the current date.
  // construct month view for display
  // highlight the current date

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
        <Box sx={{ minWidth: 120, display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id='Month'>Month</InputLabel>
            <Select
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
        </Box>
        <Box
          sx={{
            width: '60%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Typography variant='h2'>
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
            elevation={0}
            sx={
              date.getMonth() === currMonth
                ? {
                    width: '13%',
                    minHeight: 120,
                    backgroundColor:
                      schedDate.toDateString() === date.toDateString()
                        ? 'rgba(66, 135, 245, 0.2)'
                        : 'none',
                  }
                : {
                    width: '13%',
                    minHeight: 120,
                    backgroundColor:
                      schedDate.toDateString() === date.toDateString()
                        ? 'rgba(66, 135, 245, 0.2)'
                        : '#edeef0',
                  }
            }
          >
            <Box
              sx={
                schedDate.toDateString() === date.toDateString()
                  ? {
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 1,
                      height: '100%',
                      borderColor: shift === 'Days' ? '#ffa726 ' : '#6D7AE5',
                      borderRadius: 1,
                    }
                  : {
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: 1,
                      borderRadius: 1,
                      height: '100%',
                      justifyContent: 'center',
                    }
              }
            >
              <Typography component='span' sx={{ px: 3, py: 2 }}>
                {`${date.toDateString().split(' ')[0]} ${
                  date.toDateString().split(' ')[1]
                } ${date.toDateString().split(' ')[2]}`}
              </Typography>
              <Divider flexItem={true}></Divider>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Button
                  fullWidth={true}
                  color='warning'
                  size='small'
                  sx={
                    shift === 'Days' &&
                    schedDate.toDateString() === date.toDateString()
                      ? {
                          backgroundColor: 'rgba(66, 135, 245, 0.2)',
                          borderRadius: 0,
                        }
                      : { borderRadius: 0 }
                  }
                  onClick={() => {
                    setSchedDate(date);
                    setShift('Days');
                    //fetchSchedule();
                  }}
                >
                  Select
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
