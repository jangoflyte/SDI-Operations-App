import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditPost = props => {
  const { post } = props;

  const { API, setTriggerFetch, toggleAlert, setToggleAlert, allWeapons } =
    useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [openItem, setOpenItem] = React.useState(false);

  useEffect(() => {
    setPostName(() => {
      if (post.post_name) {
        return post.post_name;
      } else {
        return '';
      }
    });
    setPostDescription(() => {
      if (post.description) {
        return post.description;
      } else {
        return '';
      }
    });
  }, []);

  const handleItemClickOpen = () => {
    setOpenItem(true);
  };

  const handleItemClose = () => {
    setOpenItem(false);
    handleClose();
  };

  //need to modify this so old data is persisted
  const handleAdd = () => {
    const newPost = { post_name: postName, description: postDescription };

    fetch(`${API}/post/${post.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      // .then(window.location.reload(false))
      .then(res => res.json())
      // .then(window.location.reload(false))
      .then(() => {
        setTriggerFetch(curr => !curr);
        setToggleAlert(!toggleAlert);
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  const handleDelete = positionId => {
    fetch(`${API}/post/${positionId}`, {
      method: 'DELETE',
      credentials: 'include',
      redirect: 'follow',
    })
      .then(() => {
        setTriggerFetch(curr => !curr);
        setToggleAlert(!toggleAlert);
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <BorderColorIcon
        onClick={handleOpen}
        fontSize='large'
        color='secondary'
        cursor='pointer'
        sx={{ mr: 5 }}
      />
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
            variant='h4'
            sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
          >
            Edit Post
          </Typography>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Post Name'
                value={postName}
                variant='outlined'
                onChange={e => setPostName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Post Description'
                value={postDescription}
                variant='outlined'
                onChange={e => setPostDescription(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          ></Stack>

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
              variant='contained'
              sx={{ borderRadius: '30px', backgroundColor: '#8B0000', mr: 2 }}
              onClick={handleItemClickOpen}
            >
              Delete Post
            </Button>
            <Dialog
              open={openItem}
              onClose={handleItemClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Are You Sure You Want to Delete?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Once the Post is Deleted, it cannot be recovered. Are you sure
                  you want to delete this Post?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleItemClose}>Cancel</Button>
                <Button
                  sx={{
                    borderRadius: '30px',
                    color: 'red',
                    mr: 2,
                  }}
                  onClick={() => handleDelete(post.id)}
                  autoFocus
                >
                  Delete Post
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              onClick={() => handleAdd()}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px' }}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
