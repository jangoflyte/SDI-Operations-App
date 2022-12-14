import React, { useContext, useState, useEffect } from "react";
import { MemberContext } from "../MemberContext";
import { Box, Typography, Divider, Stack, Icon } from "@mui/material/";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

export const Roster = (props) => {
  const { rows, positions } = props;
  const { data } = useContext(MemberContext);
  const [roster, setRoster] = useState([]);
  const [scheduledUser, setScheduledUser] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [flight, setFlight] = useState([]);

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
      let flightArray = [];
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
            flightArray.push(unavailablePersonnel);

            return false;
          }
          flightArray.push(currentPersonnel);
          return true;
        }
      });
      setRoster(currentPersonnel);
      setUnavailable(unavailablePersonnel);
      setFlight(flightArray);
    }
  }, [rows, positions]);

  const flightName =
    roster.length > 0
      ? roster[0].flight.flight.charAt(0).toUpperCase() +
        roster[0].flight.flight.slice(1)
      : null;

  // const flightName =
  //   flight.length > 0
  //     ? flight[0].flight.flight.charAt(0).toUpperCase() +
  //       flight[0].flight.flight.slice(1)
  //     : null;

  const shiftTime =
    rows.length > 0
      ? rows[0].shift === "Days"
        ? "0700-1400"
        : "1500-0600"
      : null;

  console.log(flight.length);

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
      <Divider sx={{ mb: 2 }} />
      <Typography variant="caption" mt={1}>
        Currently Unavailable homies
      </Typography>
      <RosterPeople users={unavailable} scheduledUser={scheduledUser} />
    </Box>
  );
};

const RosterPeople = (props) => {
  const { users, scheduledUser } = props;
  const navigate = useNavigate();

  //console.log(users);

  const navigateToMember = (member) => {
    console.log("current member", member);
    navigate(`/sfmembers/${member}`);
  };

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
                    : user.status === "Available"
                    ? { color: "orange" }
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
              <Typography sx={{ color: "#454040" }}>
                {user.last_name.charAt(0).toUpperCase() +
                  user.last_name.slice(1)}
                ,{" "}
                {user.first_name.charAt(0).toUpperCase() +
                  user.first_name.slice(1)}
              </Typography>
            )}
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
              <Typography>{user.rank.toUpperCase()}</Typography>
            ) : (
              <Typography sx={{ color: "#454040" }}>
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
              <Typography>
                {scheduledUser.filter((e) => e.user === user.id).length > 0
                  ? scheduledUser.filter((e) => e.user === user.id)[0].position
                  : user.status === null ||
                    user.status.toLowerCase() === "other/unavailable"
                  ? "U/A"
                  : user.status}
              </Typography>
            ) : (
              <Typography sx={{ color: "#454040" }}>
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
      ))}
    </Box>
  );
};
