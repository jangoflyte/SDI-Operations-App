import React, { useContext } from "react";
import { MemberContext } from "../MemberContext";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import CloudIcon from "@mui/icons-material/Cloud";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/MembersDetail.css";
import logo from "../passlogo.svg";
//import logo from '../logo/passlogo.svg';
import fullLogo from "../logo/fullLogo.svg";
import Grid from "@mui/material/Unstable_Grid2";
import { NotificationModal } from "./Notification";
import { AvatarMenu } from "./AvatarMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const { userAccount, darkMode, setDarkMode, setCookie, userDomain } =
    useContext(MemberContext);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    setFlag(!flag);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setFlag(!flag);
  };

  //   handleClickOutside(event) {
  //     if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
  //       alert("You clicked outside of me!");
  //     }
  //   }

  //   render() {
  //     return <div ref={this.wrapperRef}>{this.props.children}</div>;
  //   }
  // }

  const handleNavigate = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} onClose={handleDrawerClose}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "beginning",
            }}
          >
            {flag === true ? null : (
              <Button onClick={() => navigate("/")}>
                <img src={fullLogo} alt="logo" style={{ height: 50 }} />
              </Button>
            )}
          </Box>
          <Grid
            xs
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mr={2}
          >
            {userAccount === null ? (
              <Typography variant="h5" component="h6">
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </Typography>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    setDarkMode((prevMode) =>
                      prevMode === "light" ? "dark" : "light"
                    );
                    setCookie(
                      "color_mode",
                      darkMode === "light" ? "dark" : "light",
                      {
                        domain: userDomain,
                        path: "/",
                        sameSite: "None",
                        secure: "true",
                      }
                    );
                  }}
                >
                  {darkMode === "light" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
                <NotificationModal />
                <AvatarMenu />
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#212121",
            hover: "#8B8989	",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {flag === false ? null : (
            <Box>
              <Button onClick={() => handleNavigate("/")}>
                <img src={logo} alt="logo" style={{ width: "100%" }} />
              </Button>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <Typography
          sx={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          {userAccount !== null && userAccount.admin
            ? "Admin View"
            : "User View"}
        </Typography>
        <Divider light />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dash Board" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/calendar")}>
              <ListItemIcon>
                <CalendarMonthIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Calendar" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/weather")}>
              <ListItemIcon>
                <CloudIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Weather" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("/sfmembers")}>
              <ListItemIcon>
                <GroupsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="People" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              disabled={!(userAccount !== null && userAccount.admin)}
              onClick={() => handleNavigate("/data")}
            >
              <ListItemIcon>
                <SignalWifiStatusbar4BarIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Data Sources" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              disabled={!(userAccount !== null && userAccount.admin)}
              onClick={() => handleNavigate("/settings")}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Post Settings" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider light />
      </Drawer>
      <Main open={open} onClose={handleDrawerClose}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}