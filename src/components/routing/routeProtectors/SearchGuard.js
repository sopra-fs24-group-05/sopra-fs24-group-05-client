import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * <Outlet /> is rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
<<<<<<<< HEAD:src/components/routing/routeProtectors/SearchGuard.js
export const SearchGuard = () => {
  if (localStorage.getItem("token")) {

    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

SearchGuard.propTypes = {
========
export const LobbyGuard = () => {
  if (localStorage.getItem("token")) {
    
    return <Outlet />;
  }
  
  return <Navigate to="/login" replace />;
};

LobbyGuard.propTypes = {
>>>>>>>> temp-branch:src/components/routing/routeProtectors/LobbyGuard.js
  children: PropTypes.node
};