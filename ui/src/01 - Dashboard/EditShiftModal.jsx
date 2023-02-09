import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/MembersDetail.css';
import {
  Box,
  Button,
  Divider,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Stack,
  FormControl,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
  borderRadius: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditShiftModal = props => {
  const { API, setTriggerFetch, allFlights } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [shiftName, setshiftName] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [postIdArray, setPostIdArray] = useState([]);
  const [postArray, setPostArray] = useState([]);
  const [manReq, setManReq] = useState('');
  const [cert, setCert] = useState('');
  const [flight, setFlight] = useState('');
  const [schedDate, setSchedDate] = useState(new Date());
  const { currDate } = props;
  const [startDate, setStartDate] = useState(new Date(currDate));
  const [endDate, setEndDate] = useState(new Date(currDate));
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const theme = useTheme();
  const { positions } = props;

  console.log('This is currdate ', currDate);
  useEffect(() => {
    fetch(`${API}/post`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setPostArray(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log('This is end date (edit shift modal)', endDate);
  }, [endDate]);

  useEffect(() => {
    setStartDate(new Date(currDate));
    setEndDate(new Date(currDate));
  }, [currDate]);

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
      shift: shiftName.toLowerCase(),
      // man_req: manReq,
      // cert_id: cert,
      flight_assigned: flight,
      // weapon_req: ,
      // shift: shift,
      post_array: postIdArray,
      start_datetime: startDate.toISOString(),
      end_datetime: endDate.toISOString(),
    };
    console.log('newPost ', newShift, 'cert NaN ', parseInt(cert));

    fetch(`${API}/position/`, {
      method: 'POST',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(newShift),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      // .then(window.location.reload(false))
      .then(res => res.json())
      // .then(window.location.reload(false))
      .then(() => {
        handleClose();
        setTriggerFetch(curr => !curr);
        setshiftName(null);
        setManReq(null);
        setCert(null);
        setFlight(null);

        setSelectedPosts([]);
        // setToggleAlert(true);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  // const handleChange = event => {
  //   const {
  //     target: { checked },
  //   } = event;
  //   console.log(event);
  //   console.log(
  //     'value: checked ',
  //     event.target.parentNode.parentNode.id,
  //     checked
  //   );
  //   let wepId = parseInt(event.target.parentNode.parentNode.id);
  //   if (checked && !postIdArray.includes(wepId)) {
  //     setPostIdArray(curr => [...curr, wepId]);
  //     setSelectedPosts(curr => [
  //       ...curr,
  //       allWeapons.filter(weapon => weapon.id === wepId)[0],
  //     ]);
  //   } else if (!checked) {
  //     setPostIdArray(curr => curr.filter(wep => wep !== wepId));
  //     setSelectedPosts(curr => curr.filter(weapon => weapon.id !== wepId));
  //   }
  // };

  const handlePostsBox = postId => {
    if (!postIdArray.includes(postId)) {
      setPostIdArray(curr => [...curr, postId]);
      setSelectedPosts(curr => [
        ...curr,
        postArray.filter(post => post.id === postId)[0],
      ]);
    } else if (postIdArray.includes(postId)) {
      setPostIdArray(curr => curr.filter(post => post !== postId));
      setSelectedPosts(curr => curr.filter(post => post.id !== postId));
    }
  };

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
                    : theme.palette.grey[900],
              },
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
              gap: 2,
            }}
          >
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Pick a Template (wip)'
                // value={manReq}
                variant='outlined'
                // onChange={e => setManReq(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <TextField
                id='outlined-basic'
                label='Shift Name'
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
              justifyContent: 'space-between',
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
              justifyContent: 'space-between',
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
                  if (e.target.value === '') {
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
              justifyContent: 'right',
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
  );
};
