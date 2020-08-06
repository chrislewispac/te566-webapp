import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Paper, Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { useFirestoreConnect } from "react-redux-firebase";

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

export default function ViewEmployees() {
  const classes = useStyles();

  useFirestoreConnect("invoice_history");

  const invoices =
    useSelector((state) => state.firestore.ordered.invoice_history) || []; //TODO: change to loading instead of empty array

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>View Invoices</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price/Unit</TableCell>
                  <TableCell>Total Invoice Amt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.date}</TableCell>
                    <TableCell>{d.customer_company_name}</TableCell>
                    <TableCell>{d.quantity}</TableCell>
                    <TableCell>$ {d.price_per_unit}</TableCell>
                    <TableCell>$ {d.total_invoice_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
