import React from 'react'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MemberContext } from '../MemberContext'
import { useState, useContext } from 'react'
import logo from '../passlogo.svg'
import { useTheme } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PasswordStrengthBar from 'react-password-strength-bar'

export default function SignUp () {
  const { API, setCookie, setUserAccount, authDomain, userDomain, allFlights } =
    useContext(MemberContext)
  let navigate = useNavigate()
  const theme = useTheme()
  const [failedRegister, setFailedRegister] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [failedEmail, setFailedEmail] = useState()
  const [failedPassword, setFailedPassword] = useState()
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    rank: ''
  })
  const [toggle, setToggle] = useState(false)

  //variables for checks for properly formated Email and Password/////////////////////
  const validateEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  )
  const validatePassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

  let tempPasswordTest = () => {
    validatePassword.test(userInfo.password)
  }

  ////verifies that all fields are filled out and that email and password are properly formatted/////////

  const infoValidation = () => {
    // setFailedEmail(!validateEmail.test(userInfo.email));
    // setFailedEmail(!validatePassword.test(userInfo.password));
    // let tempFailedRegister = false
    validateEmail.test(userInfo.email)
      ? setFailedEmail(false)
      : setFailedEmail(true)
    validatePassword.test(userInfo.password)
      ? setFailedPassword(false)
      : setFailedPassword(true)
    const { first_name, last_name, email, password, rank } = userInfo
    if (
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      rank === ''
    ) {
      setFailedRegister(true)
      return true
    }
    if (
      !validateEmail.test(userInfo.email) ||
      !validatePassword.test(userInfo.password)
    ) {
      //pw email or register is incorrect
      return true
    } else {
      //pw email or register is correct
      return false
    }
  }

  const handleClickShowPassword = () => setToggle(!toggle)
  const handleMouseDownPassword = () => setToggle(!toggle)

  //fetch for posting new user to database////////////////////////////
  const postUser = () => {
    console.log('posting user')
    setFailedRegister(false)
    setUserExists(false)
    // const { first_name, last_name, email, password, rank } = userInfo
    // if (
    //   first_name === '' ||
    //   last_name === '' ||
    //   email === '' ||
    //   password === '' ||
    //   rank === ''
    // ) {
    //   setFailedRegister(true)
    //   return
    // }
    fetch(`${API}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(userInfo)
    })
      .then(res => {
        // console.log(res.status);
        if (res.status === 409) {
          setUserExists(true)
        } else if (res.status === 201) {
          return res.json()
        } else {
          return res.json()
        }
      })
      .then(data => {
        if (data.cookie !== undefined) {
          let cookieInfo = data.cookie
          setCookie('user', JSON.stringify(data.user), {
            domain: userDomain,
            path: '/',
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
            secure: 'true'
          })

          setCookie(cookieInfo[0], cookieInfo[1], {
            domain: authDomain,
            path: '/',
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
            secure: 'true'
          })

          setUserAccount(data.user)
          navigate('/')
        }
      })
  }

  //sumbit function that calls validation before posting user to ensure proper emails and passwords are entered/////////////

  const validateAndSubmit = () => {
    infoValidation() ? null : postUser()
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#212121'
      }}
    >
      <Container component='main'></Container>
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Box
            sx={{ backgroundColor: '#212121', borderRadius: '20px', pl: 1.5 }}
          >
            <img src={logo} alt='logo' style={{ width: '20rem' }} />
          </Box>

          <Box>
            <Typography
              variant='h4'
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? '#FAFAFF'
                    : theme.palette.grey[800]
              }}
            >
              Create a PASS Account
            </Typography>
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
          <Paper
            sx={{
              backgroundColor:
                theme.palette.mode === 'light'
                  ? '#FAFAFF'
                  : theme.palette.grey[800],
              borderRadius: 3,
              px: 4,
              py: 2
            }}
          >
            <Grid>
              <TextField
                // error={failedRegister}
                error={failedEmail}
                helperText={!failedEmail ? '' : 'Please ensure email is valid.'}
                required
                placeholder='ex. john.doe@example.com'
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
                sx={{
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900]
                }}
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, email: e.target.value }
                  })
                }}
              />
            </Grid>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              // alignItems='center'
              gap={1}
              sx={{ pt: 0.5, pb: 0.5 }}
            >
              <Grid xs={3}>
                <TextField
                  error={failedRegister}
                  fullWidth
                  required
                  id='rank'
                  label='Rank'
                  name='rank'
                  defaultValue=''
                  select
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'white'
                        : theme.palette.grey[900]
                  }}
                  onChange={e => {
                    setUserInfo(prev => {
                      return { ...prev, rank: e.target.value }
                    })
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
                  <MenuItem value='o3'>Capt</MenuItem>
                  <MenuItem value='o4'>Maj</MenuItem>
                  <MenuItem value='o5'>Lt. Col</MenuItem>
                  <MenuItem value='o6'>Colonel</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  error={failedRegister}
                  autoComplete='given-name'
                  name='firstname'
                  placeholder='John'
                  required
                  fullWidth
                  id='firstname'
                  label='First Name'
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'white'
                        : theme.palette.grey[900]
                  }}
                  onChange={e => {
                    setUserInfo(prev => {
                      return { ...prev, first_name: e.target.value }
                    })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  error={failedRegister}
                  required
                  fullWidth
                  id='lastname'
                  label='Last Name'
                  name='lastname'
                  placeholder='Doe'
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'white'
                        : theme.palette.grey[900]
                  }}
                  onChange={e => {
                    setUserInfo(prev => {
                      return { ...prev, last_name: e.target.value }
                    })
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={failedPassword}
                helperText={
                  !failedPassword ? '' : 'Please use a valid password'
                }
                required
                placeholder='Min. 8 characters'
                fullWidth
                name='password'
                label='Password'
                // type="password"
                type={toggle === false ? 'password' : 'text'}
                id='password'
                autoComplete='new-password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {toggle === false ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900]
                }}
                onChange={e => {
                  setUserInfo(prev => {
                    return { ...prev, password: e.target.value }
                  })
                }}
                // onKeyPress={event => {
                //   if (event.key === 'Enter') {
                //     postUser();
                //   }
                // }}
              />
              <PasswordStrengthBar
                scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                minLength={8}
                password={userInfo.password}
              />
              {failedPassword ? (
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <ul>
                    <li>Password must contain numbers</li>
                    <li> Password must contain uppercase letters </li>
                    <li> Password must have at least one special character</li>
                    <li> Length must be greater than 8 characters</li>
                  </ul>
                </Box>
              ) : null}
            </Grid>
            {/* </Grid> */}
          </Paper>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            size='medium'
            sx={{
              borderRadius: '30px',
              width: 200
            }}
            // onClick={() => infoValidation()}
            onClick={() => validateAndSubmit()}
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
              justifyContent: 'center'
            }}
            onClick={() => navigate('/login')}
          >
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
