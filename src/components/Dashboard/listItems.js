import React from "react";
import { List, Collapse } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
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
    mangageCustomersOpen: false,
  });

  const handleClickOpen = (menuName) => {
    setMenuState({
      ...menuState,
      [menuName]: !menuState[menuName],
    });
  };

  return (
    <div>
      {/* <ListItemLink
        to="/dashboard"
        primary="Dashboard"
        icon={<DashboardIcon />}
      /> */}
      <ListItemLink
        to="/incomeStatement"
        primary="Income Statement"
        icon={<DashboardIcon />}
      />
      <ListItemLink
        to="/balanceSheet"
        primary="Balance Sheet"
        icon={<DashboardIcon />}
      />
      <ListItem button onClick={() => handleClickOpen("manageCustomersOpen")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Customers" />
        {menuState.manageCustomersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageCustomersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/addCustomer"
            primary="Add Customer"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/customers"
            primary="View Customers"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageEmployeesOpen")}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Employees" />
        {menuState.manageEmployeesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageEmployeesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/addEmployee"
            primary="Add Employee"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/employees"
            primary="View Employees"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageVendorsOpen")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Vendors" />
        {menuState.manageVendorsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageVendorsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/addVendor"
            primary="Add Vendor"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/vendors"
            primary="View Vendors"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("managePayrollOpen")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Payroll" />
        {menuState.managePayrollOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.managePayrollOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/payEmployee"
            primary="Pay Employee"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewPayrollEvents"
            primary="View Payroll Events"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageInvoicesOpen")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Invoices" />
        {menuState.manageInvoicesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageInvoicesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/createInvoice"
            primary="Create Invoice"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewInvoices"
            primary="View Invoices"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("managePuchaseOrdersOpen")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Purchase Orders" />
        {menuState.managePuchaseOrdersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.managePuchaseOrdersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/createPurchaseOrder"
            primary="Create PO"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewPurchaseOrders"
            primary="View POs"
            icon={<PeopleIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageInventoryOpen")}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
        {menuState.manageInventoryOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={menuState.manageInventoryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/addInventory"
            primary="Add Inventory"
            icon={<QueuePlayNextIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewInventory"
            primary="View Inventory"
            icon={<PeopleIcon />}
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
