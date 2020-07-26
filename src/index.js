import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import routes from "./routes";
import configureStore from "./store";
import { myFirebase } from "./firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import * as serviceWorker from "./serviceWorker";

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

myFirebase.firestore(); // <- needed if using firestore

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB/
  enableClaims: true, // Get custom claims along with the profile
  presence: "presence", // where list of online users is stored in database
  sessions: "sessions", // where list of user sessions is stored in database (presence must be enabled)
};

const rrfProps = {
  firebase: myFirebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      {routes}
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
