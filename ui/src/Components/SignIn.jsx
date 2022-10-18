import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MemberContext } from './MemberContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const theme = createTheme();

export default function SignIn() {
  // data,
  // setData,
  // member,
  // setMember,
  // API,
  // usersArray,
  // setUsersArray,
  // triggerFetch,
  // setTriggerFetch,
  // toggle,
  // setToggle,
  // allWeapons,
  // toggler,
  // setToggler,
  // postAlert,
  // setPostAlert
  const { API } = useContext(MemberContext);
  // const { userData, setUserData, cookies, apiServer } = useContext(AppContext);
  let navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginData = {
      username: data.get('username'),
      password: data.get('password'),
    };
    fetch(`${API}/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        user_name: loginData.username,
        password: loginData.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate('/home');
          return res.json();
        } else if (res.status === 404) {
          alert('Wrong username or password, please try again.');
          navigate('/signin');
          return;
        }
      })
      .then(data => {
        console.log('data', data);
        // cookies.set('user_id', `${data.id}`);
        // cookies.set('user', `${data.username}`);
      })
      .catch(error => {
        console.log(error);
        alert('Cannot sign in');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' align='center'>
            Welcome to our Human People tracker, please sign in!
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
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
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
