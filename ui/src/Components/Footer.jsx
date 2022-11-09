import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Footer = () => {
  return (
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
          sx={{
            fontWeight: 'bold',
          }}
        >
          Post Assignment Scheduling System
        </Typography>
      </Box>
    </Container>
  );
};
