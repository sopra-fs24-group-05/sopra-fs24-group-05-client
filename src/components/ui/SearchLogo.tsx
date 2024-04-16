import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/SearchLogo.scss";

export const SearchLogo = props => {
  return (
    <svg {...props} className={`search-logo ${props.className ?? ""}`}>
      <g>
        <circle cx="35" cy="40" r="25" fill="white"/>
        <circle cx="35" cy="40" r="20" fill="#262632"/>
        <line x1="50" y1="55" x2="80" y2="85" stroke="white" strokeWidth="8" />
      </g>
    </svg>
  );
};

SearchLogo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};