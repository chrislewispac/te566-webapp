import React from "react";
import { useSelector } from "react-redux";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Paper, Grid, Button } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";

const preventDefault = (e) => {
  e.preventDefault();
};

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

export default function ViewCustomers() {
  const classes = useStyles();
  const firestore = useFirestore();

  useFirestoreConnect("customers");

  const d = useSelector((state) => state.firestore.ordered.customers) || []; //TODO: change to loading instead of empty array
  const customers = d.filter((dd) => {
    return !dd.archived;
  });

  const archiveCustomer = (id) => {
    firestore
      .collection("customers")
      .doc(id)
      .update({ archived: true })
      .then(() => { })
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Current Customers</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Registered Date</TableCell>
                  <TableCell>Customer Type</TableCell>
                  <TableCell>Customer Version</TableCell>
                  <TableCell>Archived</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      {moment(d.registeredDate).format("MM/DD/YY")}
                    </TableCell>
                    <TableCell>{d.customerType}</TableCell>
                    <TableCell>{d.customerVersion}</TableCell>
                    <TableCell>{JSON.stringify(d.archived)}</TableCell>
                    <TableCell>deployed</TableCell>
                    <TableCell>
                      <Button
                        component={RouterLink}
                        to={`/dashboard/customers/${d.id}`}
                        size="small"
                        color="primary"
                      >
                        View
                      </Button>
                      <Button
                        component={RouterLink}
                        to={`/dashboard/customers/${d.id}/deploy`}
                        size="small"
                        color="primary"
                      >
                        Deploy
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => {
                          archiveCustomer(d.id);
                        }}
                      >
                        Archive
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.seeMore}>
              <Link color="primary" href="#" onClick={preventDefault}>
                See more patients
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
