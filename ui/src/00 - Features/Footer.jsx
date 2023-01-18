import React from 'react'
import { Box, Container, Typography, Paper } from '@mui/material'

export const Footer = () => {
  return (
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontWeight: 'bold'
            }}
          >
            © Post Assignment Scheduling System
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}
