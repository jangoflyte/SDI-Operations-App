import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "../MemberContext";
import { Box, Typography, Divider, Stack, Icon } from "@mui/material/";
import CircleIcon from "@mui/icons-material/Circle";

export const Roster = (props) => {
  const { rows, positions } = props;
  const { data } = useContext(MemberContext);
  const [roster, setRoster] = useState([]);
  const [scheduledUser, setScheduledUser] = useState([]);
  const [unavailable, setUnavailable] = useState([]);

  useEffect(() => {
    // grabs user id for scheduled users
    let posted = [];
    rows.forEach((row) => {
      // console.log(row);
      const position = row.name;
      row.users.forEach((user) => {
        if (user.noUser) return;
        // console.log(user);

        posted.push({ user: user.user_info[0].id, position: position });
      });
      // console.log('posted', posted);
    });
    setScheduledUser(posted);

    // filters out roster for current flight from user data
    if (positions.length > 0) {
      let unavailablePersonnel = [];
      let currentPersonnel = data.filter((user) => {
        if (user.flight === null) return false;
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

  console.log('not flat roster', roster);
  const flightName =
    roster.length > 0
      ? roster[0].flight.flight.charAt(0).toUpperCase() +
        roster[0].flight.flight.slice(1)
      : null;
  console.log(flightName);

  const shiftTime =
    rows.length > 0
      ? rows[0].shift === "Days"
        ? "0700-1400"
        : "1500-0600"
      : null;
  // console.log(shiftTime);

  return (
    <Box sx={{ borderRadius: "5px", width: "100%" }} p={2}>
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
        sx={{ display: "flex" }}
      >
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "left",
            width: "5%",
          }}
        ></Box>
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: "left",
            width: "20%",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
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

      <RosterPeople users={roster} scheduledUser={scheduledUser} />
      <Typography variant="caption">Currently Unavailable homies</Typography>
      <RosterPeople users={unavailable} scheduledUser={scheduledUser} />
    </Box>
  );
};

const RosterPeople = (props) => {
  const { users, scheduledUser } = props;
  return (
    <Box>
      {users.map((user, index) => (
        <Stack
          key={index}
          component="span"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
          sx={{ display: "flex" }}
        >
          {/* {console.log(user)} */}
          <Box
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
                    : { color: "red" }
                }
              />
            </Icon>
          </Box>
          <Box
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "left",
              width: "20%",
            }}
          >
            <Typography>
              {user.last_name}, {user.first_name}
            </Typography>
          </Box>

          <Box
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <Typography>{user.rank.toUpperCase()}</Typography>
          </Box>

          <Box
            alignItems="right"
            sx={{
              display: "flex",
              justifyContent: "right",
              width: "30%",
            }}
          >
            <Typography>
              {scheduledUser.filter((e) => e.user === user.id).length > 0
                ? scheduledUser.filter((e) => e.user === user.id)[0].position
                : user.status === null ||
                  user.status.toLowerCase() === "other/unavailable"
                ? "U/A"
                : user.status}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
