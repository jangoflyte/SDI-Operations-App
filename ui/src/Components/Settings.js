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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PostCard } from './PostCard';

export const Settings = () => {
  const { API, triggerFetch } = useContext(MemberContext);
  const [postArray, setPostArray] = useState([]);
  const [postsPage, setPostsPage] = useState(true);

  useEffect(() => {
    fetch(`${API}/position`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setPostArray(data))
      .catch(err => console.log(err));
  }, [triggerFetch]);

  useEffect(() => {
    console.log('post array: ', postArray);
  }, [postArray]);

  if (postArray.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant='h3' ml={10} pb={4} sx={{ fontWeight: 'bold' }}>
          Settings
        </Typography>
        <Box>
          {postsPage === true ? (
            <>
              <Typography
                variant='h7'
                ml={10}
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
                ml={10}
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
                ml={10}
                pb={4}
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
            <Box sx={{ mt: 10 }}>
              <Typography variant='h5' ml={10} pb={4} sx={{}}>
                {postArray.length} Posts
              </Typography>
            </Box>

            {postArray.map(post => {
              return (
                <>
                  <PostCard post={post} />
                </>
              );
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
                width: 1080,
              }}
            >
              <Typography variant='h4' ml={10} pb={4} sx={{}}>
                Contact Details
              </Typography>
              <Edit />
            </Stack>

            <Stack ml={10} direction='row'>
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
                    sx={{ fontWeight: 'bold' }}
                  >
                    Role
                  </Typography>
                  <Typography
                    variant='h5'
                    ml={20}
                    pb={4}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Name
                  </Typography>
                  <Typography
                    variant='h5'
                    ml={22}
                    pb={4}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Email
                  </Typography>
                </Stack>

                <Stack direction='row' sx={{ display: 'flex' }}>
                  <Typography variant='h6' ml={10} pb={4} sx={{}}>
                    Desk Sergeant
                  </Typography>
                  <Typography variant='h6' ml={10} pb={4} sx={{}}>
                    Ronald McDonald
                  </Typography>
                  <Typography variant='h6' ml={10} pb={4} sx={{}}>
                    r.mcdonald@spaceforce.mil
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    );
  }
};

const Edit = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cert, setCert] = useState(0);

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

  return (
      <>
          <Button onClick={handleOpen} variant="contained" color="secondary" sx={{borderRadius: "30px", marginLeft: "30%", width: "300px", height: "50px"}}>
            EDIT DESK SERGEANT
          </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                    <Box sx={{display: "flex", justifyContent: "right"}}>
                      <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
                    </Box>
                    
                    <Typography id="modal-modal-description" variant="h6" sx={{ mt: 1 , textAlign: "center"}}>
                      Edit Desk Sergeant
                    </Typography>
                    <Typography id="modal-modal-title" variant="h4" component="h2" sx={{textAlign: "center", fontWeight: "bold"}}>
                      Desk Sergeant
                    </Typography>
                    
  
                    <Stack direction="row" mt={3}  sx={{display: "flex", justifyContent: "center", justifyContent:"space-between"}}>
                      <FormControl sx={{ width: '35ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        value={firstName}
                        variant="outlined" 
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl sx={{ width: '35ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        value={lastName}
                        variant="outlined" 
                        onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormControl>
                    </Stack>

                    <Stack direction="row" mt={3}  sx={{display: "flex", justifyContent: "center", justifyContent:"space-between"}}>
                      <FormControl sx={{ width: '35ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        value={email}
                        variant="outlined" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormControl sx={{ width: '35ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="Role" 
                        value={cert}
                        variant="outlined" 
                        onChange={(e) => setCert(e.target.value)}
                        />
                      </FormControl>
                    </Stack>
              </Box>
          </Modal>
      </>
  );
};
