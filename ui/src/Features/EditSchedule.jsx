import React, { useContext, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
import { Button, Modal, Box, Paper, Typography } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';


const EditSchedule = props => {
  const { role, post, weapon_req, cert_req, post_id, fetchSchedule, delSchedule, currentDate, userRow } = props
  const { API, data } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState({});

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
    p: 4,
  };

  console.log(userRow);
  let splitDate = currentDate.split('-')
  let date = new Date(splitDate[0], splitDate[1], splitDate[2])

  return (
    <>
      <Button 
        onClick={() => {
        // console.log(role)
        // console.log(post)
        setOpen(true)
        }} 
        variant="outlined" color='info' size="small" sx={{ mr: 5, px: 0, minWidth: 22}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
      </Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{overflow:'scroll'}}
      >
        <Box sx={style}>
            <Box sx={{display: "flex", justifyContent: "right"}}>
              <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
            </Box>
            <Typography sx={{textAlign: 'center', fontSize: '2.2rem' }}>Edit Position</Typography>
            <Typography sx={{textAlign: 'center', fontSize: '1.2rem' }}>{`Do you want to remove ${userRow.user_info[0].rank} ${userRow.user_info[0].first_name} ${userRow.user_info[0].last_name}`}</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Box sx={{border: '1px solid grey', borderRadius: 3, width: '75%', p: 3 }}>
                {date.toDateString()}<br/>
                Post: {post}<br/>
                {role === 0 && `Shift: Lead`}
                {role === 1 && `Shift: Alpha`}
                {role === 2 && `Shift: Bravo`}
                {role === 3 && `Shift: Charle`}
              </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', gap: 4}}>
              <Button onClick={() => {
                  console.log('clicked save', userRow.id);
                  handleClose();
                  delSchedule(userRow.id)
                }} 
                color="secondary"
                variant="contained" 
                sx={{ borderRadius: "30px", mt: 5 }}
                >
                  Remove User
                </Button>
                <Button onClick={() => {
                  console.log('clicked save');
                  handleClose();
                }} 
                color="error"
                variant="text" 
                sx={{ mt: 5 }}
                >
                  cancel
              </Button>
            </Box>
        </Box>
      </Modal>
    </>
      
  )
  
}

export default EditSchedule