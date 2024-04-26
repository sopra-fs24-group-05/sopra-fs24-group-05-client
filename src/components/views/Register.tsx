import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Register.scss";
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
    <div className="register field">
      <label className="register label">{props.label}</label>
      <input
        className="register input"
        placeholder="enter here.."
        value={props.value}
        type={props.isPassword ? "password" : "text"}
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

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [token, setToken] = useState<string>(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username:username, password:password, token:token });
      await api.post("/users/registration", requestBody);

      alert("Register Done!");
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the registration: \n${handleError(error)}`
      );
    }
  };

  const backToLogin = () => {
    navigate("/login");
  }

  return (
    <BaseContainer className="register">
      <div className="register container">
        <div className="register form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Password"
            value={[password]}
            isPassword={true}
            onChange={(n) => setPassword(n)}
          />
          <FormField
            label="Register Code (optional)"
            value={token}
            onChange={(n) => setToken(n)}
          />
          <div className="register button-container">
            <Button className="register"
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Confirm
            </Button>
            <Button className="register"
              width="100%"
              onClick={() => backToLogin()}
            >
              Back
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
export default Register;