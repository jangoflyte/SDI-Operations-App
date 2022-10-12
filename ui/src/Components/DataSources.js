import React from 'react';
import {
  Stack,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

export const DataSources = () => {
  const buttonSX = {
    borderRadius: '30px',
    marginRight: '10px',
  };
  return (
    <Box>
      <Typography variant='h3' ml={10} pb={4} sx={{ fontWeight: 'bold' }}>
        Data Sources
      </Typography>
      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Arming Status
          </Typography>
          <p>
            Upload your .csv file indicating your recent Do Not Arm airment
            status.
          </p>
        </CardContent>
        <CardActions>
          <Button color='secondary' variant='outlined' sx={buttonSX} disabled>
            UPLOAD .CSV
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Certifications
          </Typography>
          <p>
            Upload your .csv file including airman name and corresponding
            certifications.
          </p>
        </CardContent>
        <CardActions>
          <Button color='secondary' variant='outlined' sx={buttonSX}>
            UPLOAD .CSV
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Weapon Qualifications
          </Typography>
          <p>
            Upload your .csv file including airman name and current weapons
            certifications.
          </p>
        </CardContent>
        <CardActions>
          <Button color='secondary' variant='outlined' sx={buttonSX}>
            UPLOAD .CSV
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
