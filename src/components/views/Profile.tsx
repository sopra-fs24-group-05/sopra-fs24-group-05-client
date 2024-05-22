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
const PlayerProfile = ({ user }: { user: User }) => (
  <div className="playerProfile container">
    <div className="player">
      <span>Username: </span>
      {user.username}
    </div>
    <div className="player">
      <span>Creation Date: </span> 
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
      <div className="profile field">
        <h2>{props.module}</h2>
        <label className="profile label">{props.label}</label>
        <div className="profile avatar-container">
          <img
            className="profile avatar"
            src={props.user.avatar}
            alt="User Avatar"
            onClick={() => document.getElementById("uploadInput").click()}
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

const FormField = (props) => {  
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [followUserList, setFollowUserList] = useState<User[]>([]);
  const [followItemList, setFollowItemList] = useState<Item[]>([]);
  const [pubTopicList, setPubTopicList] = useState<Topic[]>([]);
  const [pubCommentList, setPubCommentList] = useState<Comment[]>([]);
  const [bannedList, setBannedList] = useState<User[]>([]);
  const [teacherTopicList, setTeacherTopicList] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const userId = profileId;
        const responseFollowItemList = await api.get(`/users/${userId}/followItems`);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setFollowItemList(responseFollowItemList.data);
        console.log(followItemList);
      } catch (error) {
        alert(
          `Something went wrong during the get: \n${handleError(error)}`
        );
      }
    };

    fetchListData();
  }, []);
  
  useEffect(() => {
    const fetchListData = async () => {
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

    fetchListData();
  }, []);

  
  let content = null;
  switch (props.module) {
  case "Follows":
    content = (
      <ul>
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
  case "Topics":
    content = (
      <ul>
        {pubTopicList.map((topic, index) => (
          <li key={index}>{topic.topicname}</li>
        ))}
      </ul>
    );
    break;
  case "Comments":
    content = (
      <ul>
        {pubCommentList && pubCommentList.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
    )
    break;
  case "Banned List":
    content = (
      <ul>
        {bannedList.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    )
    break;
  case "My Topics":
    content = (
      <ul>
        {teacherTopicList.map((topic, index) => (
          <li key={index}>{topic.topicname}</li>
        ))}
      </ul>
    )
    break;
  default:
    break;
  };

  return (
    <div className="profile field">
      <h2>{props.module}</h2>
      {content}
    </div>
  );
};

FormField.propTypes = {
  module: PropTypes.string,
  label: PropTypes.string,
};

const Profile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  // const user = localStorage.getItem("currentUser");
  // const currentUser = JSON.parse(user) as User;
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem("currentUser")) as User);
  const [loading, setLoading] = useState(true);
  // alert(user.identity);
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

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        // const userId = localStorage.getItem("currentUserId");
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
    fetchData();  
  }, []);
  
  
  if (user.identity === "STUDENT") { // only for test
    // student
    return (
      <BaseContainer className="profile">
        <div className="profile container">
          <div className="profile form">
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
            {/* <FormField
              module="Topics"
            /> */}
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
                    onClick={logout}
                  >
                    logout
                  </Button>
                  <Button className="profile button edit"
                    width="100%"
                  >
                    edit
                  </Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>)
  } else if (user.identity === "ADMIN") {
    // admin
    return (
      <BaseContainer className="profile">
        <div className="profile container">
          <div className="profile form">
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
                    onClick={logout}
                  >
                    logout
                  </Button>
                  <Button className="profile button edit"
                    width="100%"
                  >
                    edit
                  </Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>)
  } else if (user.identity === "TEACHER") {
    // teacher
    return (
      <BaseContainer>
        <div className="profile container">
          <div className="profile form">
            <UserFormField
              module="Information"
              user={user}
            />
            <br></br>
            <FormField
              module="My Topics"
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
                    onClick={logout}
                  >
                    logout
                  </Button>
                  <Button className="profile button edit"
                    width="100%"
                  >
                    edit
                  </Button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </BaseContainer>)
  }
};

export default Profile;
