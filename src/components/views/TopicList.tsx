import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
// import Topic from "models/Topic";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/TopicList.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Topic } from "types";

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

const TopicList = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>(null);
  const [topicname, setTopicname] = useState<string>(localStorage.getItem("currentTopic"));
  let content = <ul/>;

  useEffect(() => {
    async function fetchData() {
      try {
        const responsetopics = await api.get("/topics");
        setTopics(responsetopics.data);
        console.log(responsetopics.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the topics: \n${handleError(
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
    navigate("/lobby");
  } 
  
  const doCreateTopic = () => {
    navigate("/createTopic");
  } 

  const doTopic = (topic) => {
    localStorage.setItem("currentTopic", topic.topicName);
    navigate(`/topic/${topic.topicName}`);
  }

  return (
    <BaseContainer className="topiclist">
      <div className="topic titlecontainer">
        <h1>All Topics</h1>
      </div>
      <div className="topiclist displaycontainer">
        <div className="topiclist displayform">
          <ul className="topiclist list">
            {topics ? topics.map((topic, index) => (
              <li 
                key={index}
                onClick={() => doTopic(topic)}
              >
                {topic.topicName}
              </li>
            )) : <div>Loading...</div>}
          </ul>
        </div>
      </div> 
      <div className="topiclist button-containerout">
        <Button className="back"
          width="20%"
          onClick={() => doBack()}
        >
          BACK
        </Button>
        <Button className="back"
          width="20%"
          onClick={() => doCreateTopic()}
        >
          Create Topic
        </Button>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default TopicList;