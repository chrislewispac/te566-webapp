import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

function Home(props) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <SignIn />
      </Route>
      <Route path={`/resetPassword`}>
        <ResetPassword />
      </Route>
    </Switch>
  );
}

export default Home;
