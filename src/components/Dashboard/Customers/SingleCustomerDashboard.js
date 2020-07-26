import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function CurrentPatients() {
  const { id } = useParams();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useFirestoreConnect([
    {
      collection: "customers",
      doc: id,
    },
  ]);

  const customer = useSelector(
    ({ firestore: { data } }) => data.customers && data.customers[id]
  );
  console.log(customer);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={fixedHeightPaper}>
            SINGLE Customer DASHBOARD {id}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
