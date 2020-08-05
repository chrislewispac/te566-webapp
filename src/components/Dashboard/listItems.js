import React from "react";
import { List, Collapse } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import ListItemLink from "./ListItemLink.js";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AddIcon from "@material-ui/icons/Add";
import ViewListIcon from "@material-ui/icons/ViewList";
import PaymentIcon from "@material-ui/icons/Payment";
import StorefrontIcon from "@material-ui/icons/Storefront";
import DescriptionIcon from "@material-ui/icons/Description";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ListAltIcon from "@material-ui/icons/ListAlt";

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
        to="/dashboard/incomeStatement"
        primary="Income Statement"
        icon={<DescriptionIcon />}
      />
      <ListItemLink
        to="/dashboard/balanceSheet"
        primary="Balance Sheet"
        icon={<AccountBalanceIcon />}
      />
      <ListItem button onClick={() => handleClickOpen("manageCustomersOpen")}>
        <ListItemIcon>
          <PeopleIcon />
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/customers"
            primary="View Customers"
            icon={<ViewListIcon />}
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/employees"
            primary="View Employees"
            icon={<ViewListIcon />}
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/vendors"
            primary="View Vendors"
            icon={<ViewListIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("managePayrollOpen")}>
        <ListItemIcon>
          <PaymentIcon />
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewPayroll"
            primary="View Payroll Events"
            icon={<ViewListIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageInvoicesOpen")}>
        <ListItemIcon>
          <ReceiptIcon />
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewInvoices"
            primary="View Invoices"
            icon={<ViewListIcon />}
          />
        </List>
      </Collapse>
      <ListItem
        button
        onClick={() => handleClickOpen("managePuchaseOrdersOpen")}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Purchase Orders" />
        {menuState.managePuchaseOrdersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={menuState.managePuchaseOrdersOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemLink
            className={classes.nested}
            to="/dashboard/createPurchaseOrder"
            primary="Create PO"
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewPurchaseOrders"
            primary="View POs"
            icon={<ViewListIcon />}
          />
        </List>
      </Collapse>
      <ListItem button onClick={() => handleClickOpen("manageInventoryOpen")}>
        <ListItemIcon>
          <StorefrontIcon />
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
            icon={<AddIcon />}
          />
          <ListItemLink
            className={classes.nested}
            to="/dashboard/viewInventory"
            primary="View Inventory"
            icon={<ViewListIcon />}
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
