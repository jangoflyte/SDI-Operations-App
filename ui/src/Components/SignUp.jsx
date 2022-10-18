import React from 'react';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  // Select,
  // InputLabel,
  // FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from './MemberContext';
import { useState, useContext } from 'react';

export default function SignUp() {
  const { API, setCookie, setUserAccount } = useContext(MemberContext);
  let navigate = useNavigate();
  const [failedRegister, setFailedRegister] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    rank: '',
  });

  // const handleSignUp = event => {
  //   console.log('handleSignUp', event);
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   let signUpData = {
  //     first_name: data.get('firstname'),
  //     last_name: data.get('lastname'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     rank: data.get('rank'),
  //   };
  //   fetch(`${API}/register`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     body: JSON.stringify(signUpData),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(() => {
  //       console.log('Data', signUpData);
  //       alert(
  //         `Thanks for signing up for our post scheduler ${signUpData.first_name}! Please sign in to continue.`
  //       );
  //       navigate('');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       alert('User already exists.');
  //     });
  // };

  const postUser = () => {
    console.log('posting user');
    setFailedRegister(false);
    const { first_name, last_name, email, password, rank } = userInfo;
    if (
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      rank === ''
    ) {
      setFailedRegister(true);
      return;
    }
    fetch(`${API}/register`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(userInfo),
    })
      .then(res => {
        // console.log(res.status);
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 409) {
          setFailedRegister(true);
        }
        return res.json();
      })
      .then(data => {
        console.log('fetch data', data);
        if (data.cookie !== undefined) {
          let cookieInfo = data.cookie;
          let user_id = data.user;
          console.log(user_id);
          // setCookie(cookieInfo[0], cookieInfo[1], {
          //   maxAge: cookieInfo[2].maxAge,
          //   sameSite: 'None',
          // });
          // setCookie('user', userInfo.email, {
          //   maxAge: cookieInfo[2].maxAge,
          //   sameSite: 'None',
          // });
          // setCookie('user_id', user_id[0].id, {
          //   maxAge: cookieInfo[2].maxAge,
          //   sameSite: 'None',
          // });
          setUserAccount(userInfo.email);
          navigate('/');
        }
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          // alt='galvanize'
          // src='...public/images/galvanize.jpeg'
          sx={{ m: 1, bgcolor: 'secondary.main' }}
        />
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        {/* <Box component='form' noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}> */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='eMail'
                name='email'
                autoComplete='email'
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstname'
                required
                fullWidth
                id='firstname'
                label='First Name'
                autoFocus
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, first_name: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastname'
                label='Last Name'
                name='lastname'
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, last_name: e.target.value };
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                id='rank'
                label='Rank'
                name='rank'
                defaultValue=''
                select
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, rank: e.target.value };
                  });
                }}
              >
                <MenuItem value='e1'>AB</MenuItem>
                <MenuItem value='e2'>Amn</MenuItem>
                <MenuItem value='e3'>A1C</MenuItem>
                <MenuItem value='e4'>SrA</MenuItem>
                <MenuItem value='e5'>SSgt</MenuItem>
                <MenuItem value='e6'>TSgt</MenuItem>
                <MenuItem value='e7'>MSgt</MenuItem>
                <MenuItem value='e8'>SMSgt</MenuItem>
                <MenuItem value='e9'>CMSgt</MenuItem>
                <MenuItem value='o1'>2nd Lt</MenuItem>
                <MenuItem value='o2'>1st Lt</MenuItem>
                <MenuItem value='o3'>Cpt</MenuItem>
                <MenuItem value='o4'>Maj</MenuItem>
                <MenuItem value='o5'>Lt. Col</MenuItem>
                <MenuItem value='o6'>Colonel</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => postUser()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
