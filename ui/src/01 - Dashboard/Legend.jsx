import React, { useState } from "react";
import { Typography, Box, List, ListItem, Divider } from "@mui/material/";

export const Legend = () => {
  const [legend, setLegend] = useState([]);

  // const getLegend = () => {}

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
      }}
    >
      <Typography variant="h6">Current Schedule</Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography>Days 0600-1400</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Typography>Swings 1400-2200</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Typography>Nights 2200-0600</Typography>
        </ListItem>
      </List>
    </Box>
  );
};
