import React, { useContext, useState, useMemo } from 'react';
import { MemberContext } from './MemberContext';
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
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
    color,
    setColor,
  } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState(avatar.avatar);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(pic);

  useMemo(() => {
    setPic(avatar.avatar);
  }, [memberId, avatar]);

  const defaultPic = () => {
    if (avatar.id === cookies.user.id) removeCookie('user');
    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({
        avatar: null,
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
          setCookie('user', userInfo, {
            path: '/',
            maxAge: 90000,
            sameSite: 'None',
            secure: 'true',
          });
          setUserAccount({ ...userAccount, avatar: null });
        }
        setPic(null);
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
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <Tooltip title='Change Avatar'>
        <Avatar
          onClick={handleClickOpen}
          sx={{ cursor: 'pointer', width: 80, height: 80, bgcolor: color }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='customized-dialog-title' sx={{ fontWeight: 'bold' }}>
          {'Edit Avatar'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='customized-dialog-description'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {console.log('pic', pic)}
              {pic === null ? (
                <Avatar
                  src=''
                  alt='avatar'
                  sx={{ width: 100, height: 100, bgcolor: color }}
                >
                  {avatar.first_name
                    ? `${avatar.first_name.charAt(0).toUpperCase()}`
                    : `First`}
                  {avatar.last_name
                    ? `${avatar.last_name.charAt(0).toUpperCase()}`
                    : `Last`}
                </Avatar>
              ) : (
                <Avatar
                  src={pic}
                  alt='avatar'
                  sx={{ width: 100, height: 100 }}
                />
              )}
              <FormControl sx={{ width: '40ch', ml: 3 }}>
                <TextField
                  id='outlined-basic'
                  label='Source'
                  value={pic}
                  variant='outlined'
                  onChange={e => setPic(e.target.value)}
                ></TextField>
              </FormControl>
            </Box>
            <Box>
              <Tooltip title='Upload File'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='label'
                >
                  <input
                    hidden
                    accept='image/*'
                    type='file'
                    id='myfile'
                    onChange={e => {
                      console.log(e.target.files[0]);
                      let img = e.target.files[0];
                      setPic(URL.createObjectURL(img));
                    }}
                  />
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
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
              <Button onClick={() => handlePic()}>Change Avatar</Button>
              <Button onClick={() => defaultPic()}>Default</Button>
              <Button onClick={() => setColor('red')}>
                Change Background Color
              </Button>
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
