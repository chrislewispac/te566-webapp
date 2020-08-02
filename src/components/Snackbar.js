import React, { useState, createContext, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export const SnackbarContext = createContext([{}, () => {}]);

export const SnackbarProvider = ({ children }) => {
  const [state, setState] = useState({ open: false, text: "" });
  return (
    <SnackbarContext.Provider value={[state, setState]}>
      {children}
      <SimpleSnackbar props={state} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  // eslint-disable-next-line
  const [state, setState] = useContext(SnackbarContext);

  function addAlert(text) {
    setState((state) => ({ ...state, open: true, text }));
  }
  return { addAlert };
};

const SimpleSnackbar = (props) => {
  const [state, setState] = React.useState({
    props: { open: false, text: "" },
  });

  React.useEffect(() => {
    setState(props);
  }, [props]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((state) => ({ props: { open: false } }));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={state.props.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.props.text}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
