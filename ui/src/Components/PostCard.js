import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from './MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
// import BasicCard from '../Features/Card';
import {
  Box,
  LinearProgress,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  Stack,
  Alert,
  Chip,
} from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { EditPost } from '../Features/EditPost';

export const PostCard = props => {
  const { API, triggerFetch } = useContext(MemberContext);
  const post = props.post;
  // console.log("post ", post)

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
    <Box
      sx={{
        mx: 10,
        mb: 5,
        width: 800,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: 'white',
        pl: 5,
        pt: 2,
        pb: 5,
      }}
    >
      <Stack
        component='span'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ display: 'flex' }}
      >
        <Typography
          variant='h6'
          pb={3}
          onClick={() => setPostsPage(true)}
          sx={{
            mt: 4,
            fontWeight: 'bold',
          }}
        >
          {post.name}
        </Typography>
        <EditPost post={post} />
      </Stack>

      <Stack
        component='span'
        direction='row'
        alignItems='center'
        pt={2}
        sx={{ display: 'flex' }}
      >
        <Box width='33%'>
          <Typography sx={{ fontWeight: 'bold' }}>Role</Typography>
        </Box>
        <Box width='33%'>
          <Typography sx={{ fontWeight: 'bold' }}>Certifications</Typography>
        </Box>
        <Box width='33%'>
          <Typography sx={{ fontWeight: 'bold' }}>
            Weapon Qualification
          </Typography>
        </Box>
      </Stack>
      {roleArray(post).map(role => (
        <>
          <Stack
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
              <Typography sx={{ fontWeight: 'bold' }}>
                {post.cert_req.length === 0 ? (
                  <Chip
                    icon={<WorkspacePremiumIcon />}
                    label='No Certs'
                    color='success'
                  />
                ) : (
                  <Chip
                    icon={<WorkspacePremiumIcon />}
                    label={post.cert_req.map(cert => cert.cert)}
                    color='success'
                  />
                )}
              </Typography>
            </Box>
            <Box width='33%'>
              <Typography sx={{ fontWeight: 'bold' }}>
                {post.weapon_req.length === 0 ? (
                  <Chip
                    color='secondary'
                    icon={<SecurityIcon />}
                    label='No Weapons'
                  />
                ) : (
                  post.weapon_req.map(weapon => (
                    <Chip
                      icon={<SecurityIcon />}
                      label={weapon.weapon.toUpperCase()}
                      color='secondary'
                    />
                  ))
                )}
              </Typography>
            </Box>
          </Stack>
        </>
      ))}
    </Box>
  );
};

// post.cert_req.map((cert) => cert.cert)
