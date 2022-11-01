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
  IconButton,
  Tooltip,
} from '@mui/material';
// const queryString = require('node:query-string');
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';

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
        <Box
          ml={20}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}
          >
            <Typography variant='h3'>Local Weather Forecast</Typography>
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
            <Tooltip title='Use Current Location'>
              <IconButton color='secondary'>
                <MyLocationIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Edit Location'>
              <IconButton color='secondary'>
                <PlaceIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
          yuh...yeet.... did eric shave?
        </Typography>
      </Box>
    );
  }
};

const EditLocation = props => {
  const { API, member, setTriggerFetch, allWeapons, allFlights, userAccount } =
    useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        color='secondary'
        sx={{ borderRadius: '30px' }}
      >
        Edit Profile
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ textAlign: 'center' }}
          >
            PROFILE
          </Typography>
          <Typography
            id='modal-modal-description'
            variant='h4'
            sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
          >
            Edit Profile
          </Typography>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',

              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='First Name'
                value={firstName}
                variant='outlined'
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                value={lastName}
                variant='outlined'
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',

              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>User Type</InputLabel>
              <Select
                htmlFor='weapon_arming'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={userType}
                label='User Type'
                onChange={e => setUserType(e.target.value)}
                disabled={!(userAccount !== null && userAccount.admin)}
              >
                <MenuItem value={true}>Admin</MenuItem>
                <MenuItem value={false}>User</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>Rank</InputLabel>
              <Select
                htmlFor='rank'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={rank}
                label='Rank'
                onChange={e => setRank(e.target.value)}
              >
                <MenuItem value={'e1'}>AB</MenuItem>
                <MenuItem value={'e2'}>AMN</MenuItem>
                <MenuItem value={'e3'}>A1C</MenuItem>
                <MenuItem value={'e4'}>SrA</MenuItem>
                <MenuItem value={'e5'}>SSgt</MenuItem>
                <MenuItem value={'e6'}>TSgt</MenuItem>
                <MenuItem value={'e7'}>MSgt</MenuItem>
                <MenuItem value={'e8'}>SMSgt</MenuItem>
                <MenuItem value={'e9'}>CMSgt</MenuItem>
                <MenuItem value={'o1'}>2LT</MenuItem>
                <MenuItem value={'o2'}>1LT</MenuItem>
                <MenuItem value={'o3'}>Capt</MenuItem>
                <MenuItem value={'o4'}>Major</MenuItem>
                <MenuItem value={'o5'}>Lt. Col</MenuItem>
                <MenuItem value={'o6'}>Colonel</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>Arm Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status}
                label='Arm'
                sx={{ mb: 2 }}
                onChange={e => setStatus(e.target.value)}
                disabled={!(userAccount !== null && userAccount.admin)}
              >
                <MenuItem value={true}>Arm 🟢</MenuItem>
                <MenuItem value={false}>Do Not Arm🔴</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>
                Certifications
              </InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cert}
                label='Certifications'
                onChange={e => setCert(e.target.value)}
              >
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-multiple-checkbox-label'>Weapons</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={weaponArr.map(weap => weap.weapon)}
                input={<OutlinedInput label='Tag' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {allWeapons.map((weaponObject, index) => (
                  <MenuItem
                    id={weaponObject.id}
                    key={index}
                    value={weaponObject.id}
                  >
                    <Checkbox
                      onChange={handleChange}
                      defaultChecked={weaponArr.some(
                        wep => wep.id === weaponObject.id
                      )}
                    />
                    <ListItemText primary={weaponObject.weapon} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
