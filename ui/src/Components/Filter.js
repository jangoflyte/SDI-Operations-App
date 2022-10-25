import React, { useState } from 'react';
//import { MemberContext } from './MemberContext';
import {
  Box,
  Typography,
  Modal,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Filter = () => {
  //const { usersArray } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   const [cert, setCert] = useState(0);
  //   const [weapon, setWeapon] = useState(0);
  //   const [status, setStatus] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  // const entry = usersArray.filter(member => member.cert_id === 1);
  // const patrol = usersArray.filter(member => member.cert_id === 2);
  // const desk = usersArray.filter(member => member.cert_id === 3);
  // const sergeant = usersArray.filter(member => member.cert_id === 4);

  // const arm = usersArray.filter(member => member.weapon_arming === true);
  // const noarm = usersArray.filter(member => member.weapon_arming === false);

  //console.log(noarm)

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        color='secondary'
        sx={{ borderRadius: '30px' }}
      >
        Filter
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
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            Filters
          </Typography>
          <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
            <FormLabel component='legend' sx={{ fontWeight: 'bold' }}>
              By Certification
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name='ecp' />}
                label='Entry Controller'
              />
              <FormControlLabel
                control={<Checkbox name='patrol' />}
                label='Patrol'
              />
              <FormControlLabel
                control={<Checkbox name='desk' />}
                label='Desk Sergeant'
              />
              <FormControlLabel
                control={<Checkbox name='flight chief' />}
                label='Flight Chief'
              />
            </FormGroup>

            <FormLabel component='legend' sx={{ fontWeight: 'bold' }}>
              By Weapon Qualification
            </FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox name='m4' />} label='M-4' />
              <FormControlLabel
                control={<Checkbox name='m18' />}
                label='M-18'
              />
            </FormGroup>

            <FormLabel component='legend' sx={{ fontWeight: 'bold' }}>
              Arming Status
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name='arm' />}
                label='Can Arm'
              />
              <FormControlLabel
                control={<Checkbox name='no arm' />}
                label='Cannot Arm'
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};
