import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import Topic from "models/Topic";
import Item from "models/Item";
import Comment from "models/Comment";
import {useNavigate, useParams} from "react-router-dom";
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
let editStatus = false;
let editUsername = "";
let editPassword = "";
const getEditStatus = () => editStatus;
const getEditUsername = () => editUsername;
const getEditPassword = () => editPassword;
const setEditStatus = (newValue) => { editStatus = newValue; };
const setEditUsername = (newValue) => { editUsername = newValue; };
const setEditPassword = (newValue) => { editPassword = newValue; };

const PlayerProfile = ({ user }: { user: User }) => (
  <div className="playerProfile container">
    <div className="player">
      <span className ="profile title">Username: </span>
      {!editStatus ? (user.username) : (
        <input
          className="profile editinput"
          type="text"
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />
      )}
    </div>
    {editStatus && 
      <div className="player">
        <span className ="profile title">Password: </span>
        <input
          className="profile editinput"
          type="text"
          value={editPassword}
          onChange={(e) => setEditPassword(e.target.value)}
        />
      </div>
    }
    <div className="player">
      <span className ="profile title">Creation Date: </span> 
      {new Date(user.createDate).toLocaleDateString("zh-CN", {
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
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const updatedUser = {...props.user, avatar: reader.result};
          await api.put(`/users/editAvatar/${localStorage.getItem("currentUserId")}`, reader.result);
          props.setUser(updatedUser);
          alert("Avatar successfully changed!")
        } catch (error) {
          alert(
            `Something went wrong during the get: \n${handleError(error)}`
          );
        }
      };
      reader.readAsDataURL(file);
    }
    
  };

  try {
    return (
      <div className="profile field1">
        <h2 className ="profile title">{props.module}</h2>
        <label className="profile label">{props.label}</label>
        <div className="profile avatar-container">
          <img
            className="profile avatar"
            src={props.user.avatar}
            alt="User Avatar"
            onClick={() => {
              if (props.user.userId.toString() === localStorage.getItem("currentUserId")) {
                document.getElementById("uploadInput").click();
              }
            }}
          />
          <input
            type="file"
            id="uploadInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <PlayerProfile user={props.user} />
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
  user: PropTypes.string,
  setUser: PropTypes.func
};

const Profile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  // const user = localStorage.getItem("currentUser");
  // const currentUser = JSON.parse(user) as User;
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem("currentUser")) as User);
  const [editStatus, setLocalEditStatus] = useState(getEditStatus());
  const [editUsername, setLocalEditUsername] = useState(getEditUsername());
  const [editPassword, setLocalEditPassword] = useState(getEditPassword());
  const [followItemList, setFollowItemList] = useState<Item[]>([]);
  const [pubCommentList, setPubCommentList] = useState<Comment[]>([]);
  const [bannedList, setBannedList] = useState<User[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentStatus = getEditStatus();
      const currentUsername = getEditUsername();
      const currentPassword = getEditPassword();
      if (currentStatus !== editStatus) { setLocalEditStatus(currentStatus); }
      if (currentUsername !== editUsername) { setLocalEditUsername(currentUsername); }
      if (currentPassword !== editPassword) { setLocalEditPassword(currentPassword); }
    }, 1);

    return () => clearInterval(interval);
  }, [editStatus, editUsername, editPassword]);

  const FormField = (props) => {  
    const doTranslate = async (isTranslated, commentId, content) => {
      try {
        if (isTranslated) {
          const commentIndex = pubCommentList.findIndex(comment => comment.commentId === commentId);
          if (commentIndex !== -1) {
            const updatedCommentList = [...pubCommentList];
            updatedCommentList[commentIndex].content = updatedCommentList[commentIndex].originalContent;
            updatedCommentList[commentIndex].isTranslated = false;
            setPubCommentList(updatedCommentList);
          }
        } else {
          const responseTranslate = await api.get("/translate", { params: { text: content, targetLanguage: navigator.language } });
          const translatedContent = responseTranslate.data;
          const commentIndex = pubCommentList.findIndex(comment => comment.commentId === commentId);
          if (commentIndex !== -1) {
            const updatedCommentList = [...pubCommentList];
            updatedCommentList[commentIndex].content = translatedContent;
            updatedCommentList[commentIndex].originalContent = content;
            updatedCommentList[commentIndex].isTranslated = true;
            setPubCommentList(updatedCommentList);
          }
        }
      } catch (error) {
        console.error("Translation failed:", error);
      }
    };
    
    const doCheckProfile = (userId) => {
      navigate(`/profile/${userId}`);
    }

    let content = null;
    switch (props.module) {
    case "Follows":
      content = (
        <ul className = "profile followList">
          {followItemList.length > 0 ? followItemList.map((item, index) => (
            <li 
              className="profile followItem"
              key={index} 
              onClick={() => {localStorage.setItem("currentTopicId", item.followItemTopicId); localStorage.setItem("currentItemId", item.followItemId);navigate(`/comment/${item.followItemId}`)}}
            >
              {item.followItemname}
            </li>
          )) : <div>No Follow Items.</div>}
        </ul>
      );
      break;
    case "Comments":
      content = (
        <ul className="profile commentList">
          {pubCommentList ? (pubCommentList.map((comment, index) => (
            <li key={index}>
              <div className = "profile singlecommentcontainer" >
                <div className="profile commentownerInformationcontainer">
                  <div className="profile commentownerUsername">
                    <strong>{comment.commentItemTopicName}/{comment.commentItemName}</strong>
                  </div>
                </div>
                <div className="profile commentcontent">
                  {comment.content}
                </div>
                <div className="profile replyandthumbupscontainer">
                  <div className="profile thumbups">
                    <div className="profile thumbupsButton">
                      <svg className="thumbupsLikedIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M860.032 341.12h-182.08c7.488-17.408 14.72-38.528 18.048-60.544 5.952-39.872 4.992-87.36-18.368-129.088-21.76-38.848-50.304-60.928-83.52-61.376-30.72-0.384-53.888 18.176-65.728 33.408a199.296 199.296 0 0 0-32.064 59.264l-1.92 5.184c-5.44 14.976-10.88 29.952-23.04 51.456-19.712 34.816-48.832 56.128-77.696 74.368a391.936 391.936 0 0 1-30.976 17.92v552.448a4621.952 4621.952 0 0 0 351.872-5.312c51.264-2.752 100.672-28.544 127.488-76.032 24.32-43.136 55.168-108.16 74.368-187.264 20.416-84.16 24.64-152.704 24.576-195.968-0.128-46.336-38.72-78.4-80.96-78.4z m-561.344 541.312V341.12H215.808c-59.712 0-113.408 42.048-120.896 104.32a1376 1376 0 0 0 0.64 330.368c7.36 58.688 56.128 100.032 113.024 102.848 25.024 1.28 55.552 2.56 90.112 3.712z" fill="#000000"></path></svg>
                    </div>
                    <div className="profile thumbupsNumber">{comment.thumbsUpNum}</div>
                  </div>
                </div>
                <div className="profile translate">
                  <div className="profile translateButton" onClick={() => doTranslate(comment.isTranslated, comment.commentId, comment.content)}>{comment.isTranslated ? "Restore" : "Translate"}</div>
                </div>
                <div className="profile bottom-line"></div>
              </div>
            </li>
          ))) : (<div>Loading...</div>)}
        </ul>
      )
      break;
    case "Banned List":
      content = (
        <ul className="profile bannedList">
          {bannedList.length > 0 ? (bannedList.map((user, index) => (
            <li key={index} onClick={() => doCheckProfile(user.userId)}>{user.username}</li>
          ))) : (bannedList.length === 0 ? (<div>No banned user.</div>) : (<div>Loading...</div>))}
        </ul>
      )
      break;
    default:
      break;
    };
  
    return (
      <div className="profile field2">
        <h2 className ="profile title">{props.module}</h2>
        {content}
      </div>
    );
  };
  
  FormField.propTypes = {
    module: PropTypes.string,
    label: PropTypes.string,
  };
  
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const requestBody = JSON.stringify({ token:token });
      api.put("/users/logout", requestBody);
  
      localStorage.clear();
  
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the logout: \n${handleError(error)}`
      );
    }
  };

  const doEdit = async () => {
    if (editStatus) {
      try {
        const updatedUser = {...user, username: getEditUsername(), password: getEditPassword()};
        await api.put("/users/edit", updatedUser, { params: {token: user.token} });
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Successfully edit!");
      } catch (error) {
        alert(
          `Something went wrong during the edit: \n${handleError(error)}`
        );
      }
    }
    const newStatus = !getEditStatus();
    setEditStatus(newStatus);
    setLocalEditStatus(newStatus);
  };

  const doBanUser = async (userId, identity) => {
    try {
      if (identity === "BANNED") {
        await api.put(`/admin/unblockUser/${localStorage.getItem("currentUserId")}`, userId);
        alert("Successfully release!");
      } else {
        await api.put(`/admin/banUser/${localStorage.getItem("currentUserId")}`, userId);
        alert("Successfully ban!");
      }
      window.history.back();
    } catch (error) {
      alert(
        `Something went wrong during the operation: \n${handleError(error)}`
      );
    }
  };

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const userId = profileId;
        const response = await api.get(`/users/${userId}`, { params: {userId: userId} });
        
        setUser(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user information: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the user information! See the console for details."
        );
      }
    }

    setEditStatus(false);
    setEditUsername("");
    setEditPassword("");
    setFollowItemList([]);
    setPubCommentList([]);
    setBannedList([]);
    console.log(editStatus);
    console.log(editUsername);
    console.log(editPassword);
    fetchData();  
  }, [profileId]);

  useEffect(() => {
    async function fetchItemListData() {
      try {
        const userId = profileId;
        const responseFollowItemList = await api.get(`/users/${userId}/followItems`);
        setFollowItemList(responseFollowItemList.data);
      } catch (error) {
        alert(
          `Something went wrong during the get: \n${handleError(error)}`
        );
      }
    };
    async function fetchCommentListData() {
      try {
        const userId = profileId;
        const responseCommentList = await api.get(`/comments/userId/${userId}`);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setPubCommentList(responseCommentList.data);
      } catch (error) {
        alert(
          `Something went wrong during the get: \n${handleError(error)}`
        );
      }
    };
    const fetchBannedListData = async () => {
      try {
        const userId = localStorage.getItem("currentUserId");
        const responseBannedList = await api.get(`/admin/getBannedList/${userId}`);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setBannedList(responseBannedList.data);
      } catch (error) {
        alert(
          `Something went wrong during the get: \n${handleError(error)}`
        );
      }
    };

    console.log(user);
    if (user.identity === "ADMIN" && JSON.parse(localStorage.getItem("currentUser")).identity === "ADMIN") {
      fetchBannedListData();
    } else {
      fetchItemListData();
      fetchCommentListData();
    }
  }, [user]);

  if (user.identity === "ADMIN" && JSON.parse(localStorage.getItem("currentUser")).identity === "ADMIN") {
    // admin
    return (
      <BaseContainer className="profile">
        <div className="profile container">
          <div className="profile form">
            <h1 className="profile bigtitle">User Profile</h1>
            <UserFormField
              module="Information"
              user={user}
            />
            <br></br>
            <FormField
              module="Banned List"
            />
            <div className="profile button-container">
              <Button className="profile button back"
                width="100%"
                onClick={() => {window.history.back();}}
              >
                back
              </Button>
              {profileId === localStorage.getItem("currentUserId") ? (
                <>
                  <Button className="profile button logout"
                    width="100%"
                    onClick={() => logout()}
                  >
                    logout
                  </Button>
                  <Button className="profile button edit"
                    width="100%"
                    onClick={() => doEdit()}
                    disabled={editStatus && (editUsername === "" || editPassword === "")}
                  >
                    {!editStatus ? "edit" : "save"}
                  </Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>)    
  } else {
    // student
    return (
      <BaseContainer className="profile">
        <div className="profile container">
          <div className="profile form">
            <h1 className="profile bigtitle">User Profile</h1>
            <UserFormField
              module="Information"
              user={user}
              setUser={setUser}
            />
            <br></br>
            <FormField
              module="Follows"
            />
            <br></br>
            <FormField
              module="Comments"
            />
            <div className="profile button-container">
              <Button className="profile button back"
                width="100%"
                onClick={() => {window.history.back();}}
              >
                back
              </Button>
              {profileId === localStorage.getItem("currentUserId") ? (
                <>
                  <Button className="profile button logout"
                    width="100%"
                    onClick={() => logout()}
                  >
                    logout
                  </Button>
                  <Button className="profile button edit"
                    width="100%"
                    onClick={() => doEdit()}
                    disabled={editStatus && (editUsername === "" || editPassword === "")}
                  >
                    {!editStatus ? "edit" : "save"}
                  </Button>
                </>
              ) : (
                <>
                  {JSON.parse(localStorage.getItem("currentUser")).identity === "ADMIN" && 
                  <Button className="profile button ban"
                    width="100%"
                    onClick={() => {doBanUser(user.userId, user.identity)}}
                  >
                    {user.identity === "BANNED" ? "release" : "ban"}
                  </Button>}
                </>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>)  
  } 
};

export default Profile;
