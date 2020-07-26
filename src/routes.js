import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./components/Auth";

export default (
  <Router>
    <Switch>
      {/* do not change this order, it matters */}
      <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
      <Route path="/" component={UserIsNotAuthenticated(Home)} />
    </Switch>
  </Router>
);
