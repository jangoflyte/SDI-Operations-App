import React, { useContext, useState, useEffect } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

export const EditTemplate = props => {
  const { post } = props;
  const {
    API,
    setTriggerFetch,
    toggleAlert,
    setToggleAlert,
    allFlights,
    allWeapons,
  } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [templateName, setTemplateName] = useState('');
  const [weapon, setWeapon] = useState(post.weapon_req);
  const [weaponIdArray, setWeaponIdArray] = useState(
    post.weapon_req.map(wep => wep.id)
  );
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [postIdArray, setPostIdArray] = useState([]);
  const [postArray, setPostArray] = useState([]);
  const [manReq, setManReq] = useState(post.man_req);
  const [cert, setCert] = useState(post.cert_id);
  const [flight, setFlight] = useState('');
  const [shift, setShift] = useState(post.shift);

  const [openItem, setOpenItem] = React.useState(false);
  const theme = useTheme();
  const [schedDate, setSchedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setTemplateName(post.name && post.name.post_name);
    setWeapon(post.weapon_req);
    setCert(post.cert_id);
    setShift(post.shift);
    setWeaponIdArray(post.weapon_req.map(wep => wep.id));
  }, [props]);

  useEffect(() => {
    fetch(`${API}/post`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setPostArray(data))
      .catch(err => console.log(err));
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
    const newPost = {
      post_id: templateName,
      man_req: manReq,
      cert_id: cert,
      weapon_req: weaponIdArray,
      shift: shift,
    };

    fetch(`${API}/position/${post.id}`, {
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
    fetch(`${API}/position/${positionId}`, {
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

  const handlePostsBox = postId => {
    if (!postIdArray.includes(postId)) {
      setPostIdArray(curr => [...curr, postId]);
      setSelectedPosts(curr => [
        ...curr,
        postArray.filter(post => post.id === postId)[0],
      ]);
    } else if (postIdArray.includes(postId)) {
      setPostIdArray(curr => curr.filter(post => post !== postId));
      setSelectedPosts(curr => curr.filter(post => post.id !== postId));
    }
  };

  const handleWeaponBox = wepId => {
    if (!weaponIdArray.includes(wepId)) {
      setWeaponIdArray(curr => [...curr, wepId]);
      setWeapon(curr => [
        ...curr,
        allWeapons.filter(weapon => weapon.id === wepId)[0],
      ]);
    } else if (weaponIdArray.includes(wepId)) {
      setWeaponIdArray(curr => curr.filter(wep => wep !== wepId));
      setWeapon(curr => curr.filter(weapon => weapon.id !== wepId));
    }
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
            Edit Template
          </Typography>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* need to set name to be array of post to choose from 
            
            !!
            
            */}
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Template Name'
                value={templateName}
                variant='outlined'
                onChange={e => setTemplateName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Number of Positions'
                value={manReq}
                variant='outlined'
                onChange={e => setManReq(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              //justifyContent: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>Flight</InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={flight}
                label='Flight'
                onChange={e => setFlight(e.target.value)}
              >
                {allFlights.map((flightObject, index) => (
                  <MenuItem
                    id={flightObject.id}
                    key={index}
                    value={flightObject.id}
                  >
                    {flightObject.flight}
                  </MenuItem>
                ))}
              </Select>
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
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-multiple-checkbox-label'>Weapons</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={weapon.map(weap => weap.weapon)}
                input={<OutlinedInput label='Tag' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {allWeapons.map((weaponObject, index) => (
                  <MenuItem
                    id={weaponObject.id}
                    key={index}
                    value={weaponObject.id}
                    onClick={() => handleWeaponBox(weaponObject.id)}
                  >
                    <Checkbox
                      // onChange={handleChange}
                      checked={weapon.some(wep => wep.id === weaponObject.id)}
                      // checked={weapon.some(
                      //   wep => wep.weapon_id === weaponObject.id
                      // )}

                      // make seperate component ?
                    />
                    <ListItemText primary={weaponObject.weapon} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-multiple-checkbox-label'>Posts</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={selectedPosts.map(post => post.name.post_name)}
                input={<OutlinedInput label='Tag' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {postArray.map((postObject, index) => (
                  <MenuItem
                    id={postObject.id}
                    key={index}
                    value={postObject.id}
                    onClick={() => handlePostsBox(postObject.id)}
                  >
                    <Checkbox
                      // onChange={handleChange}
                      checked={selectedPosts.some(
                        post => post.id === postObject.id
                      )}
                      // checked={weapon.some(
                      //   wep => wep.weapon_id === postObject.id
                      // )}

                      // make seperate component ?
                    />
                    <ListItemText primary={postObject.post_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              //justifyContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='date'
                label='Start Date'
                type='date'
                defaultValue={startDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {
                  if (e.target.value === '') {
                    setStartDate(new Date());
                    e.target.value = new Date().toISOString().split('T')[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setStartDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='date'
                label='End Date'
                type='date'
                defaultValue={endDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {
                  if (e.target.value === '') {
                    setEndDate(new Date());
                    e.target.value = new Date().toISOString().split('T')[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setEndDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                id='date'
                label='Start Date'
                renderInput={props => <TextField {...props} />}
                // type='date'
                value={startDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={newValue => {
                  if (!(newValue.$d instanceof Date && !isNaN(newValue.$d)))
                    return;
                  newValue = newValue.$d.toISOString().split('T')[0];

                  if (newValue === '') {
                    let newDate = new Date();
                    setStartDate(newDate);
                    setEndDate(newDate);
                    newValue = newDate.toISOString().split('T')[0];
                  } else {
                    console.log('textfield newValue: ', newValue);
                    setStartDate(new Date(`${newValue}T00:00:00`));

                    if (newValue > endDate.toISOString().split('T')[0]) {
                      setEndDate(new Date(`${newValue}T00:00:00`));
                    }
                  }
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                id='date'
                label='End Date'
                renderInput={props => <TextField {...props} />}
                // type='date'
                value={endDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={newValue => {
                  if (!(newValue.$d instanceof Date && !isNaN(newValue.$d)))
                    return;
                  newValue = newValue.$d.toISOString().split('T')[0];

                  if (newValue === '') {
                    let newDate = new Date();
                    setEndDate(newDate);
                    newValue = newDate.toISOString().split('T')[0];
                  } else {
                    console.log('textfield newValue: ', newValue);
                    setEndDate(new Date(`${newValue}T00:00:00`));
                    if (newValue < startDate.toISOString().split('T')[0]) {
                      setStartDate(new Date(`${newValue}T00:00:00`));
                    }
                  }
                }}
              />
            </LocalizationProvider>
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
                  Once the Template is Deleted, it cannot be recovered. Are you
                  sure you want to delete this Template?
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
                  Delete Template
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
