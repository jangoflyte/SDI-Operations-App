import React, { useContext, useState, useMemo, useEffect } from 'react'
import { MemberContext } from '../MemberContext'
import {
  Button,
  Modal,
  Box,
  Paper,
  Typography,
  Chip,
  TablePagination,
  Pagination,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Avatar
} from '@mui/material/'
import CloseIcon from '@mui/icons-material/Close'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import SecurityIcon from '@mui/icons-material/Security'
import { WeaponQuals } from '../00 - Features/WeaponQuals'
import { useTheme } from '@mui/material/styles'

const PostMemberModal = props => {
  const {
    role,
    post,
    weapon_req,
    cert_req,
    post_id,
    fetchSchedule,
    currentDate,
    shift
  } = props
  const { API, data, setToggleAlert, userAccount, allFlights, rows } =
    useContext(MemberContext)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [selected, setSelected] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [flight, setFlight] = useState('alpha-1')
  const [flightId, setFlightId] = useState(1)
  const [timeCheck, setTimeCheck] = useState(true)
  const [filterFlight, setFilterFlight] = useState([])
  const [trigerFilter, setTrigerFilter] = useState(true)
  const [scheduledUser, setScheduledUser] = useState([])
  const theme = useTheme()

  useEffect(() => {
    console.log('TEST flight id ', rows[0].position.flight_assigned, allFlights)
    const tempFlightId = rows[0].position.flight_assigned
    setFlight(allFlights[tempFlightId - 1].flight)
    setFlightId(tempFlightId)
  }, [rows])

  useMemo(() => {
    setTimeout(() => {
      setTimeCheck(!timeCheck)
    }, 1300)
  }, [filterFlight])

  let weaponsReq = weapon_req.split(' ')
  // console.log('this is rows', rows);
  /////////////// grabs user id for scheduled users //////////////////////////
  useEffect(() => {
    let posted = []
    rows.forEach(row => {
      const position = row.name.post_name
      row.users.forEach(user => {
        if (user.noUser) return
        posted.push({ user: user.user_info[0].id, position: position })
      })
    })

    setScheduledUser(posted)
  }, [rows])

  //////////////////filters personnel by flight & no double posting///////////////
  useMemo(() => {
    let results = data.filter(user => {
      let wepResults = [true]
      if (weaponsReq[0] !== '') {
        filterFlight

        wepResults = weaponsReq.map(wep => {
          // console.log("wep", wep);
          let tests = user.weapons.map(usrWep => wep.includes(usrWep.weapon))

          if (tests.includes(true)) {
            return true
          } else {
            return false
          }
        })
      }
      console.log('THis is cert req ', cert_req)
      let certResults = user.certs.map(cert => cert.id >= cert_req[0].id)
      let posted = scheduledUser.map(user => user.user)

      console.log('user flight thing ', user)
      if (posted.includes(user.id)) return false
      if (
        wepResults.includes(true) &&
        certResults.includes(true) &&
        user.flight !== null &&
        user.flight.flight === flight &&
        user.status === 'Available'
      ) {
        return true
      } else {
        return false
      }
    })
    setFilterFlight(results)
  }, [trigerFilter, flightId, flight])

  const onDataPageChange = (event, page) => setPage(page - 1)
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  ///////////////adds members to schedule//////////////////////////////
  const patchSchedule = patchInfo => {
    console.log('patching schedule')
    fetch(`${API}/schedule`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(patchInfo)
    })
      .then(res => {
        return res.json()
      })
      .then(() => {
        // call update for users
        fetchSchedule()
        setToggleAlert(true)
        window.scrollTo(0, 0)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }

  // post info to post_schedule
  // position id  // post prop
  // user id // from selected user
  // date // schedul filtered
  // time // schedule filtered
  // role // role prop

  const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '60vw',
    height: 'auto',
    minHeight: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000000',
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      {userAccount !== null && userAccount.admin ? (
        <Button
          onClick={() => {
            // console.log(role)
            // console.log(post)
            setOpen(true)
          }}
          variant='outlined'
          color='error'
          size='small'
          sx={{ mr: 10, px: 0, minWidth: 22 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            style={{ width: 20 }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
        </Button>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>

          <Typography sx={{ textAlign: 'center', fontSize: '2.2rem' }}>
            Select Qualifying Airman
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: 3,
                width: '75%',
                p: 3
              }}
            >
              <b>{currentDate.toDateString()}</b>
              <br />
              <b>Post:</b> {post}&nbsp;&nbsp;&nbsp;
              {role === 0 && `Shift: Lead`}
              {role === 1 && `Shift: Alpha`}
              {role === 2 && `Shift: Bravo`}
              {role === 3 && `Shift: Charle`}
              <br />
              Panama 12
            </Box>
          </Box>
          <Box
            sx={{
              mt: 3,
              ml: 5,
              display: 'flex',
              justifyContent: 'beginning',
              alignItems: 'center'
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>Flight</InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={flight}
                label='Flight'
                onChange={e => {
                  setTimeCheck(!timeCheck)
                  setFlight(e.target.value)
                  setTrigerFilter(!trigerFilter)
                }}
              >
                {allFlights.map((flightObject, index) => (
                  <MenuItem
                    id={flightObject.id}
                    key={index}
                    value={flightObject.flight}
                  >
                    {flightObject.flight.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 1,
              mt: 3,
              px: 5
            }}
          >
            {filterFlight.length > 0 ? (
              filterFlight
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <Button
                    key={index}
                    sx={
                      selected !== user.id
                        ? { borderRadius: 2.5, p: 0 }
                        : {
                            borderRadius: 2.5,
                            p: 0,
                            border: '2px solid blue'
                          }
                    }
                    onClick={() => setSelected(user.id)}
                  >
                    <Paper
                      sx={[
                        {
                          display: 'flex',
                          alignItems: 'center',

                          flexDirection: 'row',
                          p: 2,
                          width: '100%',
                          borderRadius: 2.5,
                          backgroundColor: 'none'
                        },
                        {
                          '&:hover': {
                            //backgroundColor: "#DCDCDC",
                          }
                        }
                      ]}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'beginning',
                          gap: 1,
                          minWidth: '30%'
                        }}
                      >
                        <Avatar
                          sx={{
                            cursor: 'pointer',
                            bgcolor: user.avatar_background,
                            color:
                              theme.palette.mode === 'light'
                                ? 'inherit'
                                : 'white'
                          }}
                          src={user.avatar}
                          alt='avatar'
                          size='small'
                        >
                          {user.first_name.charAt(0).toUpperCase()}
                          {user.last_name.charAt(0).toUpperCase()}
                        </Avatar>

                        {`${
                          user.first_name.charAt(0).toUpperCase() +
                          user.first_name.slice(1)
                        } ${
                          user.last_name.charAt(0) +
                          user.last_name.slice(1).toUpperCase()
                        }`}
                      </Box>

                      <Box sx={{ textAlign: 'center', minWidth: '30%' }}>
                        {
                          <Chip
                            icon={<WorkspacePremiumIcon />}
                            label={user.certs[0].cert}
                            color='success'
                            sx={{
                              color: 'white'
                            }}
                          />
                        }
                      </Box>

                      <Box sx={{ textAlign: 'right', minWidth: '40%' }}>
                        {user.weapons.length > 3 ? (
                          <>
                            <WeaponQuals weapon={user.weapons} />
                          </>
                        ) : (
                          user.weapons.map((wep, index) => (
                            <span key={index}>
                              <Chip
                                icon={<SecurityIcon />}
                                label={wep.weapon.toUpperCase()}
                                color='secondary'
                                sx={{
                                  color: 'white'
                                }}
                              />
                              &nbsp;
                            </span>
                          ))
                        )}
                      </Box>
                    </Paper>
                  </Button>
                ))
            ) : (
              <Box sx={{ width: '100%' }}>
                {timeCheck ? (
                  <LinearProgress />
                ) : (
                  <Typography
                    variant='h5'
                    component='span'
                    color='error'
                    sx={{ fontWeight: 'bold' }}
                  >
                    No Personnel Meet Requirements.
                  </Typography>
                )}
              </Box>
            )}
          </Stack>

          <Stack
            direction='row'
            mt={3}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box
              justifyContent='left'
              alignItems='center'
              sx={{ borderRadius: '30px', display: 'flex' }}
            >
              <Button
                onClick={() => {
                  handleClose()
                  let shiftTime
                  if (shift === 'Days') shiftTime = '06:00:00'
                  if (shift === 'Mids') shiftTime = '18:00:00'
                  let postUser = {
                    position_id: post_id,
                    user_id: selected,
                    date: currentDate,
                    time: shiftTime,
                    role: role
                  }
                  {
                    role === 0 && (postUser.role = 'Lead')
                  }
                  {
                    role === 1 && (postUser.role = 'Alpha')
                  }
                  {
                    role === 2 && (postUser.role = 'Bravo')
                  }
                  {
                    role === 3 && (postUser.role = 'Charlie')
                  }
                  patchSchedule(postUser)
                }}
                color='secondary'
                variant='contained'
                sx={{ borderRadius: '30px' }}
              >
                ADD TO SCHEDULE
              </Button>
            </Box>

            <Box
              justifyContent='left'
              alignItems='center'
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Pagination
                count={Math.ceil(filterFlight.length / rowsPerPage)}
                onChange={onDataPageChange}
                page={page + 1}
                color='secondary'
              />
            </Box>

            <Box justifyContent='right' sx={{ display: 'flex' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component='div'
                count={filterFlight.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default PostMemberModal
