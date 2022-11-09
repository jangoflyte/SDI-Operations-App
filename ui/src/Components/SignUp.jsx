import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from './MemberContext';
import { useState, useContext } from 'react';
import logo from '../passlogo.svg';

export default function SignUp() {
  const { API, setCookie, setUserAccount } = useContext(MemberContext);
  let navigate = useNavigate();
  const [failedRegister, setFailedRegister] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    rank: '',
  });

  const postUser = () => {
    console.log('posting user');
    setFailedRegister(false);
    setUserExists(false);
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
        if (res.status === 409) {
          setUserExists(true);
        } else if (res.status === 201) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data.cookie !== undefined) {
          let cookieInfo = data.cookie;
          setCookie('user', JSON.stringify(data.user), {
            path: '/',
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
            secure: 'true',
          });

          setCookie(cookieInfo[0], cookieInfo[1], {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
            secure: 'true',
          });
          setUserAccount(data.user);
          navigate('/');
        }
      });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#212121',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{ backgroundColor: '#212121', borderRadius: '20px', pl: 1.5 }}
          >
            <img src={logo} alt='logo' style={{ width: '20rem' }} />
          </Box>

          {failedRegister && (
            <>
              <Typography
                component='span'
                variant='h5'
                align='center'
                color='error'
              >
                All info required.
              </Typography>
            </>
          )}
          {userExists && (
            <span>
              <Typography
                component='span'
                variant='h5'
                align='center'
                color='error'
              >
                User Exists, Please Sign In
              </Typography>
            </span>
          )}
          <Box
            sx={{ backgroundColor: '#FAFAFF', borderRadius: 3, px: 4, py: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={failedRegister}
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={e => {
                    setUserInfo(prev => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={failedRegister}
                  autoComplete='given-name'
                  name='firstname'
                  required
                  fullWidth
                  id='firstname'
                  label='First Name'
                  onChange={e => {
                    setUserInfo(prev => {
                      return { ...prev, first_name: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={failedRegister}
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
                  error={failedRegister}
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
                  error={failedRegister}
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
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      postUser();
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            size='medium'
            sx={{
              borderRadius: '30px',
              width: 200,
            }}
            onClick={() => postUser()}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            size='medium'
            sx={{
              borderRadius: '30px',
              width: 200,
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => navigate('/login')}
          >
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
