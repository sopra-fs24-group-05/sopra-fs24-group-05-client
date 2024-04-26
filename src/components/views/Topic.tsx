import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
// import Topic from "models/Topic";
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
  let content = <ul/>;

  useEffect(() => {
    async function fetchData() {
      try {
        const topicId = localStorage.getItem("currentTopicId");
        //This page will be reached only by clicking the item you want to comment
        const responseitems = await api.get(`/items/${topicId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Get the returned item 
        setItems(responseitems.data);
        console.log(responseitems);
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
 
  const doBack = () => {
    localStorage.removeItem("currentTopic");
    localStorage.removeItem("currentTopicId");
    navigate("/lobby");
  } 
  
  const doCreateItem = () => {
    navigate("/CreateItem");
  } 

  const doComment = (item) => {
    localStorage.setItem("currentItem", item.itemname);
    localStorage.setItem("currentItemId", item.id);
    navigate(`/comment/${item.id}`);
  }

  return (
    <BaseContainer className="topic">
      <div className="topic titlecontainer">
        <FormFieldTitle
          value={`${topicname}`}
        />
      </div>
      <div className="topic displaycontainer">
        <div className="topic displayform">
          <ul className="topic list">
            {items ? items.map((item, index) => (
              <li 
                key={index}
                onClick={() => doComment(item)}
              >
                {item.itemname}
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
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Topic;