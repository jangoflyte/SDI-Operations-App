import React, { useContext, useState, useMemo } from "react";
import { MemberContext } from "../MemberContext";
import "../styles/MembersDetail.css";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export const AddMemberModal = () => {
  const { API, setTriggerFetch, setToggleAlert, allWeapons, allFlights } =
    useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [weapon, setWeapon] = useState([]);
  const [weaponIdArray, setWeaponIdArray] = useState([]);
  const [failedAdd, setFailedAdd] = useState(false);
  const [addUser, setAddUser] = useState({
    first_name: "",
    last_name: "",
    admin: false,
    rank: "",
    cert_id: 1,
    weapon_arming: false,
    email: "",
    flight: "",
    notes: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //width: 750,
    height: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useMemo(() => {
    setWeaponIdArray([]);
    setWeapon([]);
    setAddUser({
      first_name: "",
      last_name: "",
      admin: false,
      rank: "",
      cert_id: 1,
      weapon_arming: false,
      email: "",
      flight: "",
      notes: "",
      password: "$2a$10$BVPeKlpiu1.Y/G0CUJ25/OrwUascSnq/cim2l.MmQvR//YmG4Egk6",
    });
  }, [open]);

  //need to modify this so old data is persisted
  const handleAdd = () => {
    let newUser = {
      ...addUser,
      weaponIdArray: weaponIdArray,
    };

    if (
      newUser.first_Name === "" ||
      newUser.last_Name === "" ||
      newUser.email === "" ||
      newUser.rank === ""
    ) {
      setFailedAdd(true);
      return;
    }
    console.log("weapon: ", weapon);
    console.log("weaponIDArray: ", weaponIdArray);
    console.log("flight: ", newUser.flight);
    console.log(newUser);
    fetch(`${API}/postusers/`, {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify([newUser]),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setTriggerFetch((curr) => !curr);
        setToggleAlert(true);
        setFailedAdd(false);
        handleClose();
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // const handleChange = event => {
  //   const {
  //     target: { checked },
  //   } = event;
  //   console.log(event);
  //   console.log(
  //     'value: checked ',
  //     event.target.parentNode.parentNode.id,
  //     checked
  //   );
  //   let wepId = parseInt(event.target.parentNode.parentNode.id);
  //   if (checked && !weaponIdArray.includes(wepId)) {
  //     setWeaponIdArray(curr => [...curr, wepId]);
  //     setWeapon(curr => [
  //       ...curr,
  //       allWeapons.filter(weapon => weapon.id === wepId)[0],
  //     ]);
  //   } else if (!checked) {
  //     setWeaponIdArray(curr => curr.filter(wep => wep !== wepId));
  //     setWeapon(curr => curr.filter(weapon => weapon.id !== wepId));
  //   }
  // };

  const handleWeaponBox = (wepId) => {
    if (!weaponIdArray.includes(wepId)) {
      setWeaponIdArray((curr) => [...curr, wepId]);
      setWeapon((curr) => [
        ...curr,
        allWeapons.filter((weapon) => weapon.id === wepId)[0],
      ]);
    } else if (weaponIdArray.includes(wepId)) {
      setWeaponIdArray((curr) => curr.filter((wep) => wep !== wepId));
      setWeapon((curr) => curr.filter((weapon) => weapon.id !== wepId));
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        size="large"
        sx={{ borderRadius: "30px" }}
      >
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} p={3}>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>

          <Typography
            id="modal-modal-description"
            variant="h4"
            sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Add User
          </Typography>
          {failedAdd && (
            <Typography
              variant="h4"
              color="error"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Missing Required Information
            </Typography>
          )}
          <Stack
            direction="row"
            mt={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                required={true}
                error={failedAdd}
                id="outlined-basic"
                label="First Name"
                value={addUser.first_name}
                variant="outlined"
                onChange={(e) =>
                  setAddUser({ ...addUser, first_name: e.target.value })
                }
              />
            </FormControl>
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                required={true}
                error={failedAdd}
                id="outlined-basic"
                label="Last Name"
                value={addUser.last_name}
                variant="outlined"
                onChange={(e) =>
                  setAddUser({ ...addUser, last_name: e.target.value })
                }
              />
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            pt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "25ch" }}>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                htmlFor="weapon_arming"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addUser.admin}
                label="User Type"
                onChange={(e) =>
                  setAddUser({ ...addUser, admin: e.target.value })
                }
              >
                <MenuItem value={true}>Admin</MenuItem>
                <MenuItem value={false}>User</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: "25ch" }}>
              <InputLabel id="demo-simple-select-label">Rank</InputLabel>
              <Select
                required={true}
                error={failedAdd}
                htmlFor="rank"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addUser.rank}
                label="Rank"
                onChange={(e) =>
                  setAddUser({ ...addUser, rank: e.target.value })
                }
              >
                <MenuItem value={"e1"}>AB</MenuItem>
                <MenuItem value={"e2"}>AMN</MenuItem>
                <MenuItem value={"e3"}>A1C</MenuItem>
                <MenuItem value={"e4"}>SrA</MenuItem>
                <MenuItem value={"e5"}>SSgt</MenuItem>
                <MenuItem value={"e6"}>TSgt</MenuItem>
                <MenuItem value={"e7"}>MSgt</MenuItem>
                <MenuItem value={"e8"}>SMSgt</MenuItem>
                <MenuItem value={"e9"}>CMSgt</MenuItem>
                <MenuItem value={"o1"}>2LT</MenuItem>
                <MenuItem value={"o2"}>1LT</MenuItem>
                <MenuItem value={"o3"}>Capt</MenuItem>
                <MenuItem value={"o4"}>Major</MenuItem>
                <MenuItem value={"o5"}>Lt. Col</MenuItem>
                <MenuItem value={"o6"}>Colonel</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: "25ch" }}>
              <InputLabel id="demo-simple-select-label">Arm Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addUser.weapon_arming}
                label="Arm"
                onChange={(e) =>
                  setAddUser({ ...addUser, weapon_arming: e.target.value })
                }
              >
                <MenuItem value={true}>Arm 🟢</MenuItem>
                <MenuItem value={false}>Do Not Arm🔴</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            pt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "40ch" }}>
              <InputLabel id="demo-simple-select-label">
                Certifications
              </InputLabel>
              <Select
                htmlFor="cert_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addUser.cert_id}
                label="Certifications"
                onChange={(e) =>
                  setAddUser({ ...addUser, cert_id: e.target.value })
                }
              >
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: "40ch" }}>
              <InputLabel id="demo-multiple-checkbox-label">Weapons</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={weapon.map((weap) => weap.weapon)}
                //defaultValue={'None Selected'}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {allWeapons.map((weaponObject, index) => (
                  <MenuItem
                    id={weaponObject.id}
                    key={index}
                    value={weaponObject.id}
                    onClick={() => handleWeaponBox(weaponObject.id)}
                  >
                    <Checkbox
                      // onChange={handleChange}
                      checked={weapon.some((wep) => wep.id === weaponObject.id)}
                    />
                    <ListItemText primary={weaponObject.weapon} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            pt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                required={true}
                error={failedAdd}
                id="outlined-basic"
                label="Email"
                value={addUser.email}
                variant="outlined"
                onChange={(e) =>
                  setAddUser({ ...addUser, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl sx={{ width: "40ch" }}>
              <InputLabel id="demo-simple-select-label">Flight</InputLabel>
              <Select
                htmlFor="cert_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addUser.flight}
                label="Flight"
                onChange={(e) =>
                  setAddUser({ ...addUser, flight: e.target.value })
                }
              >
                {allFlights.map((flightObject, index) => (
                  <MenuItem
                    id={flightObject.id}
                    key={index}
                    value={flightObject.id}
                  >
                    {flightObject.flight}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            pt={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              id="outlined-textarea"
              label="Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={addUser.notes}
              onChange={(e) =>
                setAddUser({ ...addUser, notes: e.target.value })
              }
            />
          </Stack>

          <Stack
            direction="row"
            mt={3}
            sx={{
              borderRadius: "30px",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button
              onClick={() => handleAdd()}
              color="secondary"
              variant="contained"
              sx={{ borderRadius: "30px" }}
            >
              Add User
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
