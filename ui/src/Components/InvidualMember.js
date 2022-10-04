import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "../Components/MemberContext";
import '../styles/Card.css';
import {Box, LinearProgress, Avatar, Button, Typography, Modal, TextField, InputLabel, MenuItem, Select} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import {useParams} from "react-router"
//import {useNavigate} from "react-router-dom";

const InvdivdualMember= () => {
    const {member, API, setMember} = useContext(MemberContext);
    const {memberId} = useParams();
    console.log(member);
    console.log(typeof(member));
    console.log("params: ", memberId)

    useEffect(() => {
        fetch(`${API}/users/${memberId}`)
        .then((res) => res.json())
        .then((data) => setMember(data[0]))
    }, []);

    if (member === undefined) {
        return (      
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ) 

    } else {

    return ( 
        <>
            <div><a href="/sfmembers" style={{textDecoration: "none"}}>People&nbsp;</a>{'>'} {member.first_name} {member.last_name}</div>
            <div><Avatar/><h3>{member.first_name} {member.last_name}</h3></div>
            
            <Box sx={{m: 20, height: 400, width: 400, boxShadow: 3}}>
                <p>User Profile</p>
                {/* <Button>Edit Profile</Button>*/}
                <EditMemberModal memberObject={member} />
                <p>Name: {member.first_name} {member.last_name}</p>
                <p>Rank: {member.rank}</p>
                <p>Weapons Qualifications: </p>
                <p>User Type: {member.admin === true ? 'Admin' : 'User'}</p>
                <p>Certifications: {member.cert_id}</p>
                <p>Arm status: {member.weapon_arming === true ? 'Arm 🟢' : 'Do Not Arm🔴'}</p>
                {/* <p>Admin: {member.admin === true ? '🟢' : '🔴'}</p> */}
                <p>Notes: </p>
                {/* {console.log(member)} */}
            </Box>
        </>
        )}
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

const EditMemberModal = props => {
    const {API, member} = useContext(MemberContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState();
    const [rank, setRank] = useState("");
    const [cert, setCert] = useState(0);
    const [weapon, setWeapon] = useState(0);
    const [status, setStatus] = useState();
    const [notes, setNotes] = useState("");

    let memberObject = props;
    memberObject = memberObject.memberObject
    console.log("member object, ", memberObject)

    //const navigate = useNavigate();

    //need to modify this so old data is persisted
    const handleEdit = () => {
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            admin: userType,
            rank: rank,
            cert_id: cert,
            weapon_arming: status,
            notes: notes
        }
        console.log("updated user, ", updatedUser)
        
        fetch(`${API}/updateuser/${member.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        // .then(window.location.reload(false))
        // .then(navigate(`/sfmembers/${member.id}`))
        .then((res) => res.json())
        .catch(err => {
            console.log('Error: ', err);
        });
    };

    return (

        <>
            <Button onClick={handleOpen} variant="outlined" color="secondary">Edit Profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Button onClick={handleClose} sx={{textAlign: "right"}}>Close</Button> */}
                    <CloseIcon onClick={handleClose} sx={{cursor: "pointer", right: "50%", display: "flex", justifyContent: "right"}} />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center"}}>
                    Profile
                    </Typography>
                    <Typography id="modal-modal-description" variant="h4" sx={{ mt: 1 , textAlign: "center", fontWeight: "bold"}}>
                        Edit Profile
                    </Typography>
                    
                    <TextField 
                    id="outlined-basic" 
                    label="First Name"
                    vaue={firstName}
                    // defaultVaue='test'
                    // defaultVaue={memberObject.first_name}
                    variant="outlined" 
                    onChange={(e) => setFirstName(e.target.value)}/>

                    <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    vaue={lastName}
                    variant="outlined" 
                    onChange={(e) => setLastName(e.target.value)}/>

                    {/* <FormControl > */}
                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                        <Select
                        htmlFor='weapon_arming'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="User Type"
                        onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value={true}>Admin</MenuItem>
                            <MenuItem value={false}>User</MenuItem>
                        </Select>

                        <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                        <Select
                        htmlFor="rank"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rank}
                        label="Rank"
                        onChange={(e) => setRank(e.target.value)}
                        >
                            <MenuItem value={null}></MenuItem>
                            <MenuItem value={'e1'}>AB</MenuItem>
                            <MenuItem value={'e2'}>AMN</MenuItem>
                            <MenuItem value={'e3'}>A1C</MenuItem>
                            <MenuItem value={'e4'}>SrA</MenuItem>
                            <MenuItem value={'e5'}>SSgt</MenuItem>
                            <MenuItem value={'e6'}>TSgt</MenuItem>
                            <MenuItem value={'e7'}>MSgt</MenuItem>
                            <MenuItem value={'e8'}>SMSgt</MenuItem>
                            <MenuItem value={'e9'}>CMSgt</MenuItem>
                            <MenuItem value={'o1'}>1LT</MenuItem>
                            <MenuItem value={'o2'}>2LT</MenuItem>
                            <MenuItem value={'o3'}>Capt</MenuItem>
                            <MenuItem value={'o4'}>Major</MenuItem>
                            <MenuItem value={'o5'}>Lt. Col</MenuItem>
                            <MenuItem value={'o6'}>Colonel</MenuItem>
                            
                        </Select>

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

                        <InputLabel id="demo-simple-select-label">Arm Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Arm"
                        onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={true}>Arm 🟢</MenuItem>
                            <MenuItem value={false}>Do Not Arm🔴</MenuItem>
                        </Select>
                    {/* </FormControl> */}

                    <TextField 
                    id="outlined-textarea" 
                    label="Notes" 
                    variant="outlined" 
                    fullWidth multiline
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button onClick={() => handleEdit()} color="secondary" variant="contained">Save Profile</Button>
                </Box>
            </Modal>
        </>
    );
}

export default InvdivdualMember;