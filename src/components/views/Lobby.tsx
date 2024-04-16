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

  const logout = async () => {
    try {
      const requestBody = JSON.stringify({ token })
      api.post("/login", requestBody);

      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the logout: \n${handleError(error)}`
      );
    }
  };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://react.dev/reference/react/useEffect 
  // useEffect(() => {
  //   // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  //   async function fetchData() {
  //     try {
  //       const response = await api.get("/users");

  //       // delays continuous execution of an async operation for 1 second.
  //       // This is just a fake async call, so that the spinner can be displayed
  //       // feel free to remove it :)
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Get the returned users and update the state.
  //       setUsers(response.data);

  //       // This is just some data for you to see what is available.
  //       // Feel free to remove it.
  //       console.log("request to:", response.request.responseURL);
  //       console.log("status code:", response.status);
  //       console.log("status text:", response.statusText);
  //       console.log("requested data:", response.data);

  //       // See here to get more data.
  //       console.log(response);
  //     } catch (error) {
  //       console.error(
  //         `Something went wrong while fetching the users: \n${handleError(
  //           error
  //         )}`
  //       );
  //       console.error("Details:", error);
  //       alert(
  //         "Something went wrong while fetching the users! See the console for details."
  //       );
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="lobby container">
        <div className="lobby box">
          <div className="lobby mensa-image"></div>
          <div className="lobby text-wrapper">MENSA</div>
        </div>
        <div className="lobby box">
          <div className="lobby course-image"></div>
          <div className="lobby text-wrapper">COURSE</div>
        </div>
      </div>
      <div className="lobby create-box">
        <div className="lobby create-text-wrapper">CREATE</div>
      </div>
    </div>
  );
};

export default Lobby;