import React, { useContext, useMemo } from "react";
import { MemberContext } from "../MemberContext";
import {
  Stack,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import { Upload } from "./Upload";

export const DataSources = () => {
  const { toggleAlert, setToggleAlert } = useContext(MemberContext);

  useMemo(() => {
    setTimeout(() => {
      setToggleAlert(false);
    }, 3000);
  }, [toggleAlert]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "100vw",
          position: "absolute",
          left: 0,
          top: "10vh",
        }}
      >
        <Fade in={toggleAlert}>
          <Alert severity="success" spacing={2} mb={2}>
            Your data source, has successfully been added.
          </Alert>
        </Fade>
      </Stack>

      <Typography
        variant="h3"
        ml={10}
        pb={4}
        sx={{ fontWeight: "bold", width: 500 }}
      >
        Data Sources
      </Typography>
      <Card sx={{ boxShadow: 5, borderRadius: 3, width: 1000, p: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Add Member(s)
          </Typography>
          <Divider />
          <p>Upload your .csv file to update member list</p>
        </CardContent>
        <CardActions>
          <Upload uploadType={"POST"} />
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 5, mt: 5, borderRadius: 3, width: 1000, p: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Update Member(s) Certifications or Arming Status.
          </Typography>
          <Divider />
          <p>
            Upload your .csv file including airman name and corresponding
            certifications/qualifications/arming status.
          </p>
        </CardContent>
        <CardActions id="updateMember">
          <Upload uploadType={"PATCH"} />
        </CardActions>
      </Card>
    </Box>
  );
};
