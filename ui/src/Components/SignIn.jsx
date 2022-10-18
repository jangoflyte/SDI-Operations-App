import React, { useState } from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { MemberContext } from './MemberContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../logo.svg';

export default function SignIn() {
  const { API, setCookie, setUserAccount } = useContext(MemberContext);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [failedLogin, setFailedLogin] = useState(false);
  let navigate = useNavigate();

  const postLogin = () => {
    console.log('fetching login', loginCredentials);
    setFailedLogin(false);
    fetch(`${API}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(loginCredentials),
    })
      .then(res => {
        // console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          setFailedLogin(true);
        }
      })
      .then(data => {
        // console.log(data);
        if (data === undefined) return;
        if (data.cookie !== undefined) {
          console.log('return data', data);
          let cookieInfo = data.cookie;
          setCookie('user', JSON.stringify(data.user), {
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
        } else {
          setFailedLogin(true);
        }
      })
      .catch(err => {
        console.log('error: ', err);
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
          //backgroundColor: '#212121',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Box>
          <img
            src={logo}
            alt='logo'
            style={{
              width: '100%',
              backgroundColor: '#212121',
              height: '100%',
              borderRadius: '20px',
            }}
          />
        </Box>
        {/* <Typography component='h1' variant='h5' align='center'>
          Welcome to 45SFS Scheduling App.
        </Typography> */}
        {failedLogin && (
          <>
            <Typography
              component='span'
              variant='h5'
              align='center'
              color='error'
            >
              Failed to login, Retry or
            </Typography>
            <Button
              variant='outlined'
              color='error'
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
          </>
        )}
        <Box sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={e => {
              setLoginCredentials(prev => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={e => {
              setLoginCredentials(prev => {
                return { ...prev, password: e.target.value };
              });
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                postLogin();
              }
            }}
          />

          <Stack
            ml={13}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              size='medium'
              sx={{ mt: 3, mb: 2, borderRadius: '30px', width: 200 }}
              onClick={() => postLogin()}
            >
              Login
            </Button>
            <Grid container sx={{ textAlign: 'center' }}>
              <Grid item>
                <Link href='' variant='body2'>
                  {'Forgot Password?'}
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              size='medium'
              sx={{ mt: 3, mb: 2, borderRadius: '30px', width: 200 }}
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
