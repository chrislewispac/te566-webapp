import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Paper, Grid, Button, TextField } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import {
  useFirestoreConnect,
  useFirestore,
  isEmpty,
  isLoaded,
} from "react-redux-firebase";
// import { Link as RouterLink } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "../../Snackbar";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
    padding: "20px",
  },
  submitButton: {
    marginTop: "40px",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function CreatePurchaseOrder() {
  const classes = useStyles();
  const firestore = useFirestore();
  const { addAlert } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [vendor, setVendor] = React.useState({});
  const [formState, setFormState] = React.useState({});

  const handleFormChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

  const handleCancel = () => {
    setOpen(false);
  };

  const issueInvoice = () => {
    setOpen(false);
    addAlert("Purchase Order Event Added");
    const { quantity } = formState || 0;
    const { price_per_unit, part_number } = vendor;
    const total_purchase_order_amount = quantity * price_per_unit;
    const date = moment().format("YYYY-MM-DD");
    const supplier = vendor.vendor_name;
    const purchaseOrderEntry = {
      date,
      supplier,
      part_number,
      quantity,
      price_per_unit,
      total_purchase_order_amount,
    };
    let i_statement = is[0];
    let b_sheet = bs[0];
    return firestore
      .collection("purchase_order_history")
      .add(purchaseOrderEntry)
      .then(() => {
        addAlert("Purchase Order Added to History");
        firestore
          .collection("inventory")
          .doc(trucks.id)
          .update({
            units_in_stock:
              parseFloat(trucks.units_in_stock) + parseFloat(quantity),
          })
          .then(() => {
            //update income statement
            firestore
              .collection("income_statement")
              .doc(i_statement.id)
              .update({
                cogs: (
                  parseFloat(i_statement.cogs) +
                  parseFloat(total_purchase_order_amount)
                ).toFixed(2),
              })
              .then(() => {
                //update balance sheet

                firestore
                  .collection("balance_sheet")
                  .doc(b_sheet.id)
                  .update({
                    cash: (
                      parseFloat(b_sheet.cash) -
                      parseFloat(total_purchase_order_amount)
                    ).toFixed(2),
                    inventory: (
                      parseFloat(b_sheet.inventory) +
                      parseFloat(quantity) * parseFloat(2)
                    ).toFixed(2),
                  })
                  .then(() => {
                    //done!
                  })
                  .catch((e) => {
                    addAlert("Error: Invoice Event Not Added");
                    console.log(e);
                  });
              })
              .catch((e) => {
                addAlert("Error: Invoice Event Not Added");
                console.log(e);
              });
          })
          .catch((e) => {
            addAlert("Error: Invoice Event Not Added");
            console.log(e);
          });
      })
      .catch((e) => {
        addAlert("Error: Purchase Order Event Not Added");
        console.log(e);
      });
  };

  const handleOpen = (id) => {
    const vendor = d.filter((dd) => {
      return dd.id === id;
    });
    setVendor(vendor[0]);
    setOpen(true);
  };

  useFirestoreConnect("vendors");
  useFirestoreConnect("inventory");
  useFirestoreConnect("income_statement");
  useFirestoreConnect("balance_sheet");

  const d = useSelector((state) => state.firestore.ordered.vendors) || []; //TODO: change to loading instead of empty array
  const vendors = d.filter((dd) => {
    return !dd.archived;
  });

  const i = useSelector((state) => state.firestore.ordered.inventory) || [];
  const trucks = i[0];
  const is =
    useSelector((state) => state.firestore.ordered.income_statement) || []; //TODO: change to loading instead of empty array

  const bs =
    useSelector((state) => state.firestore.ordered.balance_sheet) || []; //TODO: change to loading instead of empty array

  if (isEmpty(i) || !isLoaded(i)) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Create a Purchase Order</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City, State</TableCell>
                  <TableCell>Zip</TableCell>
                  <TableCell>Part</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.vendor_name}</TableCell>
                    <TableCell>{d.address}</TableCell>
                    <TableCell>{`${d.city}, ${d.state}`}</TableCell>
                    <TableCell>{d.zip}</TableCell>
                    <TableCell>Trucks</TableCell>
                    <TableCell>{d.price_per_unit}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleOpen(d.id);
                        }}
                      >
                        Create Purchase Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.seeMore}></div>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You currently have {trucks.units_in_stock} units in inventory, how
            many would you like to invoice to {vendor.company_name}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            name="quantity"
            label="Number of Units to Invoice"
            type="number"
            min="0"
            max={trucks.units_in_stock || 0}
            fullWidth
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={issueInvoice} color="primary">
            Issue Purchase Order
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
