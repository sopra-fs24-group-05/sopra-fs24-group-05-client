import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Profile.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const PlayerProfile = ({ user }: { user: User }) => (
  <div className="playerProfile container">
    <div className="player">
      <span>Username: </span>
      {user.username}
    </div>
    <div className="player">
      <span>ID: </span>
      {user.id}
    </div>
    <div className="player">
      <span>Creation Date: </span> 
      {new Date(user.creationDate).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\//g, "-")}
    </div>
    <div className="player">
      {user.birthday === null ? "": <span>Birthday: {new Date(user.birthday).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\//g, "-")}</span>}
    </div>
  </div>
);

const UserFormField = (props) => {  
  try {
    const user = JSON.parse(props.user) as User;
    
    return (
      <div className="profile field">
        <h2>{props.module}</h2>
        <label className="profile label">{props.label}</label>
        <div className="profile avatar-container">
          <img
            className="profile avatar"
            src="data:image/jpeg;base64,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"
            alt="User Avatar"
          />
        </div>
        <PlayerProfile user={user} />
        <br></br>
      </div>
    );
  } catch (error) {
    console.error("Error parsing user data:", error);
    
    return null;
  }
};

UserFormField.propTypes = {
  module: PropTypes.string,
  label: PropTypes.string,
  user: PropTypes.string
};

const FormField = (props) => {  
  return (
    <div className="profile field">
      <h2>{props.module}</h2>
      <label className="profile label">{props.label}</label>
      {/* <div className="textbox-container">
        <input className="textbox" type="text" />
        <input className="textbox" type="text" placeholder="Enter text" />
      </div> */}
    </div>
  );
};

FormField.propTypes = {
  module: PropTypes.string,
  label: PropTypes.string,
};

const Profile = () => {
  const navigate = useNavigate();
  const isSelf = localStorage.getItem("isSelf");
  const user = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(user) as User;
  let content = <BaseContainer className="profile" />

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      alert(token);
      const requestBody = JSON.stringify({ token:token });
      api.put("/users/logout", requestBody);
  
      localStorage.removeItem("token");
  
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the logout: \n${handleError(error)}`
      );
    }
  };

  if (currentUser.id === 1) { // only for test
  // if (currentUser.identity === 0)
    // student
    content = <div className="profile container">
      <div className="profile form">
        <UserFormField
          module="Information"
          user={user}
        />
        <br></br>
        <FormField
          module="Follows"
          
        />
        <br></br>
        <FormField
          module="Topics"
          
        />
        <br></br>
        <FormField
          module="Comments"
          
        />
        <div className="profile button-container">
          <Button className="profile button back"
            width="100%"
            onClick={() => {localStorage.setItem("isSelf", "0"); navigate("/lobby");}}
          >
            back
          </Button>
          <Button className="profile button logout"
            width="100%"
            onClick={logout}
          >
            logout
          </Button>
          <Button className="profile button edit"
            width="100%"
          >
            edit
          </Button>
        </div>
      </div>
    </div>
  } else if (currentUser.identity === 1) {
    // teacher
  } else if (currentUser.identity === 2) {
    // admin
  }
  
  return content;
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Profile;
