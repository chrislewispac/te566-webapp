import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { useFirestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
    padding: "20px",
  },
  formControl: {
    width: "100%",
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

export default function MainDashboard() {
  const classes = useStyles();

  useFirestoreConnect("income_statement");

  const income_statement =
    useSelector((state) => state.firestore.ordered.income_statement) || []; //TODO: change to loading instead of empty array

  let is = income_statement[0] || {};
  let gross_profit =
    (parseFloat(is.sales) - parseFloat(is.cogs)).toFixed(2) || 0;
  let total_expenses =
    (
      parseFloat(is.payroll) +
      parseFloat(is.payroll_withholding) +
      parseFloat(is.bills) +
      parseFloat(is.annual_expenses)
    ).toFixed(2) || 0;
  let net_income =
    (parseFloat(gross_profit) - parseFloat(total_expenses)).toFixed(2) || 0;

  if (isEmpty(income_statement) || !isLoaded(income_statement)) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <h1>Income Statement</h1>
            </Grid>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Sales
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.sales).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    COGS
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.cogs).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Gross Profit</strong>
                  </TableCell>
                  <TableCell align="right">$ {gross_profit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Expenses</strong>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Payroll
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.payroll).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Payroll Withholding
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.payroll_withholding).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Bills
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.bills).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Annual Expenses
                  </TableCell>
                  <TableCell align="right">
                    $ {parseFloat(is.annual_expenses).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Expenses</strong>
                  </TableCell>
                  <TableCell align="right">$ {total_expenses}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Net Income</strong>
                  </TableCell>
                  <TableCell align="right">$ {net_income}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
