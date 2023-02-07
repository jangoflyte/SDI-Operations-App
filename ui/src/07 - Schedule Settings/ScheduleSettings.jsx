import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import {
  Box,
  LinearProgress,
  Typography,
  Stack,
  Button,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ScheduleCard } from './ScheduleCard';
import { AddTemplate } from './AddTemplate';

export const ScheduleSettings = () => {
  const { API, triggerFetch } = useContext(MemberContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [positions, setPositions] = useState([]);
  const theme = useTheme();

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

      <Stack
        direction='row'
        mt={3}
        sx={{
          width: 300,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      ></Stack>
      <Stack
        direction='row'
        sx={{
          my: 4,
          display: 'flex',
          width: '50vw',
          justifyContent: 'right',
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
              setEndDate(new Date());
              e.target.value = new Date().toISOString().split('T')[0];
            } else {
              console.log('textfield e.target.value: ', e.target.value);
              setStartDate(new Date(`${e.target.value}T00:00:00`));

              if (e.target.value > endDate.toISOString().split('T')[0]) {
                setEndDate(new Date(`${e.target.value}T00:00:00`));
              }
            }
          }}
        />
        <TextField
          id='endDate'
          label='End Date'
          type='date'
          value={endDate.toISOString().split('T')[0]}
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
              setEndDate(new Date());
              e.target.value = new Date().toISOString().split('T')[0];
            } else {
              console.log('textfield e.target.value: ', e.target.value);
              setEndDate(new Date(`${e.target.value}T00:00:00`));
              if (e.target.value < startDate.toISOString().split('T')[0]) {
                setStartDate(new Date(`${e.target.value}T00:00:00`));
              }
            }
          }}
        />
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
