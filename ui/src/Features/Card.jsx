import React, { useContext, useEffect, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
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
} from '@mui/material';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../Components/Filter.js';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';

const BasicCard = props => {
  const { pageTrigger } = props;
  const { setMember, API, usersArray, setTriggerFetch, userAccount } =
    useContext(MemberContext);
  const navigate = useNavigate();
  const [idArray, setIdArray] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openItem, setOpenItem] = React.useState(false);

  useEffect(() => {
    setPage(0);
  }, [pageTrigger]);

  const handleItemClickOpen = () => {
    setOpenItem(true);
  };

  const handleItemClose = () => {
    setOpenItem(false);
  };

  const onDataPageChange = (event, page) => setPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheck = props => {
    const { event, member } = props;
    if (event.target.checked) {
      setIdArray(curr => [...curr, member.id]);
    } else {
      setIdArray(idArray.filter(id => id !== member.id));
    }
  };

  useEffect(() => {
    setPage(0);
  }, []);

  const navigateToMember = member => {
    console.log('current member', member);
    setMember(member);
    navigate(`/sfmembers/${member.id}`);
  };

  const handleDeleteUser = inputArray => {
    for (let userId of inputArray) {
      fetch(`${API}/deleteuser/${userId}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          setTriggerFetch(curr => !curr);
          handleItemClose();
          setPage(0);
        })
        .then(navigate('/sfmembers'))

        .catch(err => {
          console.log('Error: ', err);
        });
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 5,
        mx: 10,
        my: 5,
        borderRadius: 3,
        backgroundColor: 'white',
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
              All Users
            </Typography>
          </Box>

          <Box justifyContent='right' sx={{ display: 'flex' }}>
            <Filter />
          </Box>
        </Stack>

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
              width: '22%',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Rank</Typography>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '22%',
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
          </Box>
          <Box
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '22%',
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

        <Stack sx={{ py: 5 }}>
          {usersArray
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
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    width: '5%',
                    justifyContent: 'center',
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
                    width: '22%',
                  }}
                >
                  <Typography>
                    {member.rank ? member.rank.toUpperCase() : `No rank`}
                  </Typography>
                </Box>
                <Box
                  alignItems='center'
                  sx={{
                    width: '22%',
                  }}
                >
                  <Button fullWidth sx={{ borderRadius: 10 }}>
                    <Box
                      alignItems='center'
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        width: '100%',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{ cursor: 'pointer', mr: 1 }}
                        src={member.avatar}
                        alt='avatar'
                        size='small'
                        onClick={() => navigateToMember(member)}
                      >
                        {member.first_name.charAt(0).toUpperCase()}
                        {member.last_name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography
                        onClick={() => navigateToMember(member)}
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          color: 'blue',
                        }}
                      >
                        {member.last_name.charAt(0).toUpperCase() +
                          member.last_name.slice(1)}{' '}
                        ,{' '}
                        {member.first_name.charAt(0).toUpperCase() +
                          member.first_name.slice(1)}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
                <Box
                  alignItems='center'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '22%',
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
                    width: '22%',
                  }}
                >
                  {member.certs.length === 0 ? (
                    <Chip
                      icon={<WorkspacePremiumIcon />}
                      label='No Certs'
                      color='primary'
                    />
                  ) : (
                    <Chip
                      icon={<WorkspacePremiumIcon />}
                      label={member.certs.map(cert => cert.cert)}
                      color='success'
                    />
                  )}
                </Box>

                <Box
                  justifyContent='right'
                  sx={{
                    display: 'flex',
                    width: '22%',
                  }}
                >
                  {member.weapons.length === 0 ? (
                    <Chip
                      color='primary'
                      icon={<SecurityIcon />}
                      label='No Weapons'
                    />
                  ) : member.weapons.length > 2 ? (
                    <>
                      {/* <Chip
                        icon={<SecurityIcon />}
                        label={member.weapons.length + ' Weapons...'}
                        color='secondary'
                        sx={{ m: 1 / 4 }}
                      /> */}
                      <WeaponQuals weapon={member.weapons} />
                    </>
                  ) : (
                    member.weapons.map((weapon, index) => (
                      <Chip
                        key={index}
                        icon={<SecurityIcon />}
                        label={weapon.weapon.toUpperCase()}
                        color='secondary'
                        sx={{ m: 1 / 4 }}
                      />
                    ))
                  )}
                </Box>
              </Stack>
            ))}
        </Stack>

        <Stack
          component='span'
          direction='row'
          alignItems='center'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
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
                    mr: 2,
                  }}
                  onClick={() => {
                    // const confirmation = window.confirm(
                    //   'Are you sure you want to delete users? It will permanently delete their account'
                    // );
                    const confirmation = true;
                    if (confirmation) {
                      handleDeleteUser(idArray);
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
              count={Math.ceil(usersArray.length / rowsPerPage)}
              onChange={onDataPageChange}
              page={page + 1}
              color='secondary'
            />
          </Box>

          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component='div'
              count={usersArray.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

function WeaponQuals(props) {
  const { weapon } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Chip
        onClick={handleClickOpen}
        icon={<SecurityIcon />}
        label={weapon.length + ' Weapons...'}
        color='secondary'
        sx={{ m: 1 / 4 }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='customized-dialog-title' sx={{ fontWeight: 'bold' }}>
          {'List of Weapon Qualifications:'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='customized-dialog-description'>
            <ul>
              {weapon.map((wep, index) => (
                <li key={index}>
                  {wep.weapon.toUpperCase()} - {wep.type}
                </li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BasicCard;
