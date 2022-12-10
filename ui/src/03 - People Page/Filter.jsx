import React, { useState, useContext } from "react";
import { MemberContext } from "../MemberContext";
import {
  Box,
  Typography,
  Modal,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const Filter = ({ setFilter, filter }) => {
  const { allWeapons, allFlights } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    overflowY: "scroll",
  };

  const handleCheckCert = (box) => {
    const id = Number(box.parentNode.parentNode.id);
    console.log(box.checked, id);
    if (box.checked) {
      setFilter((prev) => {
        let newArr = prev.certification;
        newArr.push(id);
        return { ...prev, certification: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.certification.filter((cert) => cert !== id);
        return { ...prev, certification: newArr };
      });
    }
  };

  const handleCheckQual = (box) => {
    const id = box.parentNode.parentNode.id;
    console.log(box.checked, id);
    if (box.checked) {
      setFilter((prev) => {
        let newArr = prev.weapon;
        newArr.push(id);
        return { ...prev, weapon: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.weapon.filter((cert) => cert !== id);
        return { ...prev, weapon: newArr };
      });
    }
  };

  const handleCheckFlight = (box) => {
    // console.log('Box for check flight', box);

    const id = box.parentNode.parentNode.id;
    const name = box.name;
    console.log(box.checked, id);
    console.log("This is filter ", filter);
    if (box.checked) {
      setFilter((prev) => {
        let newArr = prev.flight;
        newArr.push(name);
        console.log("new arr ", newArr);
        return { ...prev, flight: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.flight.filter((flight) => flight !== name);
        return { ...prev, flight: newArr };
      });
    }
  };

  const handleCheckArming = (box) => {
    const id = box.parentNode.parentNode.id;
    console.log(box.checked, id);
    if (box.checked) {
      setFilter((prev) => {
        let newArr = prev.arming_status;
        newArr.push(id);
        return { ...prev, arming_status: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.arming_status.filter((cert) => cert !== id);
        return { ...prev, arming_status: newArr };
      });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        sx={{ borderRadius: "30px" }}
      >
        Filter
      </Button>
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

          <Box
            mt={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
            <Button
              onClick={() => {
                setFilter({
                  ...filter,
                  certification: [],
                  weapon: [],
                  arming_status: [],
                  flight: [],
                });
                handleClose();
              }}
              variant="outlined"
              color="secondary"
              sx={{ cursor: "pointer", borderRadius: "30px", border: 2 }}
            >
              Clear Filter
            </Button>
          </Box>

          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
              By Certification
            </FormLabel>
            <FormGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ecp"
                        checked={filter.certification.includes(1)}
                      />
                    }
                    label="Entry Controller"
                    id="1"
                    onClick={(e) => {
                      handleCheckCert(e.target);
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="patrol"
                        checked={filter.certification.includes(2)}
                      />
                    }
                    label="Patrol"
                    id="2"
                    onClick={(e) => {
                      handleCheckCert(e.target);
                    }}
                  />
                </Box>
                <Box sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="desk"
                        checked={filter.certification.includes(3)}
                      />
                    }
                    label="Desk Sergeant"
                    id="3"
                    onClick={(e) => {
                      handleCheckCert(e.target);
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="flight chief"
                        checked={filter.certification.includes(4)}
                      />
                    }
                    label="Flight Chief"
                    id="4"
                    onClick={(e) => {
                      handleCheckCert(e.target);
                    }}
                  />
                </Box>
              </Box>
            </FormGroup>

            <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
              By Weapon Qualification
            </FormLabel>
            <FormGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {allWeapons.map((wep, index) => (
                  <Box key={index} sx={{ width: "50%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={wep.weapon}
                          checked={filter.weapon.includes(wep.weapon)}
                        />
                      }
                      label={wep.weapon.toUpperCase()}
                      id={wep.weapon}
                      onClick={(e) => {
                        handleCheckQual(e.target);
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </FormGroup>

            <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
              Arming Status
            </FormLabel>

            <FormGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="arm"
                        checked={filter.arming_status.includes("true")}
                      />
                    }
                    label="Can Arm"
                    id="true"
                    onClick={(e) => {
                      handleCheckArming(e.target);
                    }}
                  />
                </Box>

                <Box sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="no arm"
                        checked={filter.arming_status.includes("false")}
                      />
                    }
                    label="Cannot Arm"
                    id="false"
                    onClick={(e) => {
                      handleCheckArming(e.target);
                    }}
                  />
                </Box>
              </Box>
            </FormGroup>

            <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
              By Flight
            </FormLabel>
            <FormGroup>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {allFlights.map((flight, index) => (
                  <Box key={index} sx={{ width: "50%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={flight.flight}
                          checked={filter.flight.includes(flight.flight)}
                        />
                      }
                      label={flight.flight.toUpperCase()}
                      id={flight.flight}
                      onClick={(e) => {
                        handleCheckFlight(e.target);
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </FormGroup>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};
