import React, { useContext, useState, useEffect } from 'react'
import { MemberContext } from './MemberContext'
import '../styles/MembersDetail.css'
import '../styles/Card.css'
import { Box, LinearProgress, Typography, Stack, Button } from '@mui/material'
import { PostCard } from './PostCard'
import { AddPost } from '../Features/AddPost'

export const Settings = () => {
  const { API, triggerFetch } = useContext(MemberContext)
  const [postArray, setPostArray] = useState([])
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    fetch(`${API}/position`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setPostArray(data))
      .catch(err => console.log(err))
  }, [triggerFetch])

  useEffect(() => {
    //console.log('post array: ', postArray);
  }, [postArray])

  if (postArray.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant='h3'
          component='span'
          pb={4}
          sx={{ fontWeight: 'bold' }}
        >
          Settings
        </Typography>
        <Stack
          direction='row'
          mt={3}
          sx={{
            width: 300,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            color={flag ? 'primary' : 'secondary'}
            variant='contained'
            sx={{ borderRadius: '30px' }}
            onClick={() => handleClick(0)}
          >
            Day Posts
          </Button>
          <Button
            color={flag ? 'secondary' : 'primary'}
            variant='contained'
            sx={{ borderRadius: '30px' }}
            onClick={() => handleClick(1)}
          >
            Night Posts
          </Button>
        </Stack>
        <Stack
          direction='row'
          sx={{
            my: 4,
            display: 'flex',
            width: '50vw',
            justifyContent: 'right'
          }}
        >
          <AddPost />
        </Stack>
        {postArray.map((post, index) => {
          // console.log('shift', post.shift.includes(day));
          //console.log(post.shift);
          // post.shift.includes(day) ? (
          //   <PostCard post={post} key={index} />
          // ) : null;
          return <PostCard post={post} key={index} />
        })}
      </Box>
    )
  }
}
