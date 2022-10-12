import React, {useState} from 'react';
import {
  Stack,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal, 
  FormControl} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const DataSources = () => {
  return (
    <Box>
      <Typography variant='h3' ml={10} pb={4} sx={{ fontWeight: 'bold' }}>
        Data Sources
      </Typography>
      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Arming Status
          </Typography>
          <p>
            Upload your .csv file indicating your recent Do Not Arm airment
            status.
          </p>
        </CardContent>
        <CardActions>
          {/* <Button color='secondary' variant='outlined' sx={buttonSX}>
            UPLOAD .CSV
          </Button> */}
          <Upload/>
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Certifications
          </Typography>
          <p>
            Upload your .csv file including airman name and corresponding
            certifications.
          </p>
        </CardContent>
        <CardActions>
          {/* <Button color='secondary' variant='outlined' sx={buttonSX}>
            UPLOAD .CSV
          </Button> */}
          <Upload/>
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 3, mx: 10, my: 5, borderRadius: 3, width: 1000 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Weapon Qualifications
          </Typography>
          <p>
            Upload your .csv file including airman name and current weapons
            certifications.
          </p>
        </CardContent>
        <CardActions>
          {/* <Button color='secondary' variant='outlined' sx={buttonSX}>
            UPLOAD .CSV
          </Button> */}
          <Upload/>
        </CardActions>
      </Card>
    </Box>
  );
};



const Upload = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [flag, setFlag] = useState(false);

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 550,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
  };

  const buttonSX = {
    borderRadius: "30px", 
    marginRight: "10px",
  }

  const handleClick = () => {
    setFlag(!flag)
  }

  return (
      <>
        <Button onClick={handleOpen} variant="outlined" color="secondary" sx={buttonSX}>
          UPLOAD .CSV
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{display: "flex", justifyContent: "right"}}>
              <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
            </Box>
            
            <Typography id="modal-modal-description" variant="h6" sx={{ mt: 1 , textAlign: "center"}}>
              ARMING STATUS
            </Typography>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{textAlign: "center", fontWeight: "bold"}}>
              Add Data Sources
            </Typography>

            <Stack direction="column" mt={3}  sx={{display: "flex", justifyContent: "center"}}>
              <p>To add a data source, download this template, copy and paste your data into the corresponding tabs, save, 
                export as a .csv, and re-upload into this container
              </p>
            </Stack>

            <Stack mt={3}  sx={{display: "flex", justifyContent: "center", border: "1px dashed", p: 5}}>
              <p style={{textAlign: "center"}}>Drag file here or click to upload.</p>
              <Button variant="text" color="secondary" onClick={() => handleClick()}>UPLOAD</Button>
            </Stack>
            
            <Box mt={3} sx={{display: "flex", justifyContent: "end"}}>
              {flag === false ?  <Button variant="contained" color={flag ? "secondary" : "primary"} sx={{borderRadius: "30px"}} disabled>ADD DATA</Button>
              : <Button variant="contained" color={flag ? "secondary" : "primary"} sx={{borderRadius: "30px"}}>ADD DATA</Button>}
            </Box>
          </Box>
        </Modal>
      </>
  );
}