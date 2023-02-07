import React, { useContext } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import { Typography, Stack, Paper, Divider } from '@mui/material';
import { EditPost } from './EditPost';

export const PostCard = props => {
  const { setPostsPage } = useContext(MemberContext);
  const post = props.post;

  return (
    <Paper
      elevation={3}
      sx={{
        mx: 10,
        mb: 5,
        width: '50vw',
        borderRadius: 3,
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
          {post.post_name &&
            post.post_name.charAt(0).toUpperCase() + post.post_name.slice(1)}
        </Typography>
        <EditPost post={post} />
      </Stack>
      <Divider textAlign='left'>Description</Divider>
      <Typography variant='h5' pb={2}>
        {post.description}
      </Typography>
    </Paper>
  );
};
