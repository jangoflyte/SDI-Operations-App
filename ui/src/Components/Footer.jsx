import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Footer = () => {
  return (
    // <Paper
    //   sx={{
    //     marginTop: 'calc(10% + 60px)',
    //     position: 'fixed',
    //     bottom: 0,
    //     width: '100%',
    //     backgroundColor: '#212121',
    //   }}
    //   component='footer'
    //   square
    //   variant='outlined'
    // >
    <Container maxWidth='lg'>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          mb: 2,
          mt: 3,
        }}
      >
        <Typography
          variant='caption'
          color='initial'
          sx={{ fontWeight: 'bold' }}
        >
          Post Assignment Scheduling System
        </Typography>
      </Box>
    </Container>
    // </Paper>
  );
};
