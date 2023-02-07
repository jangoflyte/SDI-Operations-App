import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import { Box, Typography, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ScheduleCard } from './ScheduleCard';
import { AddTemplate } from './AddTemplate';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const ScheduleSettings = () => {
  const { API } = useContext(MemberContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [positions, setPositions] = useState([]);

  const fetchPosts = () => {
    console.log('fetching positions');
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
        // start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      }),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        setPositions(data);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [startDate, endDate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h3'
        component='span'
        pb={4}
        sx={{ fontWeight: 'bold' }}
      >
        Schedule Settings
      </Typography>

      <Stack direction='row' spacing={2} mb={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id='date'
            label='Start Date'
            renderInput={props => <TextField {...props} />}
            // type='date'
            value={startDate.toISOString().split('T')[0]}
            sx={{
              width: 220,
              cursor: 'pointer',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={newValue => {
              if (!(newValue.$d instanceof Date && !isNaN(newValue.$d))) return;
              newValue = newValue.$d.toISOString().split('T')[0];

              if (newValue === '') {
                let newDate = new Date();
                setStartDate(newDate);
                setEndDate(newDate);
                newValue = newDate.toISOString().split('T')[0];
              } else {
                console.log('textfield newValue: ', newValue);
                setStartDate(new Date(`${newValue}T00:00:00`));

                if (newValue > endDate.toISOString().split('T')[0]) {
                  setEndDate(new Date(`${newValue}T00:00:00`));
                }
              }
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id='date'
            label='End Date'
            renderInput={props => <TextField {...props} />}
            // type='date'
            value={endDate.toISOString().split('T')[0]}
            sx={{
              width: 220,
              cursor: 'pointer',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={newValue => {
              if (!(newValue.$d instanceof Date && !isNaN(newValue.$d))) return;
              newValue = newValue.$d.toISOString().split('T')[0];

              if (newValue === '') {
                let newDate = new Date();
                setEndDate(newDate);
                newValue = newDate.toISOString().split('T')[0];
              } else {
                console.log('textfield newValue: ', newValue);
                setEndDate(new Date(`${newValue}T00:00:00`));
                if (newValue < startDate.toISOString().split('T')[0]) {
                  setStartDate(new Date(`${newValue}T00:00:00`));
                }
              }
            }}
          />
        </LocalizationProvider>
        <AddTemplate />
      </Stack>
      <Box>
        {positions.map((post, index) => {
          return <ScheduleCard post={post} key={index} />;
        })}
      </Box>
    </Box>
  );
  // }
};
