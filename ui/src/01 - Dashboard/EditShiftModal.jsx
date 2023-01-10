import React, { useContext, useState } from "react";
import { MemberContext } from "../MemberContext";
import "../styles/MembersDetail.css";
import {
  Box,
  Button,
  Divider,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  Stack,
  FormControl,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 700,
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

export const EditShiftModal = (props) => {
  const { API, setTriggerFetch, allWeapons } = useContext(MemberContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postName, setPostName] = useState("");
  const [weapon, setWeapon] = useState([]);
  const [weaponIdArray, setWeaponIdArray] = useState([]);
  const [manReq, setManReq] = useState("");
  const [cert, setCert] = useState("");
  const [schedDate, setSchedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const { isDay } = props;
  const theme = useTheme();

  //need to modify this so old data is persisted
  const handleAdd = () => {
    const shift = isDay ? "days" : "mids";
    const newPost = {
      name: postName,
      man_req: manReq,
      cert_id: cert,
      weapon_req: weaponIdArray,
      shift: shift,
    };
    console.log("newPost ", newPost, "cert NaN ", parseInt(cert));

    fetch(`${API}/position/`, {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      // .then(window.location.reload(false))
      .then((res) => res.json())
      // .then(window.location.reload(false))
      .then(() => {
        handleClose();
        setTriggerFetch((curr) => !curr);
        setPostName(null);
        setManReq(null);
        setCert(null);
        setWeapon([]);
        // setToggleAlert(true);
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
      <Tooltip title="Edit Shift Cycle">
        <Divider>
          <Button
            onClick={handleOpen}
            // color={"secondary"}
            // variant="contained"
            //   sx={{ borderRadius: "50px", width: 150 }}
          >
            SHIFT
          </Button>
        </Divider>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            SCHEDULE
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="h4"
            sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Add Template
          </Typography>

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
                id="outlined-basic"
                label="Template Name"
                value={postName}
                variant="outlined"
                onChange={(e) => setPostName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                id="outlined-basic"
                label="Time"
                value={manReq}
                variant="outlined"
                onChange={(e) => setManReq(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            pt={2}
            sx={{
              display: "flex",
              //justifyContent: 'center',
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "40ch" }}>
              <InputLabel id="demo-simple-select-label">Flight</InputLabel>
              <Select
                htmlFor="cert_id"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cert}
                label="Certifications"
                onChange={(e) => setCert(e.target.value)}
              >
                <MenuItem value={1}>Entry Controller</MenuItem>
                <MenuItem value={2}>Patrol</MenuItem>
                <MenuItem value={3}>Desk Sergeant</MenuItem>
                <MenuItem value={4}>Flight Sergreant</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "40ch" }}>
              <InputLabel id="demo-multiple-checkbox-label">Posts</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={weapon.map((weap) => weap.weapon)}
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
                      // checked={weapon.some(
                      //   wep => wep.weapon_id === weaponObject.id
                      // )}

                      // make seperate component ?
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
              //justifyContent: 'center',
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={startDate.toISOString().split("T")[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "white"
                      : theme.palette.grey[900],
                  cursor: "pointer",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setStartDate(new Date());
                    e.target.value = new Date().toISOString().split("T")[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setStartDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ width: "40ch" }}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={startDate.toISOString().split("T")[0]}
                sx={{
                  width: 220,
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "white"
                      : theme.palette.grey[900],
                  cursor: "pointer",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setStartDate(new Date());
                    e.target.value = new Date().toISOString().split("T")[0];
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  } else {
                    setStartDate(new Date(`${e.target.value}T00:00:00`));
                    setSchedDate(new Date(`${e.target.value}T00:00:00`));
                  }
                }}
              />
            </FormControl>
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
              Add Template
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
