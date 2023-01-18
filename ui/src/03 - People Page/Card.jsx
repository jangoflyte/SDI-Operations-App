import React, { useContext, useEffect, useState } from 'react'
import { MemberContext } from '../MemberContext'
import {
  Stack,
  Box,
  Checkbox,
  Typography,
  Pagination,
  Button,
  Chip,
  TablePagination,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Avatar,
  Paper,
  Divider,
  Badge,
  Tooltip
} from '@mui/material'
import '../styles/Card.css'
import { useNavigate } from 'react-router-dom'
import { Filter } from './Filter'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import SecurityIcon from '@mui/icons-material/Security'
import { WeaponQuals } from '../00 - Features/WeaponQuals'
import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'

const BasicCard = props => {
  const { pageTrigger, filter, setFilter } = props
  const {
    setMember,
    API,
    usersArray,
    setTriggerFetch,
    userAccount,
    page,
    setPage
  } = useContext(MemberContext)
  const navigate = useNavigate()
  const [idArray, setIdArray] = useState([])
  //const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openItem, setOpenItem] = React.useState(false)
  const theme = useTheme()

  // filter check helper functions
  const certificationCheck = user => {
    if (filter.certification.length > 0) {
      return filter.certification.includes(user.cert_id)
    } else {
      return true
    }
  }
  const weaponCheck = user => {
    if (filter.weapon.length > 0) {
      return user.weapons.some(wep => {
        // console.log('weapon filter', filter.weapon);
        return filter.weapon.some(filterWep => {
          return filterWep === wep.weapon
        })
        // return filter.weapon.includes(wep.weapon);
      })
    } else {
      return true
    }
  }
  const flightCheck = user => {
    console.log('this is user ', user)
    if (filter.flight.length > 0) {
      return filter.flight.some(flight => {
        // console.log('this is flight ', flight);
        return user.flight !== null ? user.flight.flight === flight : false
      })
    } else {
      return true
    }
  }
  const armingCheck = user => {
    if (filter.arming_status.length > 0) {
      return filter.arming_status.includes(user.weapon_arming.toString())
    } else {
      return true
    }
  }
  const adminCheck = user => {
    if (filter.admin !== null) {
      return user.admin === filter.admin
    } else {
      return true
    }
  }

  // filter users
  let filteredUsers = useMemo(() => {
    return usersArray.filter(
      user =>
        certificationCheck(user) &&
        weaponCheck(user) &&
        armingCheck(user) &&
        adminCheck(user) &&
        flightCheck(user)
    )
  }, [usersArray, filter])

  useEffect(() => {
    setPage(0)
  }, [pageTrigger])

  const handleItemClickOpen = () => {
    setOpenItem(true)
  }

  const handleItemClose = () => {
    setOpenItem(false)
  }

  const onDataPageChange = (event, page) => setPage(page - 1)

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCheck = props => {
    const { event, member } = props
    if (event.target.checked) {
      setIdArray(curr => [...curr, member.id])
    } else {
      setIdArray(idArray.filter(id => id !== member.id))
    }
  }

  const navigateToMember = member => {
    // console.log('current member', member);
    setMember(member)
    navigate(`/sfmembers/${member.id}`)
  }

  const handleDeleteUser = inputArray => {
    for (let userId of inputArray) {
      fetch(`${API}/deleteuser/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        redirect: 'follow'
      })
        .then(res => res.json())
        .then(() => {
          setTriggerFetch(curr => !curr)
          handleItemClose()
          setPage(0)
        })
        .then(navigate('/sfmembers'))

        .catch(err => {
          console.log('Error: ', err)
        })
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        mx: 10,
        my: 5,
        borderRadius: 3
      }}
    >
      <Box sx={{ px: 5, py: 5 }}>
        <Stack
          component='span'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ display: 'flex' }}
        >
          <Box justifyContent='left' pb={2} sx={{ display: 'flex' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
              Members
            </Typography>
          </Box>

          <Box justifyContent='right' sx={{ display: 'flex' }}>
            <Filter filter={filter} setFilter={setFilter} />
          </Box>
        </Stack>
        <Divider />
        <Stack
          component='span'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          pt={2}
          sx={{ display: 'flex' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '5%' }}>
            {/* leave empty */}
            <div></div>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '22%'
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Rank</Typography>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '22%'
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '22%'
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Role</Typography>
          </Box>
          <Box
            sx={{ width: '22%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Certifications</Typography>
          </Box>
          <Box
            sx={{ width: '22%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Weapon Qualification
            </Typography>
          </Box>
        </Stack>

        <Stack sx={{ pb: 1, pt: 1 }}>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((member, index) => (
              <Stack
                key={index}
                className='card'
                direction='row'
                component='span'
                alignItems='center'
                sx={{
                  borderRadius: 3,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    width: '5%',
                    justifyContent: 'center'
                  }}
                >
                  <Checkbox
                    label='Name'
                    checked={idArray.includes(member.id)}
                    onChange={e => handleCheck({ event: e, member: member })}
                  />
                </Box>

                <Box
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '22%'
                  }}
                >
                  <Typography>
                    {member.rank ? member.rank.toUpperCase() : `No rank`}
                  </Typography>
                </Box>
                <Box
                  alignItems='center'
                  sx={{
                    width: '22%'
                  }}
                >
                  <Button fullWidth sx={{ borderRadius: 10 }}>
                    <Box
                      alignItems='center'
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        width: '100%',
                        gap: 1
                      }}
                      onClick={() => navigateToMember(member)}
                    >
                      {console.log(member.status)}
                      <Tooltip
                        title={
                          member.status === null
                            ? 'Other/Unavailable'
                            : member.status
                        }
                      >
                        <Badge
                          overlap='circular'
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          variant='dot'
                          sx={{
                            '& .MuiBadge-badge': {
                              // backgroundColor: '#44b700',
                              // color: '#44b700',
                              backgroundColor:
                                member.status === null ||
                                member.status !== 'Available'
                                  ? '#EE4B2B'
                                  : '#44b700',
                              color:
                                member.status === null ||
                                member.status !== 'Available'
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
                            sx={{
                              cursor: 'pointer',
                              // mr: 1,
                              bgcolor: member.avatar_background,
                              color:
                                theme.palette.mode === 'light'
                                  ? 'inherit'
                                  : 'white'
                            }}
                            src={member.avatar}
                            alt='avatar'
                            size='small'
                            onClick={() => navigateToMember(member)}
                          >
                            {member.first_name
                              ? `${member.first_name.charAt(0).toUpperCase()}`
                              : `N`}
                            {member.last_name
                              ? `${member.last_name.charAt(0).toUpperCase()}`
                              : `A`}
                          </Avatar>
                        </Badge>
                      </Tooltip>

                      <Typography
                        onClick={() => navigateToMember(member)}
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          color: '#6D7AE5',
                          ml: 1
                        }}
                      >
                        {' '}
                        {member.last_name
                          ? `${member.last_name
                              .charAt(0)
                              .toUpperCase()}${member.last_name.slice(
                              1
                            )}, ${member.first_name
                              .charAt(0)
                              .toUpperCase()}${member.first_name.slice(1)}`
                          : `N/A`}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '22%'
                  }}
                >
                  {member.admin === true ? (
                    <Typography>Admin</Typography>
                  ) : (
                    <Typography>User</Typography>
                  )}
                </Box>

                <Box
                  justifyContent='right'
                  sx={{
                    display: 'flex',
                    width: '22%'
                  }}
                >
                  {member.certs.length === 0 ? (
                    <Chip
                      icon={<WorkspacePremiumIcon />}
                      label='No Certs'
                      color='primary'
                      sx={{ color: 'white' }}
                    />
                  ) : (
                    <Chip
                      icon={<WorkspacePremiumIcon />}
                      label={member.certs.map(cert => cert.cert)}
                      color='success'
                      sx={{ color: 'white' }}
                    />
                  )}
                </Box>

                <Box
                  justifyContent='right'
                  sx={{
                    display: 'flex',
                    width: '22%'
                  }}
                >
                  {member.weapons.length === 0 ? (
                    <Chip
                      color='primary'
                      icon={<SecurityIcon />}
                      label='No Weapons'
                      sx={{ color: 'white' }}
                    />
                  ) : member.weapons.length > 2 ? (
                    <WeaponQuals weapon={member.weapons} />
                  ) : (
                    member.weapons.map((weapon, index) => (
                      <Chip
                        key={index}
                        icon={<SecurityIcon />}
                        label={weapon.weapon.toUpperCase()}
                        color='secondary'
                        sx={{ m: 1 / 4, color: 'white' }}
                      />
                    ))
                  )}
                </Box>
              </Stack>
            ))}
        </Stack>
        <Divider />
        <Stack
          component='span'
          direction='row'
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            {userAccount !== null && userAccount.admin ? (
              <Button
                variant='contained'
                size='medium'
                sx={{ borderRadius: '30px', bgcolor: '#8B0000' }}
                onClick={handleItemClickOpen}
              >
                Delete Users
              </Button>
            ) : null}
            <Dialog
              open={openItem}
              onClose={handleItemClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Are You Sure You Want to Delete?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Once the Users are Deleted, they cannot be recovered. Are you
                  sure you want to delete these Users from the Database?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleItemClose}>Cancel</Button>
                <Button
                  sx={{
                    borderRadius: '30px',
                    color: 'red',
                    mr: 2
                  }}
                  onClick={() => {
                    const confirmation = true
                    if (confirmation) {
                      handleDeleteUser(idArray)
                    }
                  }}
                  autoFocus
                >
                  Delete Users
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              onChange={onDataPageChange}
              page={page + 1}
              color='secondary'
            />
          </Box>
          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30, 50]}
              component='div'
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}

export default BasicCard
