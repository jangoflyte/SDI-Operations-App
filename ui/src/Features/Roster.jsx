import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../Components/MemberContext';
import { Box, Typography, Divider, Stack, Icon } from '@mui/material/';
import CircleIcon from '@mui/icons-material/Circle';

export const Roster = props => {
  const { rows, positions } = props;
  const { data } = useContext(MemberContext);
  const [roster, setRoster] = useState([]);
  const [scheduledUser, setScheduledUser] = useState([]);

  useEffect(() => {
    // grabs user id for scheduled users
    let posted = [];
    rows.forEach(row => {
      // console.log(row);
      const position = row.name;
      row.users.forEach(user => {
        if (user.noUser) return;
        // console.log(user);
        posted.push({ user: user.user_info[0].id, position: position });
      });
      // console.log('posted', posted);
    });
    setScheduledUser(posted);

    // filters out roster for current flight from user data
    if (positions.length > 0) {
      let currentPersonnel = data.filter(
        user => user.flight.id === positions[0].flight_assigned
      );
      setRoster(currentPersonnel);
    }
  }, [rows, positions]);

  // console.log(scheduledUser);
  return (
    <Box sx={{ borderRadius: '5px', width: '100%' }} p={2}>
      <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
        Personnel
      </Typography>
      <Divider></Divider>
      <Stack
        component='span'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        pt={2}
        sx={{ display: 'flex' }}
      >
        <Box
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '5%',
          }}
        ></Box>
        <Box
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '20%',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
        </Box>

        <Box
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '25%',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Rank</Typography>
        </Box>

        <Box
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'right',
            width: '25%',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
        </Box>
      </Stack>

      {roster.map((user, index) => (
        <Stack
          key={index}
          component='span'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          pt={2}
          sx={{ display: 'flex' }}
        >
          {console.log(user)}
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'left',
              width: '5%',
            }}
          >
            <Icon>
              <CircleIcon
                sx={
                  scheduledUser.includes(user.id)
                    ? { color: '#25CA12' }
                    : { color: 'red' }
                }
              />
            </Icon>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'left',
              width: '20%',
            }}
          >
            <Typography>
              {user.last_name}, {user.first_name}
            </Typography>
          </Box>

          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '25%',
            }}
          >
            <Typography>{user.rank.toUpperCase()}</Typography>
          </Box>

          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'right',
              width: '25%',
            }}
          >
            <Typography>{user.status}</Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
