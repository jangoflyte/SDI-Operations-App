import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import { Box, LinearProgress, Typography, Stack } from '@mui/material';
import { PostCard } from './PostCard';
import { AddPost } from './AddPost';

export const PostSettings = () => {
  const { API, triggerFetch } = useContext(MemberContext);
  const [postArray, setPostArray] = useState([]);
  const [isDay, setIsDay] = useState(true);

  const fetchPosts = () => {
    console.log('fetching posts');
    fetch(`${API}/post`, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow',
    })
      .then(res => res.json())
      .then(data => {
        console.log('this is data ', data);
        setPostArray(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, [triggerFetch]);

  if (postArray.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h3'
          component='span'
          pb={4}
          sx={{ fontWeight: 'bold' }}
        >
          Post Settings
        </Typography>
        <Typography variant='h5' component='span' pb={2} sx={{}}>
          {postArray.length} Posts
        </Typography>
        <Stack
          direction='row'
          sx={{
            my: 4,
            display: 'flex',
            width: '50vw',
            justifyContent: 'right',
          }}
        >
          <AddPost isDay={isDay} />
        </Stack>
        <Box>
          {postArray.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
        </Box>
      </Box>
    );
  }
};
