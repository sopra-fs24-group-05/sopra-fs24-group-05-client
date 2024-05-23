import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Topic.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Item } from "types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
// const FormFieldDisplay = (props) => {
//   return (
//     <div className="topic field">
//       <label className="topic label">{props.label}</label>
//       <textarea readOnly={true}
//         className="topic display"
//         rows="3"
//         cols="50"
//         value={props.value}
        
//       />
//     </div>
//   );
// };
// FormFieldDisplay.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string,
// };
const FormFieldTitle = (props) => {
  return (
    <h1>
      {props.value}
    </h1>
  );
};
FormFieldTitle.propTypes = {
  value: PropTypes.string,
};

const Topic = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>(null);
  const [topicname, setTopicname] = useState<string>(localStorage.getItem("currentTopic"));
  const [sortType, setSortType] = useState<string>("default");
  const [currentUser, setCurrentUser] = useState<User>(JSON.parse(localStorage.getItem("currentUser")) as User);
  let content = <ul/>;
  const identity = currentUser.identity;

  useEffect(() => {
    async function fetchData() {
      try {
        const topicName = localStorage.getItem("currentTopic");
        //This page will be reached only by clicking the item you want to comment
        const responseTopic = await api.get(`/topics/topicName/${topicName}`);
        localStorage.setItem("currentTopicId", responseTopic.data.id);
        const responseitems = await api.get(`/items/byTopicName/${topicName}`);
        // await new Promise((resolve) => setTimeout(resolve, 500));
        // Get the returned item 
        setItems(responseitems.data);
        console.log(responseitems.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the items: \n${handleError(
            error
          )}`
        );
      //   console.error("Details:", error);
      //   alert(
      //     "Something went wrong while fetching the item! See the console for details."
      //   );
      // }
      }
    }
    fetchData();
  }, []);
 
  useEffect(() => {
    const fetchSortedData = async () => {
      try {
        if (sortType === "popularity") {
          const responseitems = await api.get(`/items/sortedByCommentCount/${localStorage.getItem("currentTopicId")}`);
          setItems(responseitems.data);
          console.log(responseitems.data);
        } else if (sortType === "default") {
          const responseitems = await api.get(`/items/byTopicName/${topicname}`);
          setItems(responseitems.data);
          console.log(responseitems.data);
        } else if (sortType === "score") {
          const responseitems = await api.get(`/items/sortedByScore/${localStorage.getItem("currentTopicId")}`);
          setItems(responseitems.data);
          console.log(responseitems.data);
        }
      } catch (error) {
        alert(
          "Something went wrong while fetching the item! See the console for details."
        );
      }
    }
    
    fetchSortedData();
  }, [sortType]);

  const doBack = () => {
    localStorage.removeItem("currentTopic");
    localStorage.removeItem("currentTopicId");
    navigate("/lobby");
  } 
  
  const doCreateItem = () => {
    navigate("/CreateItem");
  } 

  const doComment = (item) => {
    localStorage.setItem("currentItemId", item.itemId);
    navigate(`/comment/${item.itemId}`);
  }

  const doDeleteTopic = (topicName) => {
    try {
      if (localStorage.getItem("currentTopic") === "MENSA" || localStorage.getItem("currentTopic") === "COURSE") {
        alert("Mandatory topic cannot be deleted!");
        
        return;
      }
      api.delete(`/topics/topicName/${topicName}`);
      alert("Successfully Delete!");
      localStorage.removeItem("currentTopic");
      localStorage.removeItem("currentTopicId");
      navigate("/topicList");
    } catch (error) {
      alert(
        "Something went wrong while deleting the topic! See the console for details."
      );
    }
  }

  return (
    <BaseContainer className="topic">
      <div className="topic titlecontainer">
        <FormFieldTitle
          value={`${topicname}`}
        />
        <select
          className="topic select"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >  
          <option value="default">Default</option>
          <option value="popularity">Popularity</option>
          <option value="score">Score</option>
        </select>
      </div>
      <div className="topic displaycontainer">
        <div className="topic displayform">
          <ul className="topic list">
            {items ? items.map((item, index) => (
              <li 
                key={index}
                onClick={() => doComment(item)}
              >
                {item.itemName}
              </li>
            )) : <div>Loading...</div>}
          </ul>
        </div>
      </div> 
      <div className="topic button-containerout">
        <Button className="back"
          width="20%"
          onClick={() => doBack()}
        >
          BACK
        </Button>
        <Button className="back"
          width="20%"
          onClick={() => doCreateItem()}
        >
          Create Item
        </Button>
        {identity === "ADMIN" && <Button className="delete"
          width="20%"
          onClick={() => doDeleteTopic(localStorage.getItem("currentTopic"))}
        >
          Delete Topic
        </Button>}
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Topic;