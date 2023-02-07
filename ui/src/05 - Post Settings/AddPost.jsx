import React, { useContext, useState } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Stack,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';

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

export const AddPost = props => {
  const { API, setTriggerFetch, allWeapons } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');

  //need to modify this so old data is persisted
  const handleAdd = () => {
    // const shift = isDay ? 'days' : 'mids';
    const newPost = {
      post_name: postName,
      description: postDescription,
    };
    // console.log('newPost ', newPost, 'cert NaN ', parseInt(cert));

    fetch(`${API}/post/`, {
      method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        handleClose();
        setTriggerFetch(curr => !curr);
        setPostName(null);
        setPostDescription(null);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  // const handleChange = event => {
  //   const {
  //     target: { checked },
  //   } = event;
  //   console.log(event);
  //   console.log(
  //     'value: checked ',
  //     event.target.parentNode.parentNode.id,
  //     checked
  //   );
  //   let wepId = parseInt(event.target.parentNode.parentNode.id);
  //   if (checked && !weaponIdArray.includes(wepId)) {
  //     setWeaponIdArray(curr => [...curr, wepId]);
  //     setWeapon(curr => [
  //       ...curr,
  //       allWeapons.filter(weapon => weapon.id === wepId)[0],
  //     ]);
  //   } else if (!checked) {
  //     setWeaponIdArray(curr => curr.filter(wep => wep !== wepId));
  //     setWeapon(curr => curr.filter(weapon => weapon.id !== wepId));
  //   }
  // };

  // const handleWeaponBox = wepId => {
  //   if (!weaponIdArray.includes(wepId)) {
  //     setWeaponIdArray(curr => [...curr, wepId]);
  //     setWeapon(curr => [
  //       ...curr,
  //       allWeapons.filter(weapon => weapon.id === wepId)[0],
  //     ]);
  //   } else if (weaponIdArray.includes(wepId)) {
  //     setWeaponIdArray(curr => curr.filter(wep => wep !== wepId));
  //     setWeapon(curr => curr.filter(weapon => weapon.id !== wepId));
  //   }
  // };

  return (
    <>
      <Button
        onClick={handleOpen}
        color={'secondary'}
        variant='contained'
        sx={{ borderRadius: '50px', width: 150 }}
      >
        Add Post
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
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ textAlign: 'center' }}
          >
            POSTS
          </Typography>
          <Typography
            id='modal-modal-description'
            variant='h4'
            sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
          >
            Add Post
          </Typography>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
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
                label='Description'
                value={postDescription}
                variant='outlined'
                onChange={e => setPostDescription(e.target.value)}
              />
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
              onClick={() => handleAdd()}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px' }}
            >
              Add Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
