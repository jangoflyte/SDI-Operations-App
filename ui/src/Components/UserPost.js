import React, { useContext } from 'react';
// import { MemberContext } from './MemberContext';
import { Box, Typography, Stack, Chip, Button } from '@mui/material';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import SecurityIcon from '@mui/icons-material/Security';
// import { EditPost } from '../Features/EditPost';

export const UserPost = props => {
  //   const {  } = useContext(MemberContext);
  const { schedule, index } = props;
  const checkEven = index % 2 === 0;

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
      <Box sx={{ width: '30%' }}>{new Date(schedule.date).toDateString()}</Box>
      <Box sx={{ width: '20%' }}>{schedule.time}</Box>
    </Box>
  );

  //   return <> {schedule.role} </>;
};
