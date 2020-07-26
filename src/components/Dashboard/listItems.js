import React from "react";
import { List, Collapse } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import DevicesIcon from "@material-ui/icons/Devices";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import ListItemLink from "./ListItemLink.js";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
  },
}));

const MainListItemsComponent = (props) => {
  const classes = useStyles();

  const [menuState, setMenuState] = React.useState({
    mangageDevicesOpen: false,
  });

  const handleClickOpen = (menuName) => {
    setMenuState({
      ...menuState,
      [menuName]: !menuState[menuName],
    });
  };

  return (
    <div>
      <ListItemLink
        to="/dashboard"
        primary="Dashboard"
        icon={<DashboardIcon />}
      />
      <ListItem button onClick={() => handleClickOpen("manageDevicesOpen")}>
        <ListItemIcon>
          <DevicesOtherIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Devices" />
        {menuState.manageDevicesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageDevicesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/addDevice"
            primary="Add Device"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/devices"
            primary="All Devices"
            icon={<DevicesIcon />}
          />
        </List>
      </Collapse>
    </div>
  );
};

export const MainListItems = connect(null, {})(MainListItemsComponent);

export const SecondaryListItems = () => {
  const firebase = useFirebase();
  const handleLogout = () => {
    firebase.logout();
  };
  return (
    <div>
      <ListSubheader inset>My Account</ListSubheader>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};
