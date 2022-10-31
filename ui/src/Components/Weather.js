import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Stack,
} from '@mui/material';
// const queryString = require('node:query-string');
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import ContactlessIcon from '@mui/icons-material/Contactless';
// import FacebookIcon from '@mui/icons-material/Facebook';

export const Weather = () => {
  const [weather, setWeather] = useState([]);

  //   let location = [28.2395, -80.6075];

  const weatherAPI = 'https://api.weather.gov/gridpoints/MLB/57,53/forecast';

  const weatherFetch = async () => {
    const response = await fetch(`${weatherAPI}`);
    const data = await response.json();
    // console.log(data);
    setWeather(data['properties']['periods']);
  };

  useEffect(() => {
    weatherFetch();
  }, []);

  if (weather.length < 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography>
            <h1>Local Weather Forecast</h1>
          </Typography>
        </Box>

        {console.log(weather)}
        <Box ml={20} sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
          {weather.map((item, index) => (
            <span key={index}>
              <Accordion
                sx={{
                  width: '90%',
                }}
              >
                <AccordionSummary
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack
                    sx={{
                      display: 'flex',
                      width: '20%',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography variant='h5' component='span' gutterBottom>
                      {item.name}
                    </Typography>
                  </Stack>

                  <Stack
                    direction='row'
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      width: '40%',
                    }}
                  >
                    <Avatar src={item.icon} alt='icon' />
                    &nbsp;
                    <Typography variant='h6' component='span' gutterBottom>
                      {item.temperature}°F {item.shortForecast}
                    </Typography>
                  </Stack>

                  <Stack
                    direction='row'
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '40%',
                    }}
                  >
                    <Typography variant='h6' component='span' gutterBottom>
                      Wind: {item.windSpeed}: {item.windDirection}
                    </Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>{item.detailedForecast}</Typography>
                </AccordionDetails>
              </Accordion>
            </span>
          ))}
        </Box>

        <Typography variant='h4' component='h4' gutterBottom>
          yuh...yeet
        </Typography>
      </Box>
    );
  }
};
