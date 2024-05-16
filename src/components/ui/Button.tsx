import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";

export const Button = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </button>
);


Button.propTypes = {
  width: PropTypes.number,
  style: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};


export const ReplyButton = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`reply-button ${props.className}`}>
    {props.children}
  </button>
);


ReplyButton.propTypes = {
  width: PropTypes.number,
  style: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};