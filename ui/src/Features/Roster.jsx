import React, { useContext, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
import { Box, Typography, Divider, Stack, Icon } from '@mui/material/';
import CircleIcon from '@mui/icons-material/Circle';

export const Roster = props => {
  const { rows } = props;
  const { API, data, userAccount, allFlights } = useContext(MemberContext);
  const [flight, setFlight] = useState('alpha-1');
  const [filterFlight, setFilterFlight] = useState([]);
  const [trigerFilter, setTrigerFilter] = useState(true);

  let posted = [];

  rows.map(row => {
    const position = row.name;
    row.users.map(user => {
      if (user.noUser) return;
      user.user_info.map(info => {
        posted.push({ user: info, position: position });
      });
    });
  });
  // console.log('posted from roster.js', posted);

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

      {posted.map((post, index) => (
        <Stack
          key={index}
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
          >
            <Icon>
              <CircleIcon />
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
              {post.user.last_name}, {post.user.first_name}
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
            <Typography>{post.user.rank.toUpperCase()}</Typography>
          </Box>

          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'right',
              width: '25%',
            }}
          >
            <Typography>{post.position}</Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
