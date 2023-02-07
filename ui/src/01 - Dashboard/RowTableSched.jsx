import React, { useState } from 'react';
import { Chip, Avatar, Box } from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PostMemberModal from './AddMember';
import EditSchedule from './EditSchedule';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';
import { WeaponQuals } from '../00 - Features/WeaponQuals';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export const RowTableSched = props => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const splitArr = row.weapons.split(' ');
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component='th' scope='row'>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {row.name &&
              row.name.post_name.charAt(0).toUpperCase() +
                row.name.post_name.slice(1)}
            {row.users.filter(user => user.noUser === true).length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#BD5334;',
                  borderRadius: 20,
                  px: 0.5,
                  py: 0.5,
                  color: 'white',
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                  style={{ width: 25 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12
                  9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73
                  0 2.813-1.874 1.948-3.374L13.949
                  3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12
                  15.75h.007v.008H12v-.008z'
                  />
                </svg>
              </Box>
            )}
          </Box>
        </TableCell>
        <TableCell align='right'>{row.man_req}</TableCell>

        <TableCell align='right'>
          {splitArr.length > 3 ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <WeaponQuals weapon={splitArr} />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                gap: 1,
              }}
            >
              {splitArr.map((wep, index) => (
                <Box key={index}>
                  {wep.length === 0 ? (
                    <Chip
                      icon={<SecurityIcon />}
                      label='No Weapon'
                      color='primary'
                      sx={{ color: 'white' }}
                    />
                  ) : (
                    <Chip
                      icon={<SecurityIcon />}
                      label={wep.toUpperCase()}
                      color='secondary'
                      sx={{ color: 'white' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </TableCell>

        <TableCell align='right'>
          <Chip
            icon={<WorkspacePremiumIcon />}
            label={row.cert.length > 0 ? row.cert[0].cert : null}
            color='success'
            sx={{ color: 'white' }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant='h6'
                gutterBottom
                component='div'
              ></Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Posted
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Members
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                      Weapon
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                      Cert
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.users.map((userRow, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {!userRow.noUser ? (
                          <span>
                            <EditSchedule
                              role={index}
                              post={row.name ? row.name.post_name : ''}
                              weapon_req={row.weapons}
                              cert_req={row.cert}
                              post_id={row.post_id}
                              fetchSchedule={row.fetchSchedule}
                              currentDate={row.currentDate}
                              userRow={userRow}
                              delSchedule={row.delSchedule}
                              shift={row.shift}
                              row={row}
                            />
                            {`${userRow.role}`}
                          </span>
                        ) : (
                          <PostMemberModal
                            role={index}
                            post={row.name ? row.name.post_name : ''}
                            weapon_req={row.weapons}
                            cert_req={row.cert}
                            post_id={row.post_id}
                            fetchSchedule={row.fetchSchedule}
                            currentDate={row.currentDate}
                            shift={row.shift}
                            row={row}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!userRow.noUser ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'start',
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                cursor: 'pointer',
                                bgcolor: userRow.user_info[0].avatar_background,
                                color:
                                  theme.palette.mode === 'light'
                                    ? 'inherit'
                                    : 'white',
                              }}
                              src={userRow.user_info[0].avatar}
                              alt='avatar'
                              size='small'
                              onClick={() =>
                                navigate(
                                  `/sfmembers/${userRow.user_info[0].id}`
                                )
                              }
                            >
                              {userRow.user_info[0].first_name
                                ? userRow.user_info[0].first_name
                                    .charAt(0)
                                    .toUpperCase()
                                : null}
                              {userRow.user_info[0].last_name
                                ? userRow.user_info[0].last_name
                                    .charAt(0)
                                    .toUpperCase()
                                : null}
                            </Avatar>
                            {`${
                              userRow.user_info[0].first_name
                                .charAt(0)
                                .toUpperCase() +
                              userRow.user_info[0].first_name.slice(1)
                            } ${
                              userRow.user_info[0].last_name
                                .charAt(0)
                                .toUpperCase() +
                              userRow.user_info[0].last_name.slice(1)
                            }
                            `}
                          </Box>
                        ) : (
                          `No One Posted`
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        {!userRow.noUser &&
                          `${userRow.user_info[0].weapons
                            .map(wep => `${wep.weapon.toUpperCase()}`)
                            .join(', ')}`}
                      </TableCell>
                      <TableCell align='right'>
                        {!userRow.noUser &&
                          `${userRow.user_info[0].certs[0].cert}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
