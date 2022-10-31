import React, { useState, useContext } from 'react';
import {
  Modal,
  Card,
  Box,
  Typography,
  Chip,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { MemberContext } from '../Components/MemberContext';
import { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { triggerFetch } = useContext(MemberContext);
  const { userAccount, API } = useContext(MemberContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadArray, setUnreadArray] = useState([]);
  const [triggerNotification, setTriggerNotification] = useState(false);

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
  }, [triggerNotification, triggerFetch]);

  // useEffect(() => {
  //   console.log('unread array, ', unreadArray);
  // }, [unreadArray]);

  const getNotification = () => {
    fetch(`${API}/notifications/${userAccount.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(`data before set`, data);
        // const notif = data.filter(
        //   notification => notification.user_id === userAccount.id
        // );
        data.sort(({ id: a }, { id: b }) => a - b);
        setNotifications(data);
        setUnreadArray(data.filter(notification => !notification.read));
        // console.log(`notifications after set`, notifications);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
    // console.log('user account', userAccount);
    // console.log(`notification`);
  };

  const handleClick = () => {
    getNotification();
    handleOpen();
    setTriggerNotification(!triggerNotification);
  };

  const NotificationRead = (notifId, read) => {
    fetch(`${API}/notifications/${userAccount.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: notifId,
        read: read,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(setTriggerNotification(!triggerNotification))
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  // /notifications/:joinId

  const NotificationDelete = joinId => {
    fetch(`${API}/notifications/${joinId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(setTriggerNotification(!triggerNotification))
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
        badgeContent={unreadArray.length > 0 ? unreadArray.length : null}
        showZero
      >
        <NotificationsIcon
          onClick={handleClick}
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
              <span key={index + 'span'}>
                {!notif.read ? (
                  <Typography>Unread</Typography>
                ) : (
                  <Typography>Read</Typography>
                )}

                <Accordion key={index}>
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
                    <Avatar
                      sx={
                        notif.read
                          ? { bgcolor: '#61F568' }
                          : { bgcolor: '#6D7AE5' }
                      }
                    >
                      <CalendarTodayIcon />
                    </Avatar>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: 1,
                        width: '100%',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        onClick={() => {
                          if (notif.read) return;
                          NotificationRead(notif.id, true);
                        }}
                      >
                        <Typography>{notif.notification.name}</Typography>
                      </AccordionSummary>
                    </Box>
                  </Card>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: 1,
                        width: '100%',
                      }}
                    >
                      <Typography>
                        Date Received:{' '}
                        {new Date(notif.notification.date_time).toDateString()}
                      </Typography>
                      <Typography>
                        Time Received:{' '}
                        {
                          new Date(notif.notification.date_time)
                            .toTimeString()
                            .split(' ')[0]
                        }
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: 1,
                        width: '100%',
                      }}
                    >
                      <Chip
                        sx={{
                          borderRadius: 10,
                          color: 'green',
                          mr: 1,
                        }}
                        //onClick={() => NotificationRead(!notif.id)}
                        onClick={() => {
                          if (!notif.read) return;
                          NotificationRead(notif.id, false);
                          handleClose();
                        }}
                        size='small'
                        icon={<CheckIcon />}
                        label='Notification Unread'
                        clickable
                      />
                      <Chip
                        sx={{
                          borderRadius: 10,
                          color: 'red',
                          mr: 1,
                        }}
                        onClick={() => {
                          NotificationDelete(notif.id);
                          //handleClose();
                        }}
                        size='small'
                        label='Delete Notification'
                        icon={<ClearIcon />}
                        clickable
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </span>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              bottom: 0,
              mt: 3,
            }}
          >
            <Button variant='text'>Clear Notifications</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
