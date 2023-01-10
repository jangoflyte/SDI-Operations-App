import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "../MemberContext";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Icon,
  Tooltip,
  ListItem,
  IconButton,
} from "@mui/material/";
import CircleIcon from "@mui/icons-material/Circle";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const Roster = (props) => {
  const { rows, positions, schedDate } = props;
  const { data } = useContext(MemberContext);
  const [roster, setRoster] = useState([]);
  const [scheduledUser, setScheduledUser] = useState([]);
  const [unavailable, setUnavailable] = useState([]);

  useEffect(() => {
    // grabs user id for scheduled users
    let posted = [];
    rows.forEach((row) => {
      const position = row.name;
      row.users.forEach((user) => {
        if (user.noUser) return;
        posted.push({ user: user.user_info[0].id, position: position });
      });
    });
    setScheduledUser(posted);

    // filters out roster for current flight from user data
    if (positions.length > 0) {
      let unavailablePersonnel = [];
      let currentPersonnel = data.filter((user) => {
        if (user.flight === null) {
          return false;
        }
        if (user.flight.id === positions[0].flight_assigned) {
          if (
            user.status === null ||
            user.status.toLowerCase() !== "available"
          ) {
            unavailablePersonnel.push(user);
            return false;
          }
          return true;
        }
      });
      setRoster(currentPersonnel);
      setUnavailable(unavailablePersonnel);
    }
  }, [rows, positions]);

  const flightName =
    roster.length > 0
      ? roster[0].flight.flight.charAt(0).toUpperCase() +
        roster[0].flight.flight.slice(1)
      : unavailable.length > 0
      ? unavailable[0].flight.flight.charAt(0).toUpperCase() +
        unavailable[0].flight.flight.slice(1)
      : null;

  const shiftTime =
    rows.length > 0
      ? rows[0].shift === "Days"
        ? "0700-1400"
        : "1500-0600"
      : null;

  const handleDownloadTable = () => {
    const pdf = new jsPDF();
    //pdf.text('Hello world!', 10, 10);
    var head = [["Post", "Position", "Member", "Weapon", "Cert"]];
    //pdf.autoTable({ html: '#table' });

    let tableBody = [];
    console.log("rows", rows);

    rows.forEach((row) => {
      let postUsers = row.users.map((user) => {
        if (user.user_info === undefined)
          return [row.name, "N/A", "No one posted", "N/A", "N/A"];
        let workingRow = [
          `${user.user_info[0].first_name} ${user.user_info[0].last_name}`,
        ];
        let wepResults = "";
        for (let wep of user.user_info[0].weapons) {
          if (wepResults.length > 0) {
            wepResults += `, ${wep.weapon}`;
          } else {
            wepResults += `${wep.weapon}`;
          }
        }
        workingRow.push(wepResults);
        let certResults = "";
        for (let cert of user.user_info[0].certs) {
          if (certResults.length > 0) {
            certResults += `, ${cert.cert}`;
          } else {
            certResults += `${cert.cert}`;
          }
        }
        workingRow.push(certResults);
        workingRow.unshift(user.role);
        workingRow.unshift(row.name);
        return workingRow;
      });
      for (let userRow of postUsers) {
        console.log(userRow);
        tableBody.push(userRow);
      }
    });

    console.log("body: ", tableBody);
    pdf.text(`Schedule for: ${schedDate.toDateString()}`, 10, 10);
    pdf.autoTable({ head: head, body: tableBody });
    pdf.save("schedule.pdf");
  };

  return (
    <Box sx={{ borderRadius: "5px", width: "120%", mb: 1 }} p={2}>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Print Today's Schedule">
          <IconButton onClick={() => handleDownloadTable()}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography sx={{ fontWeight: "bold" }} variant="h5">
        Personnel - {flightName}
        <br></br>[{shiftTime}]
      </Typography>
      <Divider />
      <Stack
        component="span"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pt={2}
        sx={{ display: "flex", width: "100%" }}
      >
        {/* <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "left",
            width: "5%",
          }}
        ></Box> */}
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "left",
            width: "20%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", ml: 5.6 }}>Name</Typography>
        </Box>

        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "20%",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Rank</Typography>
        </Box>

        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "30%",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
        </Box>
      </Stack>

      {roster.length === 0 ? (
        <Typography variant="caption" mt={1}>
          No Homies
        </Typography>
      ) : (
        <RosterPeople users={roster} scheduledUser={scheduledUser} />
      )}

      <Divider sx={{ mb: 2 }} />
      <Typography variant="caption" mt={1}>
        Currently Unavailable Homies
      </Typography>

      <RosterPeople users={unavailable} scheduledUser={scheduledUser} />
    </Box>
  );
};

