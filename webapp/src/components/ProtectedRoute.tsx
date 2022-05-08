import React from "react";

import { isLoggedIn } from '../app/store';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router";

type ProtectedRoutePropType = {
  route: string,
  redirectRoute: string,
  children: JSX.Element,
}

let ProtectedRoute: React.FC<ProtectedRoutePropType> = function ProtectedRoute(props) {
  let authed = useSelector(isLoggedIn);
  if (!authed) {
    return <Navigate to={props.redirectRoute} replace />;
  }

  return props.children;
}

export default ProtectedRoute;