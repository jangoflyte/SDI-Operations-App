import React from 'react';
import { Box, Divider, Paper } from '@mui/material';

export const UserPost = props => {
  const { schedule, index } = props;
  // const checkEven = index % 2 === 0;
  const currentDate = new Date();
  const scheduleDay = new Date(schedule.date);
  // .toDateString();
  const laterDate = currentDate < scheduleDay;

  // console.log(currentDate, scheduleDay, laterDate);

  //console.log('schedule in user post ', schedule, checkEven);

  return (
    <>
      {schedule.upcoming === laterDate ? (
        <>
          <Paper
            // backgroundColor={checkEven ? '#edeef0' : '#FFFFFF'}
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

  //   return <> {schedule.role} </>;
};