const RosterPeople = (props) => {
  const { users, scheduledUser } = props;
  const navigate = useNavigate();
  const theme = useTheme();

  //console.log(users);

  const navigateToMember = (member) => {
    console.log("current member", member);
    navigate(`/sfmembers/${member}`);
  };

  return (
    <Box sx={{ width: "110%" }}>
      {users.map((user, index) => (
        // <Stack

        //   sx={{
        //     bgcolor: theme.palette.mode === "light" ? "inherit" : "#212121",
        //     gap: 2,
        //     m: 1,
        //     boxShadow: "1px 1px 2px #454545",
        //   }}
        // >
        <Stack
          key={index}
          component="span"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          sx={{ display: "flex", ml: -4 }}
        >
          {/* {console.log(user)} */}
          <ListItem
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "left",
              width: "5%",
            }}
          >
            <Icon>
              <CircleIcon
                sx={
                  // scheduledUser.includes(user.id)
                  scheduledUser.filter((e) => e.user === user.id).length > 0
                    ? { color: "#25CA12" }
                    : user.status === "Available"
                    ? { color: "orange" }
                    : { color: "red" }
                }
              />
            </Icon>
          </ListItem>
          <Box
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "left",
              width: "20%",
            }}
          >
            <Tooltip title="Go to Account">
              {user.status === "Available" ? (
                <Typography
                  sx={{ color: "#6D7AE5", cursor: "pointer" }}
                  onClick={() => navigateToMember(user.id)}
                >
                  {user.last_name.charAt(0).toUpperCase() +
                    user.last_name.slice(1)}
                  ,{" "}
                  {user.first_name.charAt(0).toUpperCase() +
                    user.first_name.slice(1)}
                </Typography>
              ) : (
                <Typography
                  sx={{ color: "#63666A", cursor: "pointer" }}
                  onClick={() => navigateToMember(user.id)}
                >
                  {user.last_name.charAt(0).toUpperCase() +
                    user.last_name.slice(1)}
                  ,{" "}
                  {user.first_name.charAt(0).toUpperCase() +
                    user.first_name.slice(1)}
                </Typography>
              )}
            </Tooltip>
          </Box>

          <Box
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "20%",
            }}
          >
            {user.status === "Available" ? (
              <Typography sx={{ mr: 7 }}>{user.rank.toUpperCase()}</Typography>
            ) : (
              <Typography sx={{ color: "#63666A", mr: 7 }}>
                {user.rank.toUpperCase()}
              </Typography>
            )}
          </Box>

          <Box
            alignItems="right"
            sx={{
              display: "flex",
              justifyContent: "right",
              width: "30%",
            }}
          >
            {user.status === "Available" ? (
              <Typography sx={{ mr: 4 }}>
                {scheduledUser.filter((e) => e.user === user.id).length > 0
                  ? scheduledUser.filter((e) => e.user === user.id)[0].position
                  : user.status === null ||
                    user.status.toLowerCase() === "other/unavailable"
                  ? "U/A"
                  : user.status}
              </Typography>
            ) : (
              <Typography sx={{ color: "#63666A", mr: 4 }}>
                {scheduledUser.filter((e) => e.user === user.id).length > 0
                  ? scheduledUser.filter((e) => e.user === user.id)[0].position
                  : user.status === null ||
                    user.status.toLowerCase() === "other/unavailable"
                  ? "U/A"
                  : user.status}
              </Typography>
            )}
          </Box>
        </Stack>
        // </Stack>
      ))}
    </Box>
  );
};
