import React, { useContext, useState } from 'react';
import { MemberContext } from './MemberContext';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Avatar,
  Badge,
  Modal,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import '../styles/MembersDetail.css';
import logo from '../logo.svg';
import Grid from '@mui/material/Unstable_Grid2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const { userAccount, removeCookie, setUserAccount } =
    useContext(MemberContext);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    setFlag(!flag);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setFlag(!flag);
  };

  const handleNavigate = path => {
    navigate(path);
    handleDrawerClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open} onClose={handleDrawerClose}>
        <Toolbar>
          <IconButton
            color='secondary'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          {flag === true ? null : (
            <Box ml={4}>
              <Button onClick={() => navigate('/')}>
                <img src={logo} alt='logo' />
              </Button>
            </Box>
          )}

          <Grid
            xs
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            mr={2}
          >
            {userAccount === null ? (
              <Typography variant='h5' component='h6'>
                <Button
                  variant='text'
                  color='secondary'
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </Button>
              </Typography>
            ) : (
              <>
                <Badge
                  sx={{ m: 2, marginRight: 3 }}
                  color='secondary'
                  //increment this with number of notifications
                  badgeContent={0}
                  showZero
                >
                  {/* <NotificationsIcon /> */}
                  <NotificationModal />
                </Badge>
                {/* <Avatar
                  onClick={() => navigate(`/sfmembers/${userAccount.id}`)}
                  alt='Security Forces Member'
                  src=''
                  sx={{
                    cursor: 'pointer',
                  }}
                /> */}
                <EditAccount />
                <Button
                  variant='text'
                  color='secondary'
                  sx={{ ml: 2 }}
                  onClick={() => {
                    removeCookie('user');
                    removeCookie('auth');
                    setUserAccount(null);
                    navigate('/login');
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#212121',
            color: 'white',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          {flag === false ? null : (
            <Box>
              <Button onClick={() => handleNavigate('/')}>
                <img src={logo} alt='logo' style={{ width: '100%' }} />
              </Button>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon sx={{ color: 'white' }} />
            ) : (
              <ChevronRightIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>

        <Typography
          sx={{ display: 'flex', justifyContent: 'center', color: 'white' }}
        >
          {userAccount !== null && userAccount.admin
            ? 'Admin View'
            : 'User View'}
        </Typography>
        <Divider light />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Dash Board' sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/sfmembers')}>
              <ListItemIcon>
                <GroupsIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='People' sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              disabled={!(userAccount !== null && userAccount.admin)}
              onClick={() => handleNavigate('/data')}
            >
              <ListItemIcon>
                <SignalWifiStatusbar4BarIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Data Sources' sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              disabled={!(userAccount !== null && userAccount.admin)}
              onClick={() => handleNavigate('/settings')}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Post Settings' sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider light />
      </Drawer>
      <Main open={open} onClose={handleDrawerClose}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

const EditAccount = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userAccount } = useContext(MemberContext);
  const navigate = useNavigate();
  // console.log(userAccount);

  const style = {
    position: 'absolute',
    top: '20%',
    right: '1%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  const handleCloseModal = path => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <Avatar
        onClick={handleOpen}
        alt='Security Forces Member'
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
            sx={{ mt: 1, textAlign: 'left' }}
          >
            {`${userAccount.rank.toUpperCase()} ${userAccount.first_name} ${
              userAccount.last_name
            }`}
          </Typography>

          <Button
            onClick={() => handleCloseModal(`/sfmembers/${userAccount.id}`)}
            color='secondary'
            variant='text'
          >
            My Profile
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const NotificationModal = () => {
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
            sx={{ mt: 1, textAlign: 'left' }}
          >
            Notifications
          </Typography>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center' }}
          >
            Today
          </Typography>
          <Stack direction='row'>
            <Card sx={{ width: '100%' }}>
              <CalendarTodayIcon />
              <CardContent>Schedule to be posted</CardContent>
            </Card>
          </Stack>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center' }}
          >
            Yesterday
          </Typography>
          <Stack direction='row'>
            <Card sx={{ width: '100%' }}>
              <CalendarTodayIcon />
              <CardContent>Schedule to be posted</CardContent>
            </Card>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
