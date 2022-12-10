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

export const Weather = () => {
  const [weather, setWeather] = useState([]);
  const weatherAPI = 'https://api.weather.gov/gridpoints/MLB/57,53/forecast';

  const weatherFetch = async () => {
    const response = await fetch(`${weatherAPI}`);
    const data = await response.json();
    setWeather(data['properties']['periods']);
  };
  //console.log('weather', weather);

  // icon being depreciated according to weather.gov
  // using short forcast would be better
  const weatherIcon = iconUrl => {
    if (iconUrl.toLowerCase().includes('rain')) {
      // test
    }
    //return icon src img url
  };

  useEffect(() => {
    weatherFetch();
  }, []);

  if (weather.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box>
        <Box
          ml={20}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '50%',
            }}
          >
            <Typography variant='h4'>
              Local Weather Forecast: Patrick SFB
            </Typography>
          </Box>

          <Box
            mr={20}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '10%',
              gap: 1,
            }}
          >
            {/* <Tooltip title='Use Current Location'>
              <IconButton color='secondary'>
                <MyLocationIcon />
              </IconButton>
            </Tooltip> */}

            {/* <Tooltip title='Edit Location'>
              <IconButton color='secondary'>
                <PlaceIcon />
              </IconButton>
            </Tooltip> */}

            {/* <EditLocation /> */}
          </Box>
        </Box>

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
      </Box>
    );
  }
};
