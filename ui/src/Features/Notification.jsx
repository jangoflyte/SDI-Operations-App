import React, { useState } from 'react';
import {
  Modal,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

export const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '35%',
    right: '1%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    overflowY: 'scroll',
    maxHeight: '90%',
  };

  return (
    <>
      <NotificationsIcon
        onClick={handleOpen}
        alt='notification'
        src=''
        sx={{
          cursor: 'pointer',
        }}
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
            variant='h6'
            sx={{ mt: 1, textAlign: 'left', fontWeight: 'bold' }}
          >
            Notifications
          </Typography>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
          >
            Today
          </Typography>
          <Stack direction='row'>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <CalendarTodayIcon sx={{ mr: 2 }} />
                Schedule to be posted
              </CardContent>
            </Card>
          </Stack>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
          >
            Yesterday
          </Typography>
          <Stack direction='row'>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <CalendarTodayIcon sx={{ mr: 2 }} />
                Schedule to be posted
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
