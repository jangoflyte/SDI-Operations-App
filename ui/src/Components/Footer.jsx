import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        marginTop: '5%',
        bottom: 0,
        width: '100%',
        bgcolor: theme.palette.mode === 'light' ? 'inherit' : '#303030',
      }}
      component='footer'
      square
      variant='outlined'
    >
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
            sx={{
              fontWeight: 'bold',
              color: theme.palette.mode === 'light' ? 'inherit' : 'white',
            }}
          >
            Post Assignment Scheduling System
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
