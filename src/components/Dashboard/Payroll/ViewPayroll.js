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

  useFirestoreConnect("payroll_events");
  useFirestoreConnect("employees");

  const payroll_events =
    useSelector((state) => state.firestore.ordered.payroll_events) || []; //TODO: change to loading instead of empty array

  const employees =
    useSelector((state) => state.firestore.data.employees) || {}; //TODO: change to loading instead of empty array

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Payroll Event Log</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Fed Tax</TableCell>
                  <TableCell>State Tax</TableCell>
                  <TableCell>SS Tax</TableCell>
                  <TableCell>Medicare Tax</TableCell>
                  <TableCell>Amount Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payroll_events.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{`${employees[d.employee_id].first_name} ${
                      employees[d.employee_id].last_name
                    }`}</TableCell>
                    <TableCell>{d.gross_pay}</TableCell>
                    <TableCell>{d.federal_tax}</TableCell>
                    <TableCell>{d.state_tax}</TableCell>
                    <TableCell>{d.social_security_tax}</TableCell>
                    <TableCell>{d.medicare_tax}</TableCell>
                    <TableCell>{d.amount_paid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.seeMore}></div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
