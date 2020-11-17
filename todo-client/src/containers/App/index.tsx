import React from "react";
import HomeContainer from "../HomeContainer/index";
import DashboardContainer from "../DashboardContainer/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
