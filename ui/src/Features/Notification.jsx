import React, { useState, useContext } from 'react';
import { Modal, Card, Box, Typography, Chip, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { MemberContext } from '../Components/MemberContext';
import { useEffect } from 'react';

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

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    fetch(`${API}/notifications/${userAccount.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data before set`, data);
        // const notif = data.filter(
        //   notification => notification.user_id === userAccount.id
        // );
        setNotifications(data);
        console.log(`notifications after set`, notifications);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
    console.log('user account', userAccount);
    console.log(`notification`);
  };

  const onClick = () => {
    getNotification();
    handleOpen();
  };

  const NotificationRead = notifId => {
    fetch(`${API}/notifications/${userAccount.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: notifId,
        read: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data after patch`, data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  // notifications.map(notif => notif.notification.name);
  return (
    <>
      <Badge
        sx={{ m: 2, marginRight: 1 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        color='secondary'
        overlap='circular'
        //increment this with number of notifications
        badgeContent={notifications.length}
        showZero
      >
        <NotificationsIcon
          onClick={onClick}
          alt='notification'
          src=''
          sx={{
            cursor: 'pointer',
          }}
        />
      </Badge>

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
            {notifications.length <= 0 && (
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                  fontWeight: 'bold',
                }}
              >
                {' '}
                You have no new notifications{' '}
              </Typography>
            )}
            {notifications.map((notif, index) => (
              <span key={index}>
                <Card
                  sx={
                    notif.read
                      ? {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          paddingLeft: 1,
                          backgroundColor: '#edeef0',
                        }
                      : {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          paddingLeft: 1,
                        }
                  }
                >
                  <CalendarTodayIcon />

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
                    </Typography>
                  </Box>
                  <Chip
                    sx={{
                      borderRadius: 10,
                      color: 'red',
                      mr: 1,
                    }}
                    onClick={() => NotificationRead(notif.id)}
                    size='small'
                    label='X'
                  />
                </Card>
              </span>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
