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

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SwipeableTemporaryDrawer() {
  const pages = ["Dashboard", "My Exams", "Create Exams"];
  const links = ["/", "/my-exams", "/create-exam"];

  const secondPages = ["My Groups", "Communuty"];
  const secondLinks = ["/my-groups", "/community"];

  var isOpen = false;

  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(() => {
    const handleEvent = () => {
      console.log(isOpen);
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

  const handleNavigation = (page) => {
    navigate(links[pages.indexOf(page)]);
  };

  const handleNavigationGroup = (page) => {
    navigate(secondLinks[secondPages.indexOf(page)]);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("yup");
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{
          display: "flex",
          height: "40px",
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
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "30px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
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
      <Box
        sx={{ width: "300px", marginTop: "20px" }}
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {pages.map((text, index) => (
            <ListItem key={text}>
              <ListItemButton sx={{ justifyContent: "center" }}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => handleNavigation(text)}
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
