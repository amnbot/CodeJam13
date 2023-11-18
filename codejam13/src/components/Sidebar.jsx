import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import eventEmitter from '../services/EventEmitter';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react';

export default function SwipeableTemporaryDrawer() {

  const pages = ['Dashboard', 'My Exams', 'Create Exams'];
  const links = ['/', '/exercise', '/create-exam'];

  const secondPages = ['My Groups'];
  const secondLinks = ['/groups'];

  var isOpen = false;

  const [state, setState] = React.useState({
    'left': false
  });

  useEffect(() => {
    const handleEvent = () => {
      console.log(isOpen);
      setState({ ...state, ['left']: !isOpen });
      isOpen = !isOpen;
    };

    eventEmitter.on('sideBarClicked', handleEvent);

    return () => {
      // Clean up the event listener when the component unmounts
      eventEmitter.off('sideBarClicked', handleEvent);
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("yup");
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <><Box sx={{display : 'flex', height : '40px', marginTop : '20px'}}>
       <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
      <Button onClick={toggleDrawer(anchor, false)}>Close</Button>
    </Box><><Box
      sx={{ width: '300px' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pages.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ fontSize : '20px' }}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))};
      </List>
    </Box>
        <Box
          sx={{ width: '300px' }}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {pages.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {secondPages.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box></></>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <SwipeableDrawer 
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
            variant={"persistent"}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
