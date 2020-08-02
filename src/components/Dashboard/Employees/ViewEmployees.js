import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Paper, Grid, Button } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { Link as RouterLink } from "react-router-dom";

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
  const firestore = useFirestore();

  useFirestoreConnect("employees");

  const d = useSelector((state) => state.firestore.ordered.employees) || []; //TODO: change to loading instead of empty array
  const employees = d.filter((dd) => {
    return !dd.archived;
  });

  const archiveEmployee = (id) => {
    firestore
      .collection("employees")
      .doc(id)
      .update({ archived: true })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Current Employees</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City, State</TableCell>
                  <TableCell>Zip</TableCell>
                  <TableCell>SSN</TableCell>
                  <TableCell># Witholdings</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{`${d.first_name} ${d.last_name}`}</TableCell>
                    <TableCell>{d.address}</TableCell>
                    <TableCell>{`${d.city}, ${d.state}`}</TableCell>
                    <TableCell>{d.zip}</TableCell>
                    <TableCell>{d.ssn}</TableCell>
                    <TableCell>{d.num_witholdings}</TableCell>
                    <TableCell>{d.salary}</TableCell>
                    <TableCell>
                      <Button
                        component={RouterLink}
                        to={`/dashboard/employees/${d.id}`}
                        size="small"
                        color="primary"
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => {
                          archiveEmployee(d.id);
                        }}
                      >
                        Archive
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
    </React.Fragment>
  );
}
