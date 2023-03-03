import React, { useContext, useState, useEffect } from 'react'
import { MemberContext } from '../MemberContext'
import '../styles/MembersDetail.css'
import {
  Box,
  Button,
  Divider,
  Typography,
  Modal,
  TextField,
  InputLabel,
  Menu,
  MenuItem,
  Stack,
  FormControl,
  Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const EditShiftModal = props => {
  const { API, setTriggerFetch, allFlights, triggerFetch } =
    useContext(MemberContext)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [shiftName, setshiftName] = useState('')
  const [selectedPosts, setSelectedPosts] = useState([])
  const [postIdArray, setPostIdArray] = useState([])
  const [manReq, setManReq] = useState('')
  const [cert, setCert] = useState('')
  const [flight, setFlight] = useState('')
  const [schedDate, setSchedDate] = useState(new Date())
  const { currDate, allTemplates, postArray } = props
  const [startDate, setStartDate] = useState(new Date(currDate))
  const [endDate, setEndDate] = useState(new Date(currDate))
  const [selectedDate, handleDateChange] = useState(new Date())
  const [selectedDate1, handleDateChange1] = useState(new Date())
  // const [postArray, setPostArray] = useState([])
  const [template, setTemplate] = useState('')
  const theme = useTheme()
  const { positions, allTempaltes } = props

  // console.log('This is new allTemplates ', allTemplates)
  // if (allTemplates.length > 0) {
  //   let test = new Date(allTemplates[0].start_date)
  //   console.log('This is test ', test)
  // }
  const addTemplate = temp => {
    const postIds = temp.post_array.map(post => post.post_id)
    // handlePostsBox(postIds)
    setshiftName(temp.name)
    // setStartDate(new Date(temp.start_date))
    // setEndDate(new Date(temp.end_date))
  }

  useEffect(() => {
    setStartDate(new Date(currDate))
    setEndDate(new Date(currDate))
  }, [currDate])

  // useEffect(() => {
  //   const newPost = {
  //     shift: shiftName,
  //     man_req: manReq,
  //     cert_id: cert,
  //     flight: flight,
  //     // weapon_req: ,
  //     // shift: shift,
  //     post_array: postIdArray,
  //     start_date: startDate.toISOString(),
  //     end_date: endDate.toISOString(),
  //   };

  //   console.log('This is new post ', newPost);
  // }, [postIdArray, shiftName, manReq, cert, flight, startDate, endDate]);

  //need to modify this so old data is persisted
  const handleAdd = () => {
    // const shift = isDay ? 'days' : 'mids';
    const newShift = {
      template: template,
      shift: shiftName.toLowerCase(),
      // man_req: manReq,
      // cert_id: cert,
      flight_assigned: flight,
      // weapon_req: ,
      // shift: shift,
      post_array: postIdArray,
      start_datetime: startDate.toISOString(),
      end_datetime: endDate.toISOString()
    }
    console.log('newPost ', newShift, 'cert NaN ', parseInt(cert))

    fetch(`${API}/position/`, {
      method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(newShift),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      // .then(window.location.reload(false))
      .then(res => res.json())
      // .then(window.location.reload(false))
      .then(() => {
        handleClose()
        setTriggerFetch(curr => !curr)
        setshiftName(null)
        setManReq(null)
        setCert(null)
        setFlight(null)
        setTemplate('')

        setSelectedPosts([])
        // setToggleAlert(true);
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  const handlePostsBox = postId => {
    if (!postIdArray.includes(postId)) {
      setPostIdArray(curr => [...curr, postId])
      setSelectedPosts(curr => [
        ...curr,
        postArray.filter(post => post.id === postId)[0]
      ])
    } else if (postIdArray.includes(postId)) {
      setPostIdArray(curr => curr.filter(post => post !== postId))
      setSelectedPosts(curr => curr.filter(post => post.id !== postId))
    }
  }

  return (
    <>
      <Tooltip title='Edit Shift Cycle'>
        <Divider>
          <Button
            onClick={handleOpen}
            // color={"secondary"}
            variant='text'
            sx={{
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[900]
                  : 'white',
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? '#fafafa'
                    : theme.palette.grey[900]
              }
            }}
          >
            SHIFT
          </Button>
        </Divider>
      </Tooltip>
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
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ textAlign: 'center' }}
          >
            SCHEDULE
          </Typography>
          <Typography
            id='modal-modal-description'
            variant='h4'
            sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
          >
            Add Shift
          </Typography>

          <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>Template</InputLabel>
              <Select
                htmlFor='template'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={template}
                label='Template'
                onChange={e => setTemplate(e.target.value)}
              >
                <MenuItem value=''>No Template</MenuItem>
                {Array.isArray(allTemplates) &&
                  allTemplates.map((temp, index) => (
                    <MenuItem
                      id={temp.id}
                      key={index}
                      value={temp.id}
                      // onClick={() => addTemplate(temp)}
                    >
                      {temp.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Shift Name'
                disabled={template !== ''}
                value={shiftName}
                variant='outlined'
                onChange={e => setshiftName(e.target.value)}
              />
            </FormControl>
          </Stack>
          {/* <Stack
            direction='row'
            mt={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Manning Requirements'
                value={manReq}
                variant='outlined'
                onChange={e => setManReq(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>
                Certifications
              </InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cert}
                label='Certifications'
                onChange={e => setCert(e.target.value)}
              >
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>
          </Stack> */}

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              //justifyContent: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-simple-select-label'>Flight</InputLabel>
              <Select
                htmlFor='cert_id'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={flight}
                disabled={template !== ''}
                label='Flight'
                onChange={e => setFlight(e.target.value)}
              >
                {allFlights.map((flightObject, index) => (
                  <MenuItem
                    id={flightObject.id}
                    key={index}
                    value={flightObject.id}
                  >
                    {flightObject.flight}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <InputLabel id='demo-multiple-checkbox-label'>Posts</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={selectedPosts.map(post => post.post_name)}
                input={<OutlinedInput label='Tag' />}
                disabled={template !== ''}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {postArray.map((postObject, index) => (
                  <MenuItem
                    id={postObject.id}
                    key={index}
                    value={postObject.id}
                    onClick={() => handlePostsBox(postObject.id)}
                  >
                    <Checkbox
                      // onChange={handleChange}
                      checked={selectedPosts.some(
                        post => post.id === postObject.id
                      )}
                      // checked={weapon.some(
                      //   wep => wep.weapon_id === postObject.id
                      // )}

                      // make seperate component ?
                    />
                    <ListItemText primary={postObject.post_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              //justifyContent: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='date'
                label='Start Date'
                type='date'
                defaultValue={startDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {
                  if (e.target.value === '') {
                    setStartDate(new Date());
                    e.target.value = new Date().toISOString().split('T')[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setStartDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='date'
                label='End Date'
                type='date'
                defaultValue={endDate.toISOString().split('T')[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'white'
                      : theme.palette.grey[900],
                  cursor: 'pointer',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => {
                  if (e.target.value === '')js {
                    setEndDate(new Date());
                    e.target.value = new Date().toISOString().split('T')[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setEndDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl sx={{ width: '40ch' }}>
                <DateTimePicker
                  label='Start Date'
                  renderInput={props => <TextField {...props} />}
                  value={startDate}
                  disabled={template !== ''}
                  // theme={theme.palette.primary.main}
                  onChange={setStartDate}

                  //   showTodayButton
                />
              </FormControl>
              <FormControl sx={{ width: '40ch' }}>
                <DateTimePicker
                  label='End Date'
                  renderInput={props => <TextField {...props} />}
                  value={endDate}
                  disabled={template !== ''}
                  // theme={theme}
                  onChange={setEndDate}

                  //   showTodayButton
                />
              </FormControl>
            </LocalizationProvider>
          </Stack>

          <Stack
            direction='row'
            mt={3}
            sx={{
              borderRadius: '30px',
              display: 'flex',
              justifyContent: 'right'
            }}
          >
            <Button
              onClick={() => handleAdd()}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px' }}
            >
              Add Shift
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
