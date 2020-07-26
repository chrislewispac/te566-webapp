import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default function configureStore(initialState, routerHistory) {
  const actionCreators = {};

  const reducers = {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  };

  const middlewares = [thunk.withExtraArgument(getFirebase)];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === "development" && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    persistState()
  );
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
