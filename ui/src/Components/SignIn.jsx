import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress'
import Avatar from '@mui/material/Avatar';
import { MemberContext } from './MemberContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../logo.svg';

export default function SignIn() {
  const { API, setCookie, setUserAccount, data } = useContext(MemberContext);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [failedLogin, setFailedLogin] = useState(false);
  const [apiRes, setApiRes] = useState({ok:false})
  let navigate = useNavigate();

  useEffect(()=>{

    fetch(`${API}`)
    .then(data => setApiRes(data))
    // .catch(err => setApiRes(err));
  },[API])

  useEffect(()=>{

console.log("api res ", apiRes.ok)
  },[apiRes])

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
        <Box sx={{ backgroundColor: '#212121', borderRadius: '20px', pl: 1.5 }}>
          <img src={logo} alt='logo' />
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
            ml={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              size='medium'
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '30px',
                width: 200,
              }}
              onClick={() => postLogin()}
            >
              Login
            </Button>

            <Grid
              ml={5}
              container
              sx={{
                textAlign: 'center',
              }}
            >
              <Grid item>
                <Link href='' variant='body2'>
                  {'Forgot Password?'}
                </Link>
              </Grid>
            </Grid>
            <Stack ml={10} mt={3}>
              <Avatar sx={{ bgcolor: '#212121' }}>OR</Avatar>
            </Stack>

            <Button
              fullWidth
              variant='contained'
              color='secondary'
              size='medium'
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '30px',
                width: 200,
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>



          </Stack>
          {!apiRes.ok ? (
                <Box sx={{ m:2, width: '100%'}}>
                  <>Connecting to API</>
                <LinearProgress />
              </Box>
        ):(<></>)}
        </Box>
      </Box>
    </Container>
  );
}
