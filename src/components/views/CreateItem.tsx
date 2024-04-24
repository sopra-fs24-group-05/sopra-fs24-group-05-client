import React, { useState } from "react";
import { api, handleError } from "helpers/api";
// import Topic from "models/Topic";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/CreateItem.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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
  isPassword: PropTypes.bool,
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
  isPassword: PropTypes.bool,
};

const CreateItem = () => {
  const navigate = useNavigate();
  const [topicname, setTopicname] = useState<string>(null);
  const [itemname, setItemname] = useState<string>(null);
  const [itemintroduction, setItemintroduction] = useState<string>(null);

  const doCreate = async () => {
    try {
      const commentownerId = localStorage.getItem("usingId");
      const requestBody = JSON.stringify({ commentownerId, topicname, itemname, itemintroduction });
      await api.post("/items", requestBody);
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
    <BaseContainer className="createItem">
      <div className="createItem titlecontainer">
        <FormFieldTitle
          value={`${topicname}`}
        />
      </div>
      <div className="createItem container">
        <div className="createItem form">
          <FormField
            label="Item(No more than 50 words)"
            value={itemname}
            isPassword={true}
            onChange={(n) => setItemname(n)}
          />
          <FormFieldIntroduction
            label="Item Introduction(No more than 250 words)"
            value={itemintroduction}
            isPassword={true}
            onChange={(n) => setItemintroduction(n)}
          />
          <div className="createItem button-container">
            <Button className="back"
              width="100%"
              onClick={() => doBack()}
            >
              BACK
            </Button>
            <Button className="create"
              disabled={!topicname || !itemname || !itemintroduction}
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