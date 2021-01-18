import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { App } from "../pages/App/App";
import PrivateRoute from "../component/PrivateRoute";


export const MainRoutes = (props) => {

  return <Switch>
    <Route path="/" exact>
      <Redirect to={"/login"} />
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <PrivateRoute component={App} path="/app" />
  </Switch>;
};
