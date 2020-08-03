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

export default function ViewVendors() {
  const classes = useStyles();
  const firestore = useFirestore();

  useFirestoreConnect("vendors");

  const d = useSelector((state) => state.firestore.ordered.vendors) || []; //TODO: change to loading instead of empty array
  const vendors = d.filter((dd) => {
    return !dd.archived;
  });

  const archiveVendor = (id) => {
    firestore
      .collection("vendors")
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
            <Title>Current Vendors</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Vendor Name</TableCell>
                  <TableCell>Part Number</TableCell>
                  <TableCell>Price/Unit</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Zip</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.vendor_name}</TableCell>
                    <TableCell>{d.part_number}</TableCell>
                    <TableCell>{d.price_per_unit}</TableCell>
                    <TableCell>{d.city}</TableCell>
                    <TableCell>{d.state}</TableCell>
                    <TableCell>{d.zip}</TableCell>
                    <TableCell>{d.salary}</TableCell>
                    <TableCell>
                      <Button
                        component={RouterLink}
                        to={`/dashboard/vendors/${d.id}`}
                        size="small"
                        color="primary"
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => {
                          archiveVendor(d.id);
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
