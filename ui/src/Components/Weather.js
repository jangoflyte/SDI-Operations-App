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
  // IconButton,
  // Tooltip,
  // Modal,
  // TextField,
  // FormControl,
  // Button,
} from '@mui/material';
// const queryString = require('node:query-string');
// import MyLocationIcon from '@mui/icons-material/MyLocation';
// import PlaceIcon from '@mui/icons-material/Place';
// import CloseIcon from '@mui/icons-material/Close';

export const Weather = () => {
  const [weather, setWeather] = useState([]);
  // const [lat, setLat] = useState(28.2395);
  // const [long, setLong] = useState(-80.6075);

  //let location = [28.2395, -80.6075];
  //https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast

  const weatherAPI = 'https://api.weather.gov/gridpoints/MLB/57,53/forecast';
  //const weatherAPI = `https://api.weather.gov/points/${lat},${long} `;

  const weatherFetch = async () => {
    const response = await fetch(`${weatherAPI}`);
    const data = await response.json();
    console.log('data', data);
    // const forecast = data['properties']['forecast'];
    // console.log('forecast', forecast);
    setWeather(data['properties']['periods']);
  };

  console.log('weather', weather);

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

        {/* <Typography variant='h4' component='h4' gutterBottom>
          yuh...yeet....did eric shave?
        </Typography> */}
      </Box>
    );
  }
};

// const EditLocation = (props) => {
//   const {weather} = props
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 650,
//     height: 650,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 4,
//   };

//   return (
//     <>
//       <Tooltip title='Edit Location'>
//         <IconButton color='secondary' onClick={handleOpen}>
//           <PlaceIcon />
//         </IconButton>
//       </Tooltip>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='modal-modal-title'
//         aria-describedby='modal-modal-description'
//       >
//         <Box sx={style}>
//           <Box sx={{ display: 'flex', justifyContent: 'right' }}>
//             <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
//           </Box>
//           <Typography
//             id='modal-modal-title'
//             variant='h6'
//             component='h2'
//             sx={{ textAlign: 'center' }}
//           >
//             WEATHER
//           </Typography>
//           <Typography
//             id='modal-modal-description'
//             variant='h4'
//             sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
//           >
//             Edit Location
//           </Typography>
//           <Box
//             component='form'
//             sx={{
//               '& > :not(style)': { m: 1, width: '25ch' },
//               display: 'flex',
//               justifyContent: 'center',
//               width: '100%',
//             }}
//             noValidate
//             autoComplete='off'
//           >
//             <FormControl sx={{ width: '40ch' }}>
//               <TextField
//                 id='outlined-basic'
//                 label='Latitude'
//                 variant='outlined'
//                 value={lat}
//                 onChange={e => setLat(e.target.value)}
//               />
//             </FormControl>
//             <FormControl sx={{ width: '40ch' }}>
//               <TextField
//                 id='outlined-basic'
//                 label='Longitude'
//                 variant='outlined'
//                 value={long}
//                 onChange={e => setLong(e.target.value)}
//               />
//             </FormControl>
//           </Box>
//           <Box
//             mt={2}
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               width: '100%',
//               gap: 1,
//             }}
//           >
//             <iframe
//               src={`https://embed.waze.com/iframe?zoom=13&lat=${lat}&lon=${long}&pin=1`}
//               width='600'
//               height='400'
//             ></iframe>
//           </Box>
//           <Box mt={2} sx={{ display: 'flex', justifyContent: 'right' }}>
//             <Button
//               color='secondary'
//               variant='contained'
//               sx={{ borderRadius: '30px' }}
//             >
//               Use Location
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };
