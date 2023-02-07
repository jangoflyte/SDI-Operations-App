import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from '../MemberContext';
import '../styles/Card.css';
import {
  Box,
  Button,
  Typography,
  Modal,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const EditStatus = props => {
  const { memberObj, memberId } = props;
  const {
    API,
    member,
    setTriggerFetch,
    userAccount,
    setUserAccount,
    setCookie,
    cookies,
  } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState(memberObj.status);
  // console.log('member obj ', memberObj);

  useEffect(() => {
    setStatus(memberObj.status);
  }, [props]);

  //need to modify this so old data is persisted
  const handleEdit = () => {
    const updatedUser = {
      status: status,
    };
    //console.log('updated user, ', updatedUser);
    console.log('userInfo', userAccount.id);

    fetch(`${API}/updateuser/${member.id}`, {
      method: 'PATCH',
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(() => {
        setTriggerFetch(curr => !curr);
        if (member.id === userAccount.id) {
          setUserAccount({ ...userAccount, status: status });
          let userInfo = cookies.user;
          userInfo.status = status;
          setCookie('user', userInfo, {
            path: '/',
            maxAge: 90000,
            sameSite: 'None',
            secure: 'true',
          });
        }
      })
      .then(() => handleClose())
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  // useEffect(() => {
  //   console.log('weapon id Array ', weaponIdArray, 'allFlights', allFlights);
  // }, [weaponIdArray, allFlights]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 650,
    // height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  return (
    <>
      {member.status === null || member.status !== 'Available' ? (
        <Chip
          // onClick={handleOpen}
          onClick={() => {
            if (
              (userAccount !== null && userAccount.id === parseInt(memberId)) ||
              userAccount.admin
            ) {
              handleOpen();
            }
          }}
          label={member.status === null ? 'Other/Unavailable' : member.status}
          color='error'
          sx={
            (userAccount !== null && userAccount.id === parseInt(memberId)) ||
            userAccount.admin
              ? { fontSize: '25px', p: 2, cursor: 'pointer' }
              : { fontSize: '25px', p: 2, cursor: 'default' }
          }
          style={{ color: 'white' }}
        />
      ) : (
        <Chip
          // onClick={handleOpen}
          onClick={() => {
            if (
              (userAccount !== null && userAccount.id === parseInt(memberId)) ||
              userAccount.admin
            ) {
              handleOpen();
            }
          }}
          label='Available'
          color='success'
          sx={
            (userAccount !== null && userAccount.id === parseInt(memberId)) ||
            userAccount.admin
              ? { fontSize: '25px', p: 2, cursor: 'pointer' }
              : { fontSize: '25px', p: 2, cursor: 'default' }
          }
          style={{ color: 'white' }}
        />
      )}

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
            variant='h4'
            sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
          >
            Edit Status
          </Typography>

          <Stack
            direction='row'
            pt={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                htmlFor='status'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status}
                label='Status'
                onChange={e => setStatus(e.target.value)}
              >
                <MenuItem value={'Available'}>Available</MenuItem>
                <MenuItem value={'TDY'}>Temporary duty assignment</MenuItem>
                <MenuItem value={'Leave'}>Leave</MenuItem>
                <MenuItem value={'Other/Unavailable'}>
                  Other/Unavailable
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => handleEdit()}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px', mt: 3 }}
            >
              Save Status
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
