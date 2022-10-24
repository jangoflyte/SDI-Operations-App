import React from 'react';
import { Box } from '@mui/material';

export const UserPost = props => {
  const { schedule, index } = props;
  const checkEven = index % 2 === 0;
  const scheduleDay = new Date(schedule.date).toDateString();

  console.log('schedule in user post ', schedule, checkEven);

  return (
    <Box
      backgroundColor={checkEven ? '#edeef0' : '#FFFFFF'}
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
      <Box sx={{ width: '30%' }}>{scheduleDay}</Box>
      <Box sx={{ width: '20%' }}>{schedule.time}</Box>
    </Box>
  );

  //   return <> {schedule.role} </>;
};
