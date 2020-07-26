import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://source.unsplash.com/collection/1390381/480x480)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
  });

  const [errState, setErrState] = useState({ type: "", message: "" });

  const handleResetPasswordError = (e) => {
    switch (e.code) {
      case "auth/user-not-found":
        return {
          type: "email",
          message: "No user found with that email.",
        };
      default:
        return {
          type: "email",
          message: e.message || "unknown error, contact administrator",
        };
    }
  };

  const handleFormChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

  const firebase = useFirebase();

  const handleLogin = () => {
    firebase
      .resetPassword(formState.email)
      .then((res) => {})
      .catch((err) => {
        setErrState(handleResetPasswordError(err));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={errState.type === "email" ? true : false}
              helperText={errState.type === "email" ? errState.message : ""}
              value={formState.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleFormChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/">Sign In Instead?</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect(null, {})(SignIn);
