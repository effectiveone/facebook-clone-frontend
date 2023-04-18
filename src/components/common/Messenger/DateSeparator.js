import React from "react";
import "./DateSeparator.scss";

const DateSeparator = ({ date }) => {
  return (
    <div className="separator-container">
      <div className="separator-line"></div>
      <span className="separator-date">{date}</span>
    </div>
  );
};

export default DateSeparator;
