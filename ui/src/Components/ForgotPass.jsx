import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from './MemberContext';
import { useState, useContext } from 'react';
import logo from '../passlogo.svg';

export default function ForgotPass() {
  const { API } = useContext(MemberContext);
  let navigate = useNavigate();
  const [failedReset, setFailedReset] = useState(false);
  const [resetObject, setResetObject] = useState({
    email: '',
  });

  // post pw to api
  const notifyAdmins = () => {
    console.log('notify admins ran');
    if (resetObject.email === '') {
      setFailedReset(true);
    } else {
      fetch(`${API}/notifications/admin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
          name: 'Password Reset',
          link_text: 'Click to Reset Users password',
          link: `/changepass/${resetObject.email}`,
          notes: `User has requested to reset their password. The email is ${resetObject.email}`,
        }),
      })
        .then(res => {
          // console.log(res.status);
          return res.json();
        })
        .then(data => {
          // console.log(data);
          data;
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
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

          {failedReset && (
            <>
              <Typography
                component='span'
                variant='h5'
                align='center'
                color='error'
              >
                Please Give Email for Account You Want to Reset Password
              </Typography>
            </>
          )}

          <Box
            sx={{ backgroundColor: '#FAFAFF', borderRadius: 3, px: 4, py: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={failedReset}
                  required
                  fullWidth
                  id='email'
                  label='Your Email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={e => {
                    setResetObject(prev => {
                      return { ...prev, email: e.target.value };
                    });
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
            onClick={() => notifyAdmins()}
          >
            Notify Admins
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
