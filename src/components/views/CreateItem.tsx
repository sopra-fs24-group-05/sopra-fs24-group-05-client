import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import Topic from "models/Topic";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/CreateItem.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
// import {Topic} from "types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldTitle = (props) => {
  return (
    <h1>
      {props.value}
    </h1>
  );
};

const FormFieldtopicIntroduction = (props) => {
  return (
    <div className="createItem field">
      <label className="createItem label">{props.label}</label>
      <textarea
        readOnly={true}
        className="createItem outputintroduction"
        rows="4"
        cols="50"
        value={props.value}
      />
    </div>
  );
};
FormFieldtopicIntroduction.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

FormFieldTitle.propTypes = {
  value: PropTypes.string,
}
const FormField = (props) => {
  return (
    <div className="createItem field">
      <label className="createItem label">{props.label}</label>
      <input
        className="createItem input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const FormFieldIntroduction = (props) => {
  return (
    <div className="createItem field">
      <label className="createItem label">{props.label}</label>
      <textarea
        className="createItem inputintroduction"
        placeholder="enter here.."
        rows="4"
        cols="50"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormFieldIntroduction.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const CreateItem = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic>(null);
  const [topicname, setTopicname] = useState<string>(localStorage.getItem("currentTopic"));
  const [topicIntroduction, settopicIntroduction] = useState<string>(null);
  const [itemname, setItemname] = useState<string>(null);
  const [itemIntroduction, setitemIntroduction] = useState<string>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const topicName = localStorage.getItem("currentTopic");
        //This page will be reached only by clicking the item you want to comment
        const responseTopic = await api.get(`/topics/topicName/${topicName}`);

        // Get the returned item 
        setTopic(responseTopic.data);
        settopicIntroduction(responseTopic.data.description);
        // // This is just some data for you to see what is available.
        // // Feel free to remove it.
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);

        // // See here to get more data.
        // console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the topic: \n${handleError(
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

  const doCreate = async () => {
    try {
      const itemTopicId = localStorage.getItem("currentTopicId");
      const requestBody = JSON.stringify({ topicId: itemTopicId, itemName: itemname, content: itemIntroduction });
      await api.post(`/items/byTopicId/${itemTopicId}`, requestBody);
      alert("Successfully create!");
      navigate(`/topic/${localStorage.getItem("currentTopic")}`);
    } catch (error) {
      alert(
        `Something went wrong during the create: \n${handleError(error)}`
      );
    }
  };

  const doBack = () => {
    navigate(`/topic/${localStorage.getItem("currentTopic")}`);
  } 
  

  return (
    <BaseContainer className="createItem">
      <div className="createItem titlecontainer">
        <FormFieldTitle
          value={`${topicname}`}
        />
      </div>
      <div className="createItem container">
        <div className="createItem form">
          <FormFieldtopicIntroduction
            label="Topic Introduction"
            value={topicIntroduction}
          />
          <FormField
            label="Item(No more than 50 words)"
            value={itemname}
            onChange={(n) => setItemname(n)}
          />
          <FormFieldIntroduction
            label="Item Introduction(No more than 250 words)"
            value={itemIntroduction}
            onChange={(n) => setitemIntroduction(n)}
          />
          <div className="createItem button-container">
            <Button className="back"
              width="100%"
              onClick={() => doBack()}
            >
              BACK
            </Button>
            <Button className="create"
              disabled={!itemname || !itemIntroduction }
              width="100%"
              onClick={() => doCreate()}
            >
              CREATE
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default CreateItem;