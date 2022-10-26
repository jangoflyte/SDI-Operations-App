import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { MemberContext } from './MemberContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../passlogo.svg';

export default function SignIn() {
  const { API, setCookie, setUserAccount } = useContext(MemberContext);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [failedLogin, setFailedLogin] = useState(false);
  const [apiRes, setApiRes] = useState({ ok: false });
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}`).then(data => setApiRes(data));
    // .catch(err => setApiRes(err));
  }, [API]);

  useEffect(() => {
    // console.log('api res ', apiRes.ok);
  }, [apiRes]);

  const postLogin = () => {
    // console.log('fetching login', loginCredentials);
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
          // console.log('return data', data);
          let cookieInfo = data.cookie;
          setCookie('user', JSON.stringify(data.user), {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
            secure: 'true',
          });
          setCookie(cookieInfo[0], cookieInfo[1], {
            path: '/',
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            //backgroundColor: '#212121',
          }}
        >
          <Box
            sx={{ backgroundColor: '#212121', borderRadius: '20px', pl: 1.5 }}
          >
            <img src={logo} alt='logo' style={{ width: '20rem' }} />
          </Box>
          {failedLogin && (
            <span>
              <Typography
                component='span'
                variant='h5'
                align='center'
                color='error'
              >
                Failed to login, Retry or Sign up
              </Typography>
            </span>
          )}
          <Box
            sx={{ backgroundColor: '#FAFAFF', borderRadius: 3, px: 4, py: 2 }}
          >
            <TextField
              error={failedLogin}
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
              error={failedLogin}
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
          </Box>
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            size='medium'
            sx={{
              borderRadius: '30px',
              width: 200,
            }}
            onClick={() => postLogin()}
          >
            Login
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
            onClick={() => navigate('/signup')}
          >
            Create Account
          </Button>
          {!apiRes.ok ? (
            <Box sx={{ m: 2, width: '100%' }}>
              <Typography variant='h5' component='h5' sx={{ color: 'white' }}>
                Connecting to Database
              </Typography>
              <LinearProgress />
            </Box>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
