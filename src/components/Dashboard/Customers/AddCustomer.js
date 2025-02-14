import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Button,
  // Select,
  // MenuItem,
  // InputLabel,
  FormControl,
} from "@material-ui/core";
import Title from "../Title";
import { useFirestore } from "react-redux-firebase";
import { blankCustomer } from "../../../models/customer";
import moment from "moment";
import { useSnackbar } from "../../Snackbar";

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

export default function AddCustomer() {
  const classes = useStyles();
  const { addAlert } = useSnackbar();

  const [formState, setFormState] = useState(blankCustomer);

  const handleFormChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

  const firestore = useFirestore();

  function addCustomer(data) {
    return firestore
      .collection("customers")
      .add(data)
      .then(() => {
        addAlert("Customer Added");
        setFormState(blankCustomer);
      })
      .catch((e) => {
        addAlert("Error: Customer Not Added");
        console.log(e);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = moment().format();
    const data = { ...formState, date };
    addCustomer(data);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Add Customer</Title>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="company_name"
                      label="Company Name"
                      name="company_name"
                      value={formState.company_name}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      value={formState.first_name}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={formState.last_name}
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="address"
                      label="Address"
                      name="address"
                      value={formState.address}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="city"
                      label="City"
                      name="city"
                      value={formState.city}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="state"
                      label="State"
                      name="state"
                      value={formState.state}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="zip"
                      label="Zip"
                      name="zip"
                      type="number"
                      value={formState.zip}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
