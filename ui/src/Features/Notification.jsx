import React, { useState, useContext } from 'react';
import { Modal, Card, Box, Typography, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { MemberContext } from '../Components/MemberContext';

export const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userAccount, API } = useContext(MemberContext);
  const [notifications, setNotifications] = useState([]);

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

  const getNotification = () => {
    fetch(`${API}/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data`, data);
        const notif = data.filter(
          notification => notification.user_id === userAccount.id
        );
        setNotifications(notif);
      });
    console.log('user account', userAccount);
    console.log(`notification`);
  };

  const onClick = () => {
    getNotification();
    handleOpen();
  };

  // notifications.map(notif => notif.notification.name);
  return (
    <>
      <NotificationsIcon
        onClick={onClick}
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
            sx={{ mt: 1, textAlign: 'Center', fontWeight: 'bold' }}
          >
            Notifications
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {notifications.length === 0 && (
              <Typography> you have no new notifications </Typography>
            )}
            {notifications.map((notif, index) => (
              <>
                {notif.read === false ? (
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      paddingLeft: 1,
                    }}
                    key={index}
                  >
                    <CalendarTodayIcon />
                    {console.log(`notif true?`, notif.read)}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: 1,
                        width: '100%',
                      }}
                    >
                      <Typography>{notif.notification.name}</Typography>
                      <Typography>
                        {new Date(notif.notification.date_time).toDateString()}
                        <Button
                          sx={{
                            borderRadius: '30px',
                            color: 'red',
                            mr: 2,
                          }}
                          // onClick={}
                          autoFocus
                        >
                          x
                        </Button>
                      </Typography>
                    </Box>
                  </Card>
                ) : (
                  <Card> you have no notifications </Card>
                )}
              </>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
