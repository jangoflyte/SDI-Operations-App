import React, { useContext } from 'react';
import { MemberContext } from '../MemberContext';
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
  Switch,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import CloudIcon from '@mui/icons-material/Cloud';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import '../styles/MembersDetail.css';
import logo from '../passlogo.svg';
import fullLogo from '../logo/fullLogo.svg';
import Grid from '@mui/material/Unstable_Grid2';
import { NotificationModal } from './Notification';
import { AvatarMenu } from './AvatarMenu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FolderIcon from '@mui/icons-material/Folder';

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
  const { userAccount, darkMode, setDarkMode, setCookie, userDomain, cookies } =
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

  //   handleClickOutside(event) {
  //     if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
  //       alert("You clicked outside of me!");
  //     }
  //   }

  //   render() {
  //     return <div ref={this.wrapperRef}>{this.props.children}</div>;
  //   }
  // }

  const handleNavigate = path => {
    navigate(path);
    handleDrawerClose();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'beginning',
            }}
          >
            {flag === true ? null : (
              <Button onClick={() => navigate('/')}>
                <img src={fullLogo} alt='logo' style={{ height: 50 }} />
              </Button>
            )}
          </Box>
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
                <IconButton
                  color='inherit'
                  onClick={() => {
                    setDarkMode(prevMode =>
                      prevMode === 'light' ? 'dark' : 'light'
                    );
                    setCookie(
                      'color_mode',
                      darkMode === 'light' ? 'dark' : 'light',
                      {
                        domain: userDomain,
                        path: '/',
                        sameSite: 'None',
                        secure: 'true',
                      }
                    );
                  }}
                >
                  {darkMode === 'light' ? (
                    <MaterialUISwitch cookies={cookies} checked={false} />
                  ) : (
                    <MaterialUISwitch cookies={cookies} checked />
                  )}
                </IconButton>
                <NotificationModal />
                <AvatarMenu />
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
            hover: '#8B8989	',
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
            <ListItemButton onClick={() => handleNavigate('/calendar')}>
              <ListItemIcon>
                <CalendarMonthIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Calendar' sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/weather')}>
              <ListItemIcon>
                <CloudIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Weather' sx={{ color: 'white' }} />
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
                <FolderIcon sx={{ color: 'white' }} />
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

          <ListItem disablePadding>
            <ListItemButton
              disabled={!(userAccount !== null && userAccount.admin)}
              onClick={() => handleNavigate('/schedule')}
            >
              <ListItemIcon>
                <ManageHistoryIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary='Schedule Settings'
                sx={{ color: 'white' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider light />

        <Box
          // mb='auto'
          // mt='auto'
          sx={{
            display: 'flex',
            justifyContent: 'end',
            flexDirection: 'column',
            alignSelf: 'flex-end',
          }}
        >
          <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
            ver 1.0.9000
          </Typography>
          <Typography>© Post Assignment Scheduling System</Typography>
          <Typography>Last updated: yesterday</Typography>
        </Box>
      </Drawer>
      <Main open={open} onClose={handleDrawerClose}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

const MaterialUISwitch = styled(Switch)(({ theme, cookies }) => ({
  width: 62,
  height: 34,
  padding: 7,

  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage:
          cookies.color_mode === 'dark'
            ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
              )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff'
              )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: cookies.color_mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },

  '& .MuiSwitch-thumb': {
    backgroundColor: cookies.color_mode === 'dark' ? '#003892' : '#fcd303',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage:
        cookies.color_mode === 'light'
          ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
          : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff'
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
