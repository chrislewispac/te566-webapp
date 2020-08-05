import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
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
  useFirestoreConnect("balance_sheet");

  const balance_sheet =
    useSelector((state) => state.firestore.ordered.balance_sheet) || []; //TODO: change to loading instead of empty array

  let bs = balance_sheet[0];

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <h1>Assets</h1>
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
                    Cash
                  </TableCell>
                  <TableCell align="right">$ {bs.cash.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Accounts Receivable
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.accounts_receivable.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Inventory
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.inventory.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Current Assets</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Land/Buildings
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.land_buildings.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Equipment
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.equipment.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Furniture & Fixtures
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.furniture_fixtures.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Fixed Assets</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Assets</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <h1>Liabilities</h1>
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
                    Accounts Payable
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.accounts_payable.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Notes Payable
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.notes_payable.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Accruals
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.accruals.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Current Liabilities</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Mortgage
                  </TableCell>
                  <TableCell align="right">
                    $ {bs.mortgage.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Long Term Debt</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Liabilities</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Net Worth</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <strong>Total Liabilities & Net Worth</strong>
                  </TableCell>
                  <TableCell align="right">$ calculated value</TableCell>
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
