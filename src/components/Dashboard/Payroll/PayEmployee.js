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
// import { Link as RouterLink } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState({});

  const handleClickOpen = (e) => {
    setEmployee(() => e);
    setOpen(true);
    // firestore
    //   .collection("employees")
    //   .doc(id)
    //   .update({ archived: true })
    //   .then(() => {})
    //   .catch((e) => console.log(e));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    console.log("commit to paying employee here");
    setOpen(false);
  };

  useFirestoreConnect("employees");

  const d = useSelector((state) => state.firestore.ordered.employees) || []; //TODO: change to loading instead of empty array
  const employees = d.filter((dd) => {
    return !dd.archived;
  });

  const payEmployee = (id) => {
    console.log("TODO: implement pay employee by id");
    let e = employees.filter((e) => e.id === id)[0];
    handleClickOpen(e);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Pay an Employee</Title>
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
                        size="small"
                        color="primary"
                        onClick={() => {
                          payEmployee(d.id);
                        }}
                      >
                        Pay Now
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to pay{" "}
            {`${employee.first_name} ${employee.last_name}`}? The following
            changes will occur...
            <br />
            <br />
            <strong>Weekly Employee Pay</strong>:
            {` ${(parseInt(employee.salary) / 52).toFixed(2)}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Pay Employee
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
