import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems, SecondaryListItems } from "./listItems";
import MainDashboard from "./MainDashboard";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import ViewCustomers from "./Customers/ViewCustomers";
import AddCustomer from "./Customers/AddCustomer";
import ViewEmployees from "./Employees/ViewEmployees";
import AddEmployee from "./Employees/AddEmployee";
import ViewVendors from "./Vendors/ViewVendors";
import AddVendor from "./Vendors/AddVendor";
import PayEmployee from "./Payroll/PayEmployee";
import ViewPayroll from "./Payroll/ViewPayroll";
import AddInvoice from "./Invoice/AddInvoice";
import ViewInvoices from "./Invoice/ViewInvoices";
import AddPurchaseOrder from "./PurchaseOrder/AddPurchaseOrder";
import ViewPurchaseOrders from "./PurchaseOrder/ViewPurchaseOrders";
import ViewInventory from "./Inventory/ViewInventory";
// import SingleCustomerDashboard from "./Customers/SingleCustomerDashboard";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  notificationDrawer: {
    marginTop: "64px",
  },
  notificationDrawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: "360px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  notificationDrawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "0px",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <MainDashboard />
            </Route>
            <Route path={`${path}/incomeStatement`}>
              <IncomeStatement />
            </Route>
            <Route path={`${path}/balanceSheet`}>
              <BalanceSheet />
            </Route>
            <Route path={`${path}/addCustomer`}>
              <AddCustomer />
            </Route>
            <Route path={`${path}/addCustomer`}>
              <AddCustomer />
            </Route>
            <Route exact path={`${path}/customers`}>
              <ViewCustomers />
            </Route>
            {/* <Route path={`${path}/customers/:id`}>
              <SingleCustomerDashboard />
            </Route> */}
            <Route path={`${path}/addEmployee`}>
              <AddEmployee />
            </Route>
            <Route exact path={`${path}/employees`}>
              <ViewEmployees />
            </Route>
            {/* <Route path={`${path}/employees/:id`}>
              <SingleEmployeeDashboard />
            </Route> */}
            <Route path={`${path}/addVendor`}>
              <AddVendor />
            </Route>
            <Route exact path={`${path}/vendors`}>
              <ViewVendors />
            </Route>
            <Route exact path={`${path}/payEmployee`}>
              <PayEmployee />
            </Route>
            <Route exact path={`${path}/viewPayroll`}>
              <ViewPayroll />
            </Route>
            <Route exact path={`${path}/createInvoice`}>
              <AddInvoice />
            </Route>
            <Route exact path={`${path}/viewInvoices`}>
              <ViewInvoices />
            </Route>
            <Route exact path={`${path}/createPurchaseOrder`}>
              <AddPurchaseOrder />
            </Route>
            <Route exact path={`${path}/viewPurchaseOrders`}>
              <ViewPurchaseOrders />
            </Route>
            <Route exact path={`${path}/viewInventory`}>
              <ViewInventory />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default connect(null, {})(Dashboard);
