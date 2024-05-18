import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/ReminderLogo.scss";

export const ReminderLogo = props => {
  return (
    <svg {...props} className={`reminder-logo ${props.className ?? ""}`}>
      <g>
        <circle cx="10" cy="10" r="10" fill="red"/>
      </g>
    </svg>
  );
};

ReminderLogo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};