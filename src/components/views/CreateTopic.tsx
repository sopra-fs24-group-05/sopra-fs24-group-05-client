import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/CreateTopic.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="createTopic field">
      <label className="createTopic label">{props.label}</label>
      <input
        className="createTopic input"
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
    <div className="createTopic field">
      <label className="createTopic label">{props.label}</label>
      <textarea
        className="createTopic inputintroduction"
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

const CreateTopic = () => {
  const navigate = useNavigate();
  const [topicname, setTopicname] = useState<string>(null);
  const [topicIntroduction, settopicIntroduction] = useState<string>(null);

  const doCreate = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) as User;
    const editAllowed = currentUser.identity === "STUDENT";
    try {
      const requestBody = JSON.stringify({ topicName: topicname, description: topicIntroduction, editAllowed: editAllowed });
      await api.post("/topics", requestBody);
      alert("Successfully create!");
      navigate("/lobby");
    } catch (error) {
      alert(
        `Something went wrong during the create: \n${handleError(error)}`
      );
    }
  };

  const doBack = () => {
    alert("Are you sure that you want to go back without saving?");
    navigate("/lobby");
  } 
  

  return (
    <BaseContainer className="createTopic">
      <div className="createTopic container">
        <div className="createTopic form">
          <FormField
            label="Topic(No more than 50 words)"
            value={topicname}
            onChange={(n) => setTopicname(n)}
          />
          <FormFieldIntroduction
            label="Topic Introduction(No more than 250 words)"
            value={topicIntroduction}
            onChange={(n) => settopicIntroduction(n)}
          />
          <div className="createTopic button-container">
            <Button className="back"
              width="100%"
              onClick={() => doBack()}
            >
              BACK
            </Button>
            <Button className="create"
              disabled={!topicname||!topicIntroduction}
              width="100%"
              onClick={() => doCreate()}
            >
              CREATETOPIC
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
export default CreateTopic;