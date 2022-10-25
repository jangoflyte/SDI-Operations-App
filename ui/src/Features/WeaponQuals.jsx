import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function WeaponQuals(props) {
  const { weapon } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Stack direction='row'>
        <Typography sx={{ mb: 5 }}>{weapon.length} Weapons</Typography>

        <IconButton
          variant='outlined'
          onClick={handleClickOpen}
          size='small'
          sx={{ ml: 2, width: 33, height: 33 }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack> */}
      <Chip
        onClick={handleClickOpen}
        label={`${weapon.length} Weapons`}
        icon={<AddCircleOutlineIcon />}
        //deleteicon={<AddCircleOutlineIcon />}
        color='secondary'
        clickable
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='customized-dialog-title' sx={{ fontWeight: 'bold' }}>
          {'List of Weapon Qualifications:'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            component='span'
            id='customized-dialog-description'
          >
            <ul>
              {weapon.map((wep, index) => (
                <li key={index}>
                  {wep.weapon
                    ? `${wep.weapon.toUpperCase()} - ${wep.type}`
                    : wep.toUpperCase()}
                </li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
