import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Footer = () => {
  const theme = useTheme();
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
