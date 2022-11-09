import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from './MemberContext';
import '../styles/Card.css';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

export const EditMemberModal = props => {
  let memberObject = props;
  memberObject = memberObject.memberObject;
  // console.log('member object, ', memberObject);

  const { API, member, setTriggerFetch, allWeapons, allFlights, userAccount } =
    useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState(memberObject.first_name);
  const [lastName, setLastName] = useState(memberObject.last_name);
  const [userType, setUserType] = useState(memberObject.admin);
  const [rank, setRank] = useState(memberObject.rank);
  const [cert, setCert] = useState(memberObject.cert_id);
  const [weaponArr, setWeaponArr] = useState(memberObject.weapons);
  const [status, setStatus] = useState(memberObject.weapon_arming);
  const [flight, setFlight] = useState(memberObject.flight);
  const [email, setEmail] = useState(memberObject.email);
  const [notes, setNotes] = useState(memberObject.notes);
  const [openItem, setOpenItem] = React.useState(false);

  useEffect(() => {
    setFirstName(memberObject.first_name);
    setLastName(memberObject.last_name);
    setUserType(memberObject.admin);
    setRank(memberObject.rank);
    setCert(memberObject.cert_id);
    setWeaponArr(memberObject.weapons);
    setStatus(memberObject.weapon_arming);
    setFlight(memberObject.flight);
    setEmail(memberObject.email);
    setNotes(memberObject.notes);
  }, [props]);

  const handleItemClickOpen = () => {
    setOpenItem(true);
  };

  const handleItemClose = () => {
    setOpenItem(false);
    handleClose();
  };

  const [weaponIdArray, setWeaponIdArray] = useState(
    memberObject.weapons.map(wep => wep.id)
  );
  const navigate = useNavigate();

  //need to modify this so old data is persisted
  const handleEdit = () => {
    const updatedUser = {
      first_name: firstName,
      //for data to persist you could do first_name: firstname || member.first_name
      //if no input, then it should just "replace" the value with the old one. rinse and repeat
      last_name: lastName,
      admin: userType,
      rank: rank,
      cert_id: cert,
      weapon_arming: status,
      flight: flight,
      email: email,
      notes: notes,
      weaponIdArray: weaponIdArray,
    };
    //console.log('updated user, ', updatedUser);

    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        setTriggerFetch(curr => !curr);
        handleClose();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  const handleDeleteUser = () => {
    //const deleteUser = window.confirm('Are you sure you want to delete user?');
    const deleteUser = true;
    if (deleteUser === true) {
      fetch(`${API}/deleteuser/${member.id}`, {
        method: 'DELETE',
        credentials: 'include',
        redirect: 'follow',
      })
        .then(res => res.json())
        .then(() => {
          setTriggerFetch(curr => !curr);
        })
        .then(navigate('/sfmembers'))
        .catch(err => {
          console.log('Error: ', err);
        });
    }
  };

  const handleChange = event => {
    const {
      target: { checked },
    } = event;
    console.log(event);
    console.log(
      'value: checked ',
      event.target.parentNode.parentNode.id,
      checked
    );
    let wepId = parseInt(event.target.parentNode.parentNode.id);
    if (checked && !weaponIdArray.includes(wepId)) {
      setWeaponIdArray(curr => [...curr, wepId]);
      setWeaponArr(curr => [
        ...curr,
        allWeapons.filter(weapon => weapon.id === wepId)[0],
      ]);
    } else if (!checked) {
      setWeaponIdArray(curr => curr.filter(wep => wep !== wepId));
      setWeaponArr(curr => curr.filter(weapon => weapon.id !== wepId));
    }
  };

  useEffect(() => {
    //console.log('weapon id Array ', weaponIdArray, 'allFlights', allFlights);
  }, [weaponIdArray, allFlights]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 700,
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

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        color='secondary'
        sx={{ borderRadius: '30px' }}
      >
        Edit Profile
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
            PROFILE
          </Typography>
          <Typography
            id='modal-modal-description'
            variant='h4'
            sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
          >
            Edit Profile
          </Typography>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='First Name'
                value={firstName}
                variant='outlined'
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                value={lastName}
                variant='outlined'
                onChange={e => setLastName(e.target.value)}
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
          >
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>User Type</InputLabel>
              <Select
                htmlFor='weapon_arming'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={userType}
                label='User Type'
                onChange={e => setUserType(e.target.value)}
                disabled={!(userAccount !== null && userAccount.admin)}
              >
                <MenuItem value={true}>Admin</MenuItem>
                <MenuItem value={false}>User</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>Rank</InputLabel>
              <Select
                htmlFor='rank'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={rank}
                label='Rank'
                onChange={e => setRank(e.target.value)}
              >
                <MenuItem value={'e1'}>AB</MenuItem>
                <MenuItem value={'e2'}>AMN</MenuItem>
                <MenuItem value={'e3'}>A1C</MenuItem>
                <MenuItem value={'e4'}>SrA</MenuItem>
                <MenuItem value={'e5'}>SSgt</MenuItem>
                <MenuItem value={'e6'}>TSgt</MenuItem>
                <MenuItem value={'e7'}>MSgt</MenuItem>
                <MenuItem value={'e8'}>SMSgt</MenuItem>
                <MenuItem value={'e9'}>CMSgt</MenuItem>
                <MenuItem value={'o1'}>2LT</MenuItem>
                <MenuItem value={'o2'}>1LT</MenuItem>
                <MenuItem value={'o3'}>Capt</MenuItem>
                <MenuItem value={'o4'}>Major</MenuItem>
                <MenuItem value={'o5'}>Lt. Col</MenuItem>
                <MenuItem value={'o6'}>Colonel</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>Arm Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status}
                label='Arm'
                sx={{ mb: 2 }}
                onChange={e => setStatus(e.target.value)}
                disabled={!(userAccount !== null && userAccount.admin)}
              >
                <MenuItem value={true}>Arm 🟢</MenuItem>
                <MenuItem value={false}>Do Not Arm🔴</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
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
                value={weaponArr.map(weap => weap.weapon)}
                input={<OutlinedInput label='Tag' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {allWeapons.map((weaponObject, index) => (
                  <MenuItem
                    id={weaponObject.id}
                    key={index}
                    value={weaponObject.id}
                  >
                    <Checkbox
                      onChange={handleChange}
                      defaultChecked={weaponArr.some(
                        wep => wep.id === weaponObject.id
                      )}
                    />
                    <ListItemText primary={weaponObject.weapon} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Email'
                value={email}
                variant='outlined'
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

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
                    value={flightObject.flight}
                  >
                    {flightObject.flight}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              id='outlined-textarea'
              label='Notes'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              value={notes === null ? 'N/A' : notes}
              sx={{ mb: 2 }}
              onChange={e => setNotes(e.target.value)}
            />
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
              variant='contained'
              sx={{ borderRadius: '30px', backgroundColor: '#8B0000', mr: 2 }}
              onClick={handleItemClickOpen}
            >
              Delete User
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
                  Once the User is Deleted, it cannot be recovered. Are you sure
                  you want to delete this User?
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
                  onClick={() => handleDeleteUser()}
                  autoFocus
                >
                  Delete User
                </Button>
              </DialogActions>
            </Dialog>
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
