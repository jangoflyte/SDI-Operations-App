import React, { useContext } from 'react'
import {
  Box,
  Divider,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
  Badge,
  ListItemIcon
} from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import Key from '@mui/icons-material/Key'
import { useNavigate } from 'react-router-dom'
import { MemberContext } from '../Components/MemberContext'
import { EditStatusNavbar } from '../Components/EditStatusNavbar'
// import { styled } from '@mui/material/styles'

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     // backgroundColor: '#44b700',
//     // color: '#44b700',
//     // color: {member.status !== null && member.status !== 'Available' ? },
//     // member.status !== null && member.status !== 'Available'
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: 'ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""'
//     }
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0
//     }
//   }
// }))

export const AvatarMenu = () => {
  const navigate = useNavigate()
  const { userAccount, removeCookie, setUserAccount, member } =
    useContext(MemberContext)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
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
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              sx={{
                '& .MuiBadge-badge': {
                  // backgroundColor: '#44b700',
                  // color: '#44b700',
                  backgroundColor:
                    userAccount.status === null ||
                    userAccount.status !== 'Available'
                      ? '#EE4B2B'
                      : '#44b700',
                  color:
                    userAccount.status === null ||
                    userAccount.status !== 'Available'
                      ? '#EE4B2B'
                      : '#44b700',
                  // member.status !== null && member.status !== 'Available'
                  boxShadow: `0 0 0 1px #fafafafa`,
                  '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""'
                  }
                }
              }}
            >
              <Avatar
                alt='Security Forces Member'
                src={userAccount.avatar}
                sx={{
                  cursor: 'pointer',
                  bgcolor: userAccount.avatar_background
                }}
              >
                {userAccount.first_name.charAt(0).toUpperCase()}
                {userAccount.last_name.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
              mr: 1
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
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/sfmembers/${userAccount.id}`)
            handleClose()
          }}
        >
          <Avatar
            alt='Security Forces Member'
            src={userAccount.avatar}
            sx={{
              cursor: 'pointer',
              bgcolor: userAccount.avatar_background
            }}
          >
            {userAccount.first_name.charAt(0).toUpperCase()}
            {userAccount.last_name.charAt(0).toUpperCase()}
          </Avatar>{' '}
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/changepass`)
            handleClose()
          }}
        >
          <ListItemIcon>
            <Key fontSize='small' />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <EditStatusNavbar
          memberObj={userAccount}
          memberId={userAccount.id}
          closeMainModal={handleClose}
        />
        <Divider />

        <MenuItem
          onClick={() => {
            removeCookie('user')
            removeCookie('auth')
            setUserAccount(null)
            navigate('/login')
            location.reload()
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
