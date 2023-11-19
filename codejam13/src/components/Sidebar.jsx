import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import eventEmitter from "../services/EventEmitter";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function SwipeableTemporaryDrawer() {
  const pages = ["Dashboard", "My Exams", "Create Exams"];
  const links = ["/", "/my-exams", "/create-exam"];
  const icons = [<DashboardIcon />, <SchoolIcon />, <LibraryBooksIcon />]

  const secondPages = ["My Groups", "Communuty"];
  const secondLinks = ["/my-groups", "/community"];
  const secondIcons = [<GroupsIcon />, <PublicIcon />]

  var isOpen = false;

  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(() => {
    const handleEvent = () => {
      setState({ ...state, ["left"]: !isOpen });
      isOpen = !isOpen;
    };

    eventEmitter.on("sideBarClicked", handleEvent);

    return () => {
      // Clean up the event listener when the component unmounts
      eventEmitter.off("sideBarClicked", handleEvent);
    };
  }, []);

  const navigate = useNavigate();

  const closeSideBar = () => {
    setState({ ...state, ["left"]: false });
    isOpen = false;
  };

  const handleNavigation = (page) => {
    closeSideBar();
    const link = links[pages.indexOf(page)];
    navigate(link);
  };

  const handleNavigationGroup = (page) => {
    closeSideBar();
    const link = secondLinks[secondPages.indexOf(page)];
    navigate(link);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: "30px",
          padding: "7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "75%",
            justifyContent: "center",
            paddingRight: "10px",
          }}
        >
          <SchoolIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "30px",
            }}
          />
          <div className="mx-4 tracking-tight font-bold italic text-3xl">
              Quizzler
            </div>
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(anchor, false)}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "300px", marginTop: "20px" }}>
        <List>
          {pages.map((text, index) => (
            <ListItem key={text}>
              <ListItemButton sx={{ justifyContent: "center" }}>
                <ListItemIcon>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "50px" }}
                  primary={text}
                  onClick={() => handleNavigation(text)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondPages.map((text, index) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  {secondIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => handleNavigationGroup(text)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          variant={"persistent"}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
