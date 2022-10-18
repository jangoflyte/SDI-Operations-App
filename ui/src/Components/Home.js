import React, { useContext } from 'react';
import { MemberContext } from './MemberContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import PostList from '../Features/PostList';

const Home = () => {
  const { data } = useContext(MemberContext);

  if (data === undefined) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PostList />
      </Box>
    );
  }
};
export default Home;
