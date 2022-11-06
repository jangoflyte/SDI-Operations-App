import React, { useContext, useState, useEffect, useMemo } from 'react';
import { MemberContext } from './MemberContext';
import '../styles/MembersDetail.css';
import BasicCard from '../Features/Card';
import {
  Box,
  LinearProgress,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Alert,
  FormControl,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AddMemberModal } from './AddMemberModal';

export const MemberDetails = () => {
  const {
    API,
    setUsersArray,
    usersArray,
    triggerFetch,
    userAccount,
    toggleAlert,
    setToggleAlert,
    setPage,
  } = useContext(MemberContext);
  const [searchText, setSearchText] = useState('');
  const [changeView, setChangeView] = useState(0);
  const [flag, setFlag] = useState(false);
  const [pageTrigger, setPageTrigger] = useState(true);
  const [filter, setFilter] = useState({
    certification: [],
    weapon: [],
    arming_status: [],
    admin: null,
    flight: [],
  });

  useEffect(() => {
    fetch(`${API}/usersearch/${searchText}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setUsersArray(data);
      })
      .catch(err => console.log(err));
  }, [searchText, triggerFetch, toggleAlert]);

  const handleView = view => {
    setChangeView(view);
    setFlag(!flag);
    setPage(0);
  };

  useMemo(() => {
    setTimeout(() => {
      setToggleAlert(false);
    }, 3000);
  }, [toggleAlert]);

  const buttonSX = {
    borderRadius: '30px',
    marginRight: '10px',
    '&:hover': {
      color: 'secondary',
    },
  };

  if (!usersArray) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Stack
          sx={{
            width: '100vw',
            position: 'absolute',
            left: 0,
            top: '10vh',
          }}
        >
          <Fade in={toggleAlert} timeout={1000}>
            <Alert severity='success' spacing={2} mb={2}>
              Your new user, has successfully been added.
            </Alert>
          </Fade>
        </Stack>
        <Box sx={{ width: '90%' }}>
          <Typography
            variant='h3'
            ml={10}
            pb={4}
            sx={{
              fontWeight: 'bold',
            }}
          >
            People
          </Typography>
          <Stack
            component='span'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ display: 'flex' }}
          >
            <Box
              justifyContent='left'
              sx={{
                width: '100%',
                ml: 10,
                display: 'flex',
              }}
            >
              <FormControl sx={{ width: '40ch' }}>
                <TextField
                  label='Search People'
                  id='fullWidth'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={e => {
                    setSearchText(e.target.value);
                    setPageTrigger(!pageTrigger);
                  }}
                />
              </FormControl>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', mx: '80px' }} pt={3}>
            <Box justifyContent='left' sx={{ display: 'flex' }}>
              <Button
                color={changeView === 0 ? 'secondary' : 'primary'}
                variant='contained'
                size='large'
                sx={buttonSX}
                onClick={() => {
                  handleView(0);
                  setFilter({ ...filter, admin: null });
                }}
              >
                All
              </Button>
              <Button
                color={changeView === 2 ? 'secondary' : 'primary'}
                variant='contained'
                size='large'
                sx={buttonSX}
                onClick={() => {
                  handleView(2);
                  setFilter({ ...filter, admin: false });
                }}
              >
                Users
              </Button>
              <Button
                color={changeView === 1 ? 'secondary' : 'primary'}
                variant='contained'
                size='large'
                sx={buttonSX}
                onClick={() => {
                  handleView(1);
                  setFilter({ ...filter, admin: true });
                }}
              >
                Admins
              </Button>
            </Box>
            <Box
              justifyContent='right'
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              {userAccount !== null && userAccount.admin ? (
                <AddMemberModal />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '90%' }}>
          <BasicCard
            key={1}
            pageTrigger={pageTrigger}
            filter={filter}
            setFilter={setFilter}
          />
        </Box>
      </Box>
    );
  }
};
