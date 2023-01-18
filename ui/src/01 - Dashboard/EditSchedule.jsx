import React, { useState, useContext } from 'react'
import { Button, Modal, Box, Typography } from '@mui/material/'
import CloseIcon from '@mui/icons-material/Close'
import { MemberContext } from '../MemberContext'
import ReplaceMemberModal from './ReplaceMember'

const EditSchedule = props => {
  const { role, post, delSchedule, currentDate, userRow, row } = props
  const { userAccount } = useContext(MemberContext)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '50vw',
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
            setOpen(true)
          }}
          variant='outlined'
          color='info'
          size='small'
          sx={{ mr: 5, px: 0, minWidth: 22 }}
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
          <Typography
            sx={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 'bold' }}
          >
            Edit Post Assignment
          </Typography>
          <Typography
            sx={{ textAlign: 'center', fontSize: '1.2rem' }}
          >{`Are you sure you want to modify ${post} position 
            ${
              (role === 0 && `Lead`) ||
              (role === 1 && `Alpha`) ||
              (role === 2 && `Bravo`) ||
              (role === 3 && `Charle`)
            } assignment?`}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: 3,
                width: '75%',
                p: 3
              }}
            >
              {currentDate.toDateString()}
              <br />
              {userRow.user_info[0].first_name.charAt(0).toUpperCase() +
                userRow.user_info[0].first_name.slice(1)}{' '}
              {userRow.user_info[0].last_name.charAt(0).toUpperCase() +
                userRow.user_info[0].last_name.slice(1)}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button
              onClick={() => {
                handleClose()
              }}
              color='secondary'
              variant='contained'
              sx={{ mt: 5, borderRadius: '30px' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose()
                delSchedule(userRow.id)
              }}
              color='secondary'
              variant='outlined'
              sx={{ borderRadius: '30px', mt: 5 }}
            >
              Remove Airman
            </Button>
            <ReplaceMemberModal
              role={role}
              post={row.name ? row.name.post_name : ''}
              weapon_req={row.weapons}
              cert_req={row.cert}
              post_id={row.post_id}
              fetchSchedule={row.fetchSchedule}
              currentDate={row.currentDate}
              shift={row.shift}
              row={row}
            />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default EditSchedule
