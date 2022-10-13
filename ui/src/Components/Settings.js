import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from './MemberContext';
import '../styles/MembersDetail.css';
import '../styles/Card.css';
import {
  Box,
  LinearProgress,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Modal,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PostCard } from './PostCard';

export const Settings = () => {
  const { API, triggerFetch } = useContext(MemberContext);
  const [postArray, setPostArray] = useState([]);
  const [postsPage, setPostsPage] = useState(true);
  const [sgt, setSgt] = useState([]);

  useEffect(() => {
    fetch(`${API}/position`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setPostArray(data))
      .catch(err => console.log(err));
  }, [triggerFetch]);

  useEffect(() => {
    //console.log('post array: ', postArray);
  }, [postArray]);

  useEffect(() => {
    fetch(`${API}/users/9`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setSgt(data))
      .catch(err => console.log(err));
  }, [triggerFetch]);

  if (postArray.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          // flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'left',
        }}
      >
        <Typography
          variant='h3'
          component='span'
          pb={4}
          sx={{ fontWeight: 'bold' }}
        >
          Settings
        </Typography>
        <Box>
          {postsPage === true ? (
            <>
              <Typography
                variant='h7'
                pb={4}
                onClick={() => setPostsPage(true)}
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#BD5334',
                  textDecoration: 'underline',
                }}
              >
                MANAGE POSTS
              </Typography>
              <Typography
                variant='h7'
                ml={10}
                pb={4}
                onClick={() => setPostsPage(false)}
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                MANAGE DESK SERGEANT
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant='h7'
                pb={4}
                onClick={() => setPostsPage(true)}
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                MANAGE POSTS
              </Typography>
              <Typography
                variant='h7'
                pb={4}
                ml={10}
                onClick={() => setPostsPage(false)}
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#BD5334',
                  textDecoration: 'underline',
                }}
              >
                MANAGE DESK SERGEANT
              </Typography>
            </>
          )}
        </Box>

        {postsPage === true ? (
          <>
            <Box sx={{ my: 4 }}>
              <Typography variant='h5'>{postArray.length} Posts</Typography>
            </Box>

            {postArray.map((post, index) => {
              return <PostCard post={post} key={index} />;
            })}
          </>
        ) : (
          <>
            <Stack
              direction='row'
              sx={{
                marginTop: '5%',
                display: 'flex',
                justifyContent: 'space-between',
                width: '55%',
              }}
            >
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                Contact Details
              </Typography>
              <Edit memberObject={sgt} />
            </Stack>

            <Stack direction='row' pt={3}>
              <p>
                Desk Sergeants receive daily emails when an entire post has been
                finalized successfully.
              </p>
            </Stack>

            <Card
              sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}
            >
              <CardContent>
                <Stack direction='row' sx={{ display: 'flex' }}>
                  <Typography
                    variant='h5'
                    ml={10}
                    pb={4}
                    sx={{ fontWeight: 'bold', width: '5%' }}
                  >
                    Role
                  </Typography>
                  <Typography
                    variant='h5'
                    ml={20}
                    pb={4}
                    sx={{ fontWeight: 'bold', width: '10%' }}
                  >
                    Name
                  </Typography>
                  <Typography
                    variant='h5'
                    ml={22}
                    pb={4}
                    sx={{ fontWeight: 'bold', width: '20%' }}
                  >
                    Email
                  </Typography>
                </Stack>

                <Stack direction='row' sx={{ display: 'flex' }}>
                  {sgt.map((user, index) => (
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      key={index}
                    >
                      <Typography
                        variant='h6'
                        ml={10}
                        pb={4}
                        sx={{ width: '5%' }}
                      >
                        {user.certs.map(cert => `${cert.cert}`)}
                      </Typography>
                      <Typography
                        variant='h6'
                        ml={21}
                        pb={4}
                        sx={{ width: '20%' }}
                      >
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography
                        variant='h6'
                        ml={15}
                        pb={4}
                        sx={{ width: '20%' }}
                      >
                        {user.email}
                      </Typography>
                    </span>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    );
  }
};

const Edit = props => {
  let memberObject = props;
  memberObject = memberObject.memberObject[0];
  //console.log('member object, ', memberObject);

  const { API, setTriggerFetch } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState(memberObject.first_name);
  const [lastName, setLastName] = useState(memberObject.last_name);
  const [email, setEmail] = useState(memberObject.email);
  const [cert, setCert] = useState(memberObject.cert_id);

  //console.log(memberObject.first_name);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  const handleEdit = () => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      cert_id: cert,
      email: email,
    };
    console.log('updated user, ', updatedUser);

    fetch(`${API}/updateuser/9`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      // .then(window.location.reload(false))
      // .then(navigate(`/sfmembers/${member.id}`))
      .then(res => res.json())
      .then(() => {
        setTriggerFetch(curr => !curr);
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        color='secondary'
        sx={{
          borderRadius: '30px',
          marginLeft: '30%',
          width: '250px',
          height: '50px',
        }}
      >
        EDIT DESK SERGEANT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center' }}
          >
            Edit Desk Sergeant
          </Typography>
          <Typography
            id='modal-modal-title'
            variant='h4'
            component='h2'
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Desk Sergeant
          </Typography>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='First Name'
                value={firstName}
                inputProps={{
                  defaultValue: `${memberObject.first_name}`,
                }}
                variant='outlined'
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                value={lastName}
                inputProps={{
                  defaultValue: `${memberObject.last_name}`,
                }}
                variant='outlined'
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Email'
                value={email}
                inputProps={{
                  defaultValue: `${memberObject.email}`,
                }}
                variant='outlined'
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>
                Certifications
              </InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cert}
                label='Certifications'
                onChange={e => setCert(e.target.value)}
              >
                <MenuItem value={null}></MenuItem>
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction='row'
            mt={3}
            sx={{
              borderRadius: '30px',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <Button
              onClick={() => handleEdit()}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px' }}
            >
              Save Profile
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
