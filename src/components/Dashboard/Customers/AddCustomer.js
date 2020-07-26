import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Title from "../Title";
import { useFirestore } from "react-redux-firebase";
import { customerSchema, blankCustomer } from "../../../models/customer";
import moment from "moment";

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
        setFormState(blankCustomer);
      })
      .catch((e) => console.log(e));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredDate = moment().format();
    const data = { ...formState, registeredDate };
    const { error } = customerSchema.validate(data);
    if (!error) {
      addCustomer(data);
    } else {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Add Customer</Title>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Customer Type
                    </InputLabel>
                    <Select
                      id="customerType"
                      label="Customer Type"
                      name="customerType"
                      value={formState.customerType}
                      onChange={handleFormChange}
                    >
                      <MenuItem value={"Pulse Ox Sensor"}>
                        Pulse Oximeter
                      </MenuItem>
                      <MenuItem value={"IR Sensor"}>Thermometer</MenuItem>
                      <MenuItem value={"Pulse Sensor"}>Pulse Only</MenuItem>
                      <MenuItem value={"Pi Hub"}>Pi Hub</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    value={formState.customerVersion}
                    id="customerVersion"
                    label="Customer Version"
                    name="customerVersion"
                    fullWidth
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    value={formState.customerID}
                    id="customerID"
                    name="customerID"
                    label="Customer ID"
                    fullWidth
                    onChange={handleFormChange}
                  />
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
