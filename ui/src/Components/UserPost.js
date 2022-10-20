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
      backgroundColor={checkEven ? '#D3D3D3' : '#FFFFFF'}
      sx={{
        display: 'flex',
        direction: 'row',
        justifyContent: 'space-between',
        p: 1,
      }}
    >
      <Box>{schedule.position_info[0].name}</Box>
      <Box>{schedule.role}</Box>
      <Box>{schedule.date}</Box>
    </Box>
  );

  //   return <> {schedule.role} </>;
};
