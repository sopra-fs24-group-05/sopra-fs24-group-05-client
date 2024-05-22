import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import {useNavigate} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";
import { User } from "types";

// const Player = ({ user }: { user: User }) => (
//   <div className="player container">
//     <div className="player username">{user.username}</div>
//     <div className="player name">{user.name}</div>
//     <div className="player id">id: {user.id}</div>
//   </div>
// );

// Player.propTypes = {
//   user: PropTypes.object,
// };

const Lobby = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);

  const doCreate = () => {
    navigate("/createTopic");
  }
  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://react.dev/reference/react/useEffect 
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) as User;
    setIsAdmin(currentUser.identity === "ADMIN");
  }, []);

  return (
    <div>
      <div className="lobby container">
        <div className="lobby mensabox">
          <div className="lobby mensabackground"></div>
          <div className="lobby text-wrapper" onClick={() => {localStorage.setItem("currentTopic", "MENSA");navigate(`/topic/${localStorage.getItem("currentTopic")}`);}}>MENSA</div>
        </div>
        <div className="lobby coursebox">
          <div className="lobby coursebackground"></div>
          <div className="lobby text-wrapper" onClick={() => {localStorage.setItem("currentTopic", "COURSE");navigate(`/topic/${localStorage.getItem("currentTopic")}`);}}>COURSE</div>
        </div>
      </div>
      {isAdmin && 
      <div className="lobby create-box">
        <div className="lobby create-text-wrapper" onClick={() => doCreate()}>CREATE</div>
      </div>}
    </div>
  );
};

export default Lobby;