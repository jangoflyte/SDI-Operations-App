import React from 'react';
import { Box, Divider, Paper } from '@mui/material';

export const UserPost = props => {
  const { schedule } = props;
  const currentDate = new Date();
  const scheduleDay = new Date(schedule.date);
  const laterDate = currentDate < scheduleDay;

  return (
    <>
      {schedule.upcoming === laterDate ? (
        <>
          <Paper
            sx={{
              display: 'flex',
              direction: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              p: 1,
            }}
          >
            <Box sx={{ width: '20%' }}>{schedule.position_info[0].name}</Box>
            <Box sx={{ width: '20%' }}>{schedule.role}</Box>
            <Box sx={{ width: '30%' }}>{scheduleDay.toDateString()}</Box>
            <Box sx={{ width: '20%' }}>{schedule.time}</Box>
          </Paper>
          <Divider sx={{ width: '100%' }}></Divider>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
