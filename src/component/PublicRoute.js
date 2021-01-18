import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useStore} from "../utils/useStores";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const store = useStore();

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (
      store.isLoggedIn && restricted ?
        <Redirect to="/app" />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;
