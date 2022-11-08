import React, { useContext, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
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
} from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';

const ReplaceMemberModal = props => {
  const {
    role,
    post,
    weapon_req,
    cert_req,
    post_id,
    fetchSchedule,
    currentDate,
    shift,
  } = props;
  const { API, data, setPostAlert } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  let weaponsReq = weapon_req.split(' ');

  const filterFlight = data.filter(user => {
    let wepResults = weaponsReq.map(wep => {
      let tests = user.weapons.map(usrWep => wep.includes(usrWep.weapon));
      if (tests.includes(true)) {
        return true;
      } else {
        return false;
      }
    });
    let certResults = user.certs.map(cert => cert.id >= cert_req[0].id);
    if (wepResults.includes(true) && certResults.includes(true)) {
      return true;
    } else {
      return false;
    }
  });

  const onDataPageChange = (event, page) => setPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    p: 4,
  };

  const patchSchedule = patchInfo => {
    console.log('patching schedule');
    fetch(`${API}/schedule`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(patchInfo),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log(data);
        // call update for users
        fetchSchedule();
        setPostAlert(true);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  // post info to post_schedule
  // position id  // post prop
  // user id // from selected user
  // date // schedul filtered
  // time // schedule filtered
  // role // role prop

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant='outlined'
        color='error'
        size='small'
        sx={{ mr: 10, px: 0, minWidth: 22 }}
      >
        Replace Airman
      </Button>
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
                p: 3,
              }}
            >
              {currentDate.toDateString()}
              <br />
              Post: {post}&nbsp;&nbsp;&nbsp;
              {role === 0 && `Shift: Lead`}
              {role === 1 && `Shift: Alpha`}
              {role === 2 && `Shift: Bravo`}
              {role === 3 && `Shift: Charle`}
              <br />
              Panama 12
            </Box>
          </Box>

          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 1,
              mt: 10,
              px: 5,
            }}
          >
            {filterFlight.length > 0
              ? filterFlight
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
                              border: '2px solid blue',
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
                            backgroundColor: 'none',
                          },
                          {
                            '&:hover': {
                              backgroundColor: '#DCDCDC',
                            },
                          },
                        ]}
                      >
                        <Box
                          sx={{ textAlign: 'left', minWidth: '30%' }}
                        >{`${user.first_name} ${user.last_name}`}</Box>
                        <Box sx={{ textAlign: 'center', minWidth: '30%' }}>
                          {
                            <Chip
                              icon={<WorkspacePremiumIcon />}
                              label={user.certs[0].cert}
                              color='success'
                            />
                          }
                        </Box>
                        <Box sx={{ textAlign: 'right', minWidth: '40%' }}>
                          {user.weapons.map((wep, index) => (
                            <span key={index}>
                              <Chip
                                icon={<SecurityIcon />}
                                label={wep.weapon.toUpperCase()}
                                color='secondary'
                              />
                              &nbsp;
                            </span>
                          ))}
                        </Box>
                      </Paper>
                    </Button>
                  ))
              : `Loading`}
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
                  handleClose();
                  let shiftTime;
                  if (shift === 'Days') shiftTime = '06:00:00';
                  if (shift === 'Mids') shiftTime = '18:00:00';
                  let postUser = {
                    position_id: post_id,
                    user_id: selected,
                    date: currentDate,
                    time: shiftTime,
                    role: role,
                  };
                  {
                    role === 0 && (postUser.role = 'Lead');
                  }
                  {
                    role === 1 && (postUser.role = 'Alpha');
                  }
                  {
                    role === 2 && (postUser.role = 'Bravo');
                  }
                  {
                    role === 3 && (postUser.role = 'Charlie');
                  }
                  console.log('user info to post', postUser);
                  patchSchedule(postUser);
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
  );
};

export default ReplaceMemberModal;
