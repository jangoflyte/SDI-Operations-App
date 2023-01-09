import React, { useContext, useState, useEffect } from 'react'
import { MemberContext } from '../MemberContext'
import '../styles/MembersDetail.css'
import '../styles/Card.css'
import { Box, LinearProgress, Typography, Stack, Button } from '@mui/material'
import { ScheduleCard } from './ScheduleCard'
import { AddPost } from './AddPost'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import NightlightIcon from '@mui/icons-material/Nightlight'

export const Settings = () => {
  const { API, triggerFetch } = useContext(MemberContext)
  const [postArray, setPostArray] = useState([])
  const [isDay, setIsDay] = useState(true)

  useEffect(() => {
    fetch(`${API}/position`, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(data => {
        const shift = isDay ? 'days' : 'mids'
        console.log(shift, 'this is data ', data)
        const filteredPosts = data.filter(post => post.shift === shift)
        console.log('this is filtered psots ', filteredPosts)
        setPostArray(filteredPosts)
      })
      .catch(err => console.log(err))
  }, [triggerFetch, isDay])

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
          Schedule Settings
        </Typography>
        <Typography variant='h5' component='span' pb={2} sx={{}}>
          {postArray.length} {isDay ? 'Day' : 'Mid'} Posts
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
            color={isDay ? 'secondary' : 'primary'}
            variant='contained'
            sx={{ borderRadius: '30px' }}
            onClick={() => setIsDay(true)}
            startIcon={<Brightness7Icon />}
          >
            Days
          </Button>
          <Button
            color={!isDay ? 'secondary' : 'primary'}
            variant='contained'
            sx={{ borderRadius: '30px' }}
            startIcon={<NightlightIcon />}
            onClick={() => setIsDay(false)}
          >
            Mids
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
          <AddPost isDay={isDay} />
        </Stack>
        <Box>
          {postArray.map((post, index) => {
            return <PostCard post={post} key={index} />
          })}
        </Box>
      </Box>
    )
  }
}
