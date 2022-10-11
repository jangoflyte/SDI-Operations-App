import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "../Components/MemberContext";
import '../styles/MembersDetail.css';
import BasicCard from '../Features/Card';
import AdminCard from "../Features/AdminCard";
import UserCard from "../Features/UserCard";
import {Box, LinearProgress, Button, Typography, Modal, TextField, InputLabel, MenuItem, Select, InputAdornment, Stack, Alert, FormControl} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

export const EditPost = props => {
    const post = props.post

    const {API, setTriggerFetch, setToggle} = useContext(MemberContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [postName, setPostName] = useState(post.name);
    const [weapon, setWeapon] = useState(post.weapon_req);
    const [manReq, setManReq] = useState(post.man_req);
    const [cert, setCert] = useState(post.cert_id);

  
    //need to modify this so old data is persisted
    const handleAdd = () => {
        const newPost = {
            name: postName,
            man_req: manReq,
            cert_id: cert,
        }
        console.log("newPost ", newPost, "cert NaN ", parseInt(cert))
        
        fetch(`${API}/position/${post.id}`, {
            method: 'PATCH',
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        // .then(window.location.reload(false))
        .then((res) => res.json())
        .then(() => {
            setTriggerFetch(curr => !curr)
            setToggle(true)
            handleClose()
          })
        .catch(err => {
            console.log('Error: ', err);
        });
    };
  
    return (
        <>
          <BorderColorIcon onClick={handleOpen} fontSize="large" color="secondary" cursor="pointer" sx={{mr:5}}/>
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
                    
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center"}}>
                      POSTS
                    </Typography>
                    <Typography id="modal-modal-description" variant="h4" sx={{ mt: 1 , textAlign: "center", fontWeight: "bold"}}>
                      Edit Post
                    </Typography>
                    
  
                    <Stack direction="row" mt={3}  sx={{display: "flex", justifyContent: "center", justifyContent:"space-between"}}>
                      <FormControl sx={{ width: '40ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        value={postName}
                        variant="outlined" 
                        onChange={(e) => setPostName(e.target.value)}/>
                      </FormControl>
                      <FormControl sx={{ width: '40ch' }}>
                        <TextField 
                        id="outlined-basic" 
                        label="Number of Positions" 
                        value={manReq}
                        variant="outlined" 
                        onChange={(e) => setManReq(e.target.value)}/>
                      </FormControl>
                    </Stack>
  
  
                    <Stack direction="row" pt={2} sx={{display: "flex", justifyContent: "center", justifyContent:"space-between"}}>
                      <FormControl sx={{ width: '40ch' }}>
                        <InputLabel id="demo-simple-select-label">Certifications</InputLabel>
                        <Select
                        htmlFor="cert_id"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cert}
                        label="Certifications"
                        onChange={(e) => setCert(e.target.value)}
                        >
                            <MenuItem value={null}></MenuItem>
                            <MenuItem value={1}>Entry Controller</MenuItem>
                            <MenuItem value={2}>Patrol</MenuItem>
                            <MenuItem value={3}>Desk Sergeant</MenuItem>
                            <MenuItem value={4}>Flight Sergreant</MenuItem>
                        </Select>
                      </FormControl>
  
                      <FormControl sx={{ width: '40ch' }}>
                        <InputLabel id="demo-simple-select-label">Weapon Qualifications</InputLabel>
                        <Select
  
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weapon}
                        label="Weapon"
                        onChange={(e) => setWeapon(e.target.value)}
                        >
                            <MenuItem value={null}></MenuItem>
                            <MenuItem value={1}>M4</MenuItem>
                            <MenuItem value={2}>M18</MenuItem>
                            <MenuItem value={3}>X26P Tazer</MenuItem>
                            <MenuItem value={4}>M249</MenuItem>
                            <MenuItem value={5}>M240</MenuItem>
                            <MenuItem value={6}>M107</MenuItem>
                            <MenuItem value={7}>M320</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
      
                  <Stack direction="row" mt={3} sx={{borderRadius: "30px", display: "flex", justifyContent: "right"}}>
                    <Button onClick={() => handleAdd()} color="secondary" variant="contained" sx={{borderRadius: "30px"}}>Save Changes</Button>
                  </Stack>
                 
                </Box>
            </Modal>
        </>
    );
  }