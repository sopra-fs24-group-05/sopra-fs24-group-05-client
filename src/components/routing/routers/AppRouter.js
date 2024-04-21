import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import LobbyRouter from "./LobbyRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Login from "../../views/Login";
import Register from "../../views/Register"
import Create from "../../views/Create";
import {CreateGuard} from "../routeProtectors/CreateGuard";
import Comment from "../../views/Comment";
import {CommentGuard} from "../routeProtectors/CommentGuard";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial 
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/lobby/*" element={<LobbyGuard />}>
          <Route path="/lobby/*" element={<LobbyRouter base="/lobby"/>} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Login/>} />
        </Route>

        <Route path="/register" element={<RegisterGuard />}>
          <Route path="/register" element={<Register/>} />
        </Route>

        <Route path="/create" element={<CreateGuard />}>
          <Route path="/create" element={<Create/>} />
        </Route>

        <Route path="/comment" element={<CommentGuard />}>
          <Route path="/comment" element={<Comment/>} />
        </Route>

        <Route path="/" element={
          <Navigate to="/lobby" replace />
        }/>

      </Routes>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
