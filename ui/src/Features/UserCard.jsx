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
} from '@mui/material';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../Components/Filter.js';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';

const UserCard = props => {
  const { pageTrigger } = props;
  const { setMember, API, usersArray, setTriggerFetch, userAccount } =
    useContext(MemberContext);
  const navigate = useNavigate();
  const [idArray, setIdArray] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
  }, [pageTrigger]);

  const onDataPageChange = (event, page) => setPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigateToMember = member => {
    console.log('current member', member);
    setMember(member);
    navigate(`/sfmembers/${member.id}`);
  };

  const handleCheck = props => {
    const { event, member } = props;
    if (event.target.checked) {
      setIdArray(curr => [...curr, member.id]);
    } else {
      setIdArray(idArray.filter(id => id !== member.id));
    }
  };

  const handleDeleteUser = inputArray => {
    for (let userId of inputArray) {
      fetch(`${API}/deleteuser/${userId}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          setTriggerFetch(curr => !curr);
          //navigate("/sfmembers")
          // handleClose()
        })
        .then(navigate('/sfmembers'))
        //.then(window.location.reload(false))
        .catch(err => {
          console.log('Error: ', err);
        });
    }
  };

  //useEffect(()=>{console.log(idArray)},[idArray])
  let users = usersArray.filter(member => member.admin == false);

  return (
    <Box
      sx={{
        boxShadow: 3,
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
              Users
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
          <Box
            ml={10}
            justifyContent='left'
            alignItems='center'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 600,
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Rank</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Role</Typography>
          </Box>
          <Box sx={{ width: 500, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Certifications</Typography>
          </Box>
          <Box sx={{ width: 500, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Weapon Qualification
            </Typography>
          </Box>
        </Stack>

        <Stack sx={{ py: 5 }}>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((member, index) =>
              member.admin === false ? (
                <Stack
                  key={index}
                  className='card'
                  direction='row'
                  component='span'
                  alignItems='center'
                  sx={{
                    borderRadius: 3,
                    display: 'flex',
                  }}
                >
                  <Box
                    justifyContent='left'
                    alignItems='center'
                    sx={{ display: 'flex', width: 100 }}
                  >
                    <Checkbox
                      label='Name'
                      checked={idArray.includes(member.id)}
                      onChange={e => handleCheck({ event: e, member: member })}
                    />
                  </Box>

                  <Box
                    justifyContent='left'
                    alignItems='center'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: 600,
                    }}
                  >
                    <Typography>{member.rank.toUpperCase()}</Typography>
                    <Typography
                      onClick={() => navigateToMember(member)}
                      sx={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: 'blue',
                      }}
                    >
                      {member.last_name}, {member.first_name}
                    </Typography>
                    {member.admin === true ? (
                      <Typography>Admin</Typography>
                    ) : (
                      <Typography>User</Typography>
                    )}
                  </Box>

                  <Box
                    justifyContent='right'
                    sx={{ display: 'flex', width: 500 }}
                  >
                    <Typography component='span' sx={{ textAlign: 'center' }}>
                      {member.certs.length === 0 ? (
                        <Chip
                          icon={<WorkspacePremiumIcon />}
                          label='No Certs'
                          color='success'
                        />
                      ) : (
                        <Chip
                          icon={<WorkspacePremiumIcon />}
                          label={member.certs.map(cert => cert.cert)}
                          color='success'
                        />
                      )}
                    </Typography>
                  </Box>

                  <Box
                    justifyContent='right'
                    sx={{ display: 'flex', width: 500 }}
                  >
                    <Typography component='span' sx={{ textAlign: 'center' }}>
                      {member.weapons.length === 0 ? (
                        <Chip
                          color='secondary'
                          icon={<SecurityIcon />}
                          label='No Weapons'
                        />
                      ) : (
                        member.weapons.map((weapon, index) => (
                          <span key={index}>
                            <Chip
                              icon={<SecurityIcon />}
                              label={weapon.weapon.toUpperCase()}
                              color='secondary'
                            />
                            &nbsp;
                          </span>
                        ))
                      )}
                      {/* <Chip icon={<SecurityIcon />} label={member.weapons.map(weapon => (weapon.weapon))} color="secondary"/> */}
                    </Typography>
                  </Box>
                </Stack>
              ) : null
            )}
        </Stack>

        <Stack
          component='span'
          direction='row'
          alignItems='center'
          sx={{
            display: 'flex',
            //justifyContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {userAccount !== null && userAccount.admin ? (
              <Button
                color='secondary'
                variant='contained'
                size='medium'
                sx={{ borderRadius: '30px' }}
                onClick={() => {
                  // const confirmation = window.confirm(
                  //   'Are you sure you want to delete users? It will permanently delete their account'
                  // );
                  const confirmation = true;
                  if (confirmation) {
                    handleDeleteUser(idArray);
                  }
                }}
              >
                Delete User
              </Button>
            ) : null}
          </Box>

          <Box>
            <Pagination
              count={Math.ceil(users.length / rowsPerPage)}
              onChange={onDataPageChange}
              page={page + 1}
              color='secondary'
            />
          </Box>

          <Box>
            {/* <Checkbox></Checkbox> */}
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component='div'
              count={users.length}
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

export default UserCard;
