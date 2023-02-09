import React, { useContext, useState, useMemo } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/Card.css';
import {
  Avatar,
  Button,
  TextField,
  Stack,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  Tooltip,
  Badge,
  Paper,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@mui/material/styles';
import { ChromePicker } from 'react-color';

export const EditAvatar = props => {
  const { avatar, memberId } = props;
  const {
    API,
    member,
    setTriggerFetch,
    cookies,
    setCookie,
    removeCookie,
    userAccount,
    setUserAccount,
  } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState(avatar.avatar);
  const [color, setColor] = useState(avatar.avatar_background);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(pic);

  useMemo(() => {
    setPic(avatar.avatar);
    setColor(avatar.avatar_background);
  }, [memberId, avatar]);

  const defaultPic = () => {
    if (avatar.id === cookies.user.id) removeCookie('user');
    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({
        avatar: null,
        avatar_background: 'gray',
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        setTriggerFetch(curr => !curr);
        if (avatar.id === cookies.user.id) {
          let userInfo = cookies.user;
          userInfo.avatar = null;
          userInfo.avatar_background = 'gray';
          setCookie('user', userInfo, {
            path: '/',
            maxAge: 90000,
            sameSite: 'None',
            secure: 'true',
          });
          setUserAccount({ ...userAccount, avatar: null });
          setUserAccount({ ...userAccount, avatar_background: 'gray' });
        }
        setPic(null);
        setColor('gray');
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  const handlePic = () => {
    if (avatar.id === cookies.user.id) removeCookie('user');
    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({
        avatar: pic,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        if (avatar.id === cookies.user.id) {
          let userInfo = cookies.user;
          userInfo.avatar = pic;
          setCookie('user', userInfo, {
            path: '/',
            maxAge: 90000,
            sameSite: 'None',
            secure: 'true',
          });
          setUserAccount({ ...userAccount, avatar: pic });
        }
        setTriggerFetch(curr => !curr);
        setPic(pic);
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <IconButton>
        <Tooltip title='Change Avatar'>
          <Avatar
            onClick={handleClickOpen}
            sx={{
              cursor: 'pointer',
              width: 80,
              height: 80,
              bgcolor: color,
              color: theme.palette.mode === 'light' ? 'inherit' : 'white',
            }}
            src={pic}
            alt='avatar'
            size='large'
          >
            {avatar.first_name
              ? `${avatar.first_name.charAt(0).toUpperCase()}`
              : `F`}
            {avatar.last_name
              ? `${avatar.last_name.charAt(0).toUpperCase()}`
              : `L`}
          </Avatar>
        </Tooltip>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Paper>
          <DialogTitle id='customized-dialog-title' sx={{ fontWeight: 'bold' }}>
            {'Edit Avatar'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {pic === null ? (
                <Badge
                  overlap='circular'
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Tooltip title='Upload File'>
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='label'
                        sx={{
                          color:
                            theme.palette.mode === 'light'
                              ? 'inherit'
                              : 'white',
                        }}
                      >
                        <input
                          hidden
                          accept='image/*'
                          type='file'
                          id='myfile'
                          onChange={e => {
                            //console.log(e.target.files[0]);
                            let img = e.target.files[0];
                            setPic(URL.createObjectURL(img));
                          }}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    src=''
                    alt='avatar'
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: color,
                      color:
                        theme.palette.mode === 'light' ? 'inherit' : 'white',
                    }}
                  >
                    {avatar.first_name
                      ? `${avatar.first_name.charAt(0).toUpperCase()}`
                      : `First`}
                    {avatar.last_name
                      ? `${avatar.last_name.charAt(0).toUpperCase()}`
                      : `Last`}
                  </Avatar>
                </Badge>
              ) : (
                <Badge
                  overlap='circular'
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Tooltip title='Upload File'>
                      <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='label'
                        sx={{
                          color:
                            theme.palette.mode === 'light'
                              ? 'inherit'
                              : 'white',
                        }}
                      >
                        <input
                          hidden
                          accept='image/*'
                          type='file'
                          id='myfile'
                          onChange={e => {
                            //console.log(e.target.files[0]);
                            let img = e.target.files[0];
                            setPic(URL.createObjectURL(img));
                          }}
                        />
                        <PhotoCamera />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={pic}
                    alt='avatar'
                    sx={{ width: 100, height: 100 }}
                  />
                </Badge>
              )}
              <FormControl sx={{ width: '40ch', ml: 3 }}>
                <Tooltip title='Paste Image URL'>
                  <TextField
                    id='outlined-basic'
                    label='Source'
                    value={pic}
                    variant='outlined'
                    onChange={e => setPic(e.target.value)}
                  ></TextField>
                </Tooltip>
              </FormControl>
            </Box>

            <DialogActions
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                }}
              >
                {' '}
                <Button
                  onClick={() => handlePic()}
                  sx={{
                    color: theme.palette.mode === 'light' ? 'inherit' : 'white',
                    // '&:hover': {
                    //   backgroundColor: avatar.avatar_background,
                    // },
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#fafafa'
                          : theme.palette.grey[900],
                    },
                  }}
                >
                  Change Avatar
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <Button
                  onClick={() => defaultPic()}
                  sx={{
                    color: theme.palette.mode === 'light' ? 'inherit' : 'white',
                    // '&:hover': {
                    //   backgroundColor: avatar.avatar_background,
                    // },
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#fafafa'
                          : theme.palette.grey[900],
                    },
                  }}
                >
                  Default
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <ChangeBackground avatar={avatar} memberId={memberId} />
              </Box>
            </DialogActions>
          </DialogContent>
        </Paper>
      </Dialog>
    </>
  );
};

const ChangeBackground = props => {
  const { avatar, memberId } = props;
  const {
    API,
    member,
    setTriggerFetch,
    cookies,
    setCookie,
    removeCookie,
    userAccount,
    setUserAccount,
  } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState('#808080');
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //console.log(color);

  useMemo(() => {
    setColor(color);
  }, [memberId, avatar]);

  const backgroundChange = () => {
    if (avatar.id === cookies.user.id) removeCookie('user');
    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({
        avatar: null,
        avatar_background: color,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        setTriggerFetch(curr => !curr);
        if (avatar.id === cookies.user.id) {
          let userInfo = cookies.user;
          userInfo.avatar = null;
          userInfo.avatar_background = color;
          setCookie('user', userInfo, {
            path: '/',
            maxAge: 90000,
            sameSite: 'None',
            secure: 'true',
          });
          setUserAccount({ ...userAccount, avatar: null });
          setUserAccount({ ...userAccount, avatar_background: color });
        }
        //setColor(color);
      })
      .then(() => handleClose())
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <Tooltip title='Change Background'>
        <Button
          onClick={handleClickOpen}
          sx={{
            color: theme.palette.mode === 'light' ? 'inherit' : 'white',
            // '&:hover': {
            //   backgroundColor: avatar.avatar_background,
            // },
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? '#fafafa'
                  : theme.palette.grey[900],
            },
          }}
        >
          Change Background Color
        </Button>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Paper>
          <DialogTitle id='customized-dialog-title' sx={{ fontWeight: 'bold' }}>
            {'Choose Color'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='customized-dialog-description'>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ChromePicker color={color} onChange={e => setColor(e.hex)} />
              </Box>
            </DialogContentText>
            <DialogActions>
              <Stack
                direction='row'
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Button
                  onClick={() => backgroundChange()}
                  sx={{
                    color: theme.palette.mode === 'light' ? 'inherit' : 'white',
                    // '&:hover': {
                    //   backgroundColor: avatar.avatar_background,
                    // },
                    '&:hover': {
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? '#fafafa'
                          : theme.palette.grey[900],
                    },
                  }}
                >
                  Change Background Color
                </Button>
              </Stack>
            </DialogActions>
          </DialogContent>
        </Paper>
      </Dialog>
    </>
  );
};
