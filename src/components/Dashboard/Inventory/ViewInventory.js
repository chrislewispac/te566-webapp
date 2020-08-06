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

  useFirestoreConnect("inventory");

  const payroll_events =
    useSelector((state) => state.firestore.ordered.inventory) || []; //TODO: change to loading instead of empty array

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>View Inventory</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Units in Stock</TableCell>
                  <TableCell>Value per Unit</TableCell>
                  <TableCell>Cost per Unit</TableCell>
                  <TableCell>Total Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll_events.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.item_name}</TableCell>
                    <TableCell>
                      {parseFloat(d.units_in_stock).toFixed(0)}
                    </TableCell>
                    <TableCell>
                      {parseFloat(d.value_per_unit).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {parseFloat(d.cost_per_unit).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {(parseFloat(d.value_per_unit) -
                        parseFloat(d.cost_per_unit)) *
                        parseFloat(d.units_in_stock)}
                    </TableCell>
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
