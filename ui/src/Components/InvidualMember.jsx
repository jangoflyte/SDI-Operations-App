import React, { useContext, useState, useEffect } from 'react';
import { MemberContext } from './MemberContext';
import '../styles/Card.css';
import {
  Box,
  Grid,
  LinearProgress,
  Button,
  Typography,
  Stack,
  Chip,
  Tooltip,
  Divider,
  Avatar,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router';
import { UserPost } from './UserPost';
import { WeaponQuals } from '../Features/WeaponQuals';
import { EditAvatar } from './EditAvatar';
import { useTheme } from '@mui/material/styles';
import { EditMemberModal } from './EditMemberModal';

const IndividualMember = () => {
  const { member, API, setMember, triggerFetch, userAccount, color } =
    useContext(MemberContext);
  const { memberId } = useParams();
  const [scheduleArray, setScheduleArray] = useState(null);
  const [upcoming, setUpcoming] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetch(`${API}/users/${memberId}`)
      .then(res => res.json())
      .then(data => setMember(data[0]));
  }, [triggerFetch, memberId]);

  useEffect(() => {
    fetch(`${API}/schedule/${memberId}`)
      .then(res => res.json())
      .then(data => {
        // console.log('schedule data', data);
        setScheduleArray(data);
      });
  }, [triggerFetch, memberId]);

  if (member === undefined || member.length === 0) {
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <Stack direction='row' spacing={2}>
              <a
                href='/sfmembers'
                style={{ textDecoration: 'none', color: '#6D7AE5' }}
              >
                People&nbsp;
              </a>
              {`> `}
              {member.first_name
                ? `${member.first_name
                    .charAt(0)
                    .toUpperCase()}${member.first_name.slice(
                    1
                  )} ${member.last_name
                    .charAt(0)
                    .toUpperCase()}${member.last_name.slice(1)}`
                : `N/A`}
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {userAccount !== null ? (
              userAccount.id === parseInt(memberId) ? (
                <EditAvatar avatar={member} memberId={memberId} />
              ) : (
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: color,
                  }}
                  src={member.avatar}
                  alt='avatar'
                  size='large'
                >
                  {member.first_name
                    ? `${member.first_name.charAt(0).toUpperCase()}`
                    : `F`}
                  {member.last_name
                    ? `${member.last_name.charAt(0).toUpperCase()}`
                    : `L`}
                </Avatar>
              )
            ) : null}

            <Typography
              variant='h1'
              sx={{
                color: theme.palette.mode === 'light' ? 'inherit' : 'white',
              }}
            >
              {member.first_name
                ? `${member.first_name
                    .charAt(0)
                    .toUpperCase()}${member.first_name.slice(
                    1
                  )} ${member.last_name
                    .charAt(0)
                    .toUpperCase()}${member.last_name.slice(1)}`
                : `N/A`}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'top',
            justifyContent: 'center',
            gap: 3,
            mt: 5,
          }}
        >
          <Paper
            sx={{
              height: 600,
              width: 600,
              boxShadow: 3,
              borderRadius: 3,
              p: 5,
              //backgroundColor: 'white',
            }}
          >
            <Stack
              direction='row'
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                Profile Information
              </Typography>
              {userAccount !== null ? (
                userAccount.admin || userAccount.id === parseInt(memberId) ? (
                  <EditMemberModal memberObject={member} />
                ) : null
              ) : null}
            </Stack>
            <Divider sx={{ mt: 1.5 }}></Divider>
            <Grid container sx={{ mt: 5 }}>
              <Box display='flex' flexDirection='column' sx={{ width: '70%' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Name:</Typography>
                <Typography sx={{ mb: 5 }}>
                  {member.first_name
                    ? `${member.first_name
                        .charAt(0)
                        .toUpperCase()}${member.first_name.slice(
                        1
                      )} ${member.last_name
                        .charAt(0)
                        .toUpperCase()}${member.last_name.slice(1)}`
                    : `N/A`}
                </Typography>

                <Typography sx={{ fontWeight: 'bold' }}>Rank:</Typography>
                {member.rank === null ? (
                  <Typography sx={{ mb: 5 }}>N/A</Typography>
                ) : (
                  <Typography sx={{ mb: 5 }}>
                    {member.rank && member.rank.toUpperCase()}
                  </Typography>
                )}

                <Typography sx={{ fontWeight: 'bold' }}>
                  Weapons Qualifications:
                </Typography>
                {member.weapons.length === 0 ? (
                  <Typography sx={{ mb: 5 }}>No weapons</Typography>
                ) : member.weapons.length > 3 ? (
                  <Stack direction='row' mb={4}>
                    <WeaponQuals weapon={member.weapons} />
                  </Stack>
                ) : (
                  <Typography sx={{ mb: 5 }}>
                    {member.weapons
                      .map(item => item.weapon.toUpperCase())
                      .join(', ')}
                  </Typography>
                )}

                <Typography sx={{ fontWeight: 'bold' }}>Email:</Typography>
                {member.email === null ? (
                  <Typography sx={{ mb: 5 }}>No email</Typography>
                ) : member.email && member.email.length > 30 ? (
                  <Tooltip title={member.email}>
                    <Typography sx={{ mb: 5 }}>
                      {member.email.substring(0, 30)}...
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography sx={{ mb: 5 }}>{member.email}</Typography>
                )}
              </Box>

              <Box display='flex' flexDirection='column' sx={{ width: '30%' }}>
                <Typography sx={{ fontWeight: 'bold' }}>User Type:</Typography>
                <Typography sx={{ mb: 5 }}>
                  {member.admin === true ? 'Admin' : 'User'}
                </Typography>

                <Typography sx={{ fontWeight: 'bold' }}>
                  Certifications:
                </Typography>
                {member.certs.length === 0 ? (
                  <Typography sx={{ mb: 5 }}>No certs</Typography>
                ) : (
                  <Typography sx={{ mb: 5 }}>
                    {member.certs.map(item => item.cert)}
                  </Typography>
                )}

                <Typography component='span' sx={{ fontWeight: 'bold' }}>
                  Arm Status:
                </Typography>
                {member.weapon_arming === true ? (
                  <Chip label='Arm' color='success' />
                ) : (
                  <Chip label='Do Not Arm' color='error' />
                )}

                <Typography mt={4} sx={{ fontWeight: 'bold' }}>
                  Flight:
                </Typography>
                <Typography sx={{ mb: 5 }}>
                  {member.flight === null ? 'N/A' : member.flight.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
            <Typography sx={{ fontWeight: 'bold' }}>Notes:</Typography>
            <Box
              component='div'
              sx={{
                overflow: 'auto',
                maxHeight: 100,
                mt: 2,
                //bgcolor: '#edeef0',
                borderRadius: 2,
                p: 1,
              }}
            >
              {member.notes === null || undefined ? (
                <Typography sx={{ mb: 5 }}>N/A</Typography>
              ) : (
                <Typography sx={{ mb: 5 }}>{member.notes}</Typography>
              )}
            </Box>
          </Paper>
          <Paper
            sx={{
              mx: 5,
              width: 600,
              height: 600,
              boxShadow: 3,
              borderRadius: 3,
              p: 5,
              //backgroundColor: 'white',
            }}
          >
            <Stack
              direction='row'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {member.first_name + `'s`} {upcoming ? 'Upcoming ' : 'Past '}
                Schedule
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.2,
                }}
              >
                <Button
                  variant={upcoming ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '30px',
                    bgcolor: upcoming
                      ? theme.palette.secondary.main
                      : theme.palette.mode === 'light'
                      ? 'inherit'
                      : theme.palette.grey[800],
                  }}
                  onClick={() => setUpcoming(true)}
                >
                  Upcoming
                </Button>
                <Button
                  // variant='outlined'
                  variant={!upcoming ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '30px',
                    bgcolor: !upcoming
                      ? theme.palette.secondary.main
                      : theme.palette.mode === 'light'
                      ? 'inherit'
                      : theme.palette.grey[800],
                  }}
                  onClick={() => setUpcoming(false)}
                >
                  Past
                </Button>
              </Box>
            </Stack>
            <Divider sx={{ mt: 1.5 }}></Divider>
            <Stack
              direction='row'
              sx={{
                display: 'flex',
                direction: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                p: 1,
              }}
            >
              <Box sx={{ width: '20%' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Post
                </Typography>
              </Box>
              <Box sx={{ width: '20%' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Position
                </Typography>
              </Box>
              <Box sx={{ width: '30%' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Date
                </Typography>
              </Box>
              <Box sx={{ width: '20%' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  Time
                </Typography>
              </Box>
            </Stack>

            <Box
              component='div'
              sx={{
                //overflow: 'scroll',
                //maxHeight: 400,
                mt: 2,
                //bgcolor: '#edeef0',
                borderRadius: 2,
                p: 1,
              }}
            >
              {scheduleArray !== null && scheduleArray.length > 0 ? (
                scheduleArray.map((schedule, index) => {
                  // console.log('INDEX ', index);
                  schedule.upcoming = upcoming;
                  return (
                    <UserPost schedule={schedule} key={index} index={index} />
                  );
                })
              ) : (
                <p>Not Assigned to Any Posts</p>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }
};

export default IndividualMember;
