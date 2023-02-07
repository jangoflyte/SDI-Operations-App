import React, { useContext } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import { Box, Typography, Stack, Chip, Paper, Divider } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';
import { EditTemplate } from './EditTemplate';
import { WeaponQuals } from '../00 - Features/WeaponQuals';

export const ScheduleCard = props => {
  const { setPostsPage } = useContext(MemberContext);
  const { post } = props;

  //console.log('post', post);

  const roleArray = postInput => {
    let manReq = parseInt(postInput.man_req);
    let resultArray = [];
    for (let i = 1; i < manReq + 1; i++) {
      if (i === 1) {
        resultArray.push({ name: 'Lead' });
      } else if (i === 2) {
        resultArray.push({ name: 'Alpha' });
      } else if (i === 3) {
        resultArray.push({ name: 'Bravo' });
      } else if (i === 4) {
        resultArray.push({ name: 'Charlie' });
      } else if (i > 4) {
        resultArray.push({ name: 'Member' });
      }
    }
    return resultArray;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mx: 10,
        mb: 5,
        width: '50vw',
        borderRadius: 3,
        // pl: 5,
        // pt: 2,
        // pb: 5,
        p: 3,
      }}
    >
      <Divider textAlign='left'>Name</Divider>
      <Stack
        component='span'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ display: 'flex' }}
      >
        <Typography
          variant='h4'
          pb={2}
          onClick={() => setPostsPage(true)}
          mt={2}
        >
          {post.name &&
            post.name.post_name.charAt(0).toUpperCase() +
              post.name.post_name.slice(1)}
        </Typography>
        <EditTemplate post={post} />
      </Stack>
      <Divider textAlign='left'>Information</Divider>
      <Stack
        component='span'
        direction='row'
        alignItems='center'
        pt={2}
        sx={{ display: 'flex' }}
      >
        <Box width='33%'>
          <Typography variant='h6'>Flight</Typography>
        </Box>
        <Box width='33%'>
          <Typography variant='h6'>Time</Typography>
        </Box>
        <Box width='33%'>
          <Typography variant='h6'>Posts</Typography>
        </Box>
      </Stack>
      {roleArray(post).map((role, index) => {
        if (index > 6) return null;
        if (index > 5) return `...Aditional Posts hidden...`;
        return (
          <Stack
            key={index}
            component='span'
            direction='row'
            alignItems='center'
            pt={2}
            sx={{ display: 'flex' }}
          >
            <Box width='33%'>
              <Typography>{role.name}</Typography>
            </Box>
            <Box width='33%'>
              <Typography component='span' sx={{ fontWeight: 'bold' }}>
                {post.cert_req.length === 0 ? (
                  <Chip
                    icon={<WorkspacePremiumIcon />}
                    label='No Certs'
                    color='success'
                    sx={{ color: 'white' }}
                  />
                ) : (
                  <Chip
                    icon={<WorkspacePremiumIcon />}
                    label={post.cert_req.map(cert => cert.cert)}
                    color='success'
                    sx={{ color: 'white' }}
                  />
                )}
              </Typography>
            </Box>
            <Box width='33%'>
              <Typography component='span' sx={{ fontWeight: 'bold' }}>
                {post.weapon_req.length === 0 ? (
                  <Chip
                    color='primary'
                    icon={<SecurityIcon />}
                    label='No Weapons'
                    sx={{ color: 'white' }}
                  />
                ) : post.weapon_req.length > 3 ? (
                  <WeaponQuals weapon={post.weapon_req} />
                ) : (
                  post.weapon_req.map((weapon, index) => (
                    <Chip
                      key={index}
                      icon={<SecurityIcon />}
                      label={weapon.weapon.toUpperCase()}
                      color='secondary'
                      sx={{ m: 1 / 4, color: 'white' }}
                    />
                  ))
                )}
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </Paper>
  );
};
