import React, { useContext } from 'react';
// import { MemberContext } from './MemberContext';
// import { Box, Typography, Stack, Chip, Button } from '@mui/material';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import SecurityIcon from '@mui/icons-material/Security';
// import { EditPost } from '../Features/EditPost';

export const UserPost = props => {
  //   const {  } = useContext(MemberContext);
  const { schedule } = props;

  return <> {schedule.role} </>;
};
