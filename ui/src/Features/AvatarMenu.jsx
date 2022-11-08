import React, { useContext } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
  ListItemIcon,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Key from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import { MemberContext } from '../Components/MemberContext';

export const AvatarMenu = () => {
  const navigate = useNavigate();
  const { userAccount, removeCookie, setUserAccount } =
    useContext(MemberContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account Settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt='Security Forces Member'
              src={userAccount.avatar}
              sx={{
                cursor: 'pointer',
              }}
            >
              {userAccount.first_name.charAt(0).toUpperCase()}
              {userAccount.last_name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/sfmembers/${userAccount.id}`);
            handleClose();
          }}
        >
          <Avatar
            alt='Security Forces Member'
            src={userAccount.avatar}
            sx={{
              cursor: 'pointer',
            }}
          >
            {userAccount.first_name.charAt(0).toUpperCase()}
            {userAccount.last_name.charAt(0).toUpperCase()}
          </Avatar>{' '}
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/changepass`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Key fontSize='small' />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={() => {
            removeCookie('user');
            removeCookie('auth');
            setUserAccount(null);
            navigate('/login');
            location.reload();
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
