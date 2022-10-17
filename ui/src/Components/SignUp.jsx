import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../App';
import { useContext } from 'react';

const theme = createTheme();

export default function SignUp() {
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

  const handleSignUp = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let signUpData = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
      password: data.get('password'),
    };
    fetch(`${API}/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        firstname: signUpData.firstname,
        lastname: signUpData.lastname,
        username: signUpData.username,
        password: signUpData.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(() => {
        console.log('Data', signUpData);
        alert(
          `Thanks for signing up for our inventory tracker ${signUpData.firstname}! Please sign in to continue.`
        );
        navigate('signin');
      })
      .catch(error => alert('User already exists.'));
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
          <Avatar
            // alt='galvanize'
            // src='...public/images/galvanize.jpeg'
            sx={{ m: 1, bgcolor: 'secondary.main' }}
          />
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstname'
                  required
                  fullWidth
                  id='firstname'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastname'
                  label='Last Name'
                  name='lastname'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item xs>
                <Link href='/guest' variant='body2'>
                  {'Just browsing? Click here.'}
                </Link>
              </Grid>
              <Grid item>
                <Link href='signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
