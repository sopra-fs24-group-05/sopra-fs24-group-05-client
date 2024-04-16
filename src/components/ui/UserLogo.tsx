import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/UserLogo.scss";

export const UserLogo = props => {
  return (
    <svg {...props} className={`user-logo ${props.className ?? ""}`}>
      <g>
        <circle cx="50" cy="50" r="40" fill="white"/>
        <circle cx="50" cy="50" r="35" fill="#262632"/>
        <circle cx="50" cy="35" r="13" fill="white"/>
        <circle cx="50" cy="35" r="8" fill="#262632"/>
        <ellipse cx="50" cy="65" rx="27" ry="17" fill="white"/>
        <ellipse cx="50" cy="65" rx="22" ry="12" fill="#262632" />
      </g>
    </svg>
  );
};

UserLogo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};