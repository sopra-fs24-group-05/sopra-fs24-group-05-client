import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import LobbyRouter from "./LobbyRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Login from "../../views/Login";
import Register from "../../views/Register"
import CreateItem from "../../views/CreateItem";
import {CreateItemGuard} from "../routeProtectors/CreateItemGuard";
import CreateTopic from "../../views/CreateTopic";
import {CreateTopicGuard} from "../routeProtectors/CreateTopicGuard";
import Comment from "../../views/Comment";
import {CommentGuard} from "../routeProtectors/CommentGuard";
import Profile from "../../views/Profile";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import Header from "../../views/Header";
import Topic from "../../views/Topic"
import { TopicGuard } from "../routeProtectors/TopicGuard";
import TopicList from "../../views/TopicList"
import { TopicListGuard } from "../routeProtectors/TopicListGuard";
import Search from "../../views/Search";
import { SearchGuard } from "../routeProtectors/SearchGuard";

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
      <Header />
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

        <Route path="/createItem" element={<CreateItemGuard />}>
          <Route path="/createItem" element={<CreateItem/>} />
        </Route>

        {/* TBD: id -> itemId */}
        <Route path="/comment/:id" element={<CommentGuard />}>
          <Route path="/comment/:id" element={<Comment/>} />
        </Route>

        <Route path="/profile/:profileId" element={<ProfileGuard />}>
          <Route path="/profile/:profileId" element={<Profile/>} />
        </Route>

        {/* <Route path="/profile" element={<ProfileGuard />}>
          <Route path="/profile" element={<Profile/>} />
        </Route> */}

        <Route path="/topic/:topicId" element={<TopicGuard />}>
          <Route path="/topic/:topicId" element={<Topic/>} />
        </Route>

        <Route path="/topicList" element={<TopicListGuard />}>
          <Route path="/topicList" element={<TopicList/>} />
        </Route>

        <Route path="/createTopic" element={<CreateTopicGuard />}>
          <Route path="/createTopic" element={<CreateTopic/>} />
        </Route>

        <Route path="/search" element={<SearchGuard />}>
          <Route path="/search" element={<Search/>} />
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
