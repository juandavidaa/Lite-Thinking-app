import React from "react";

const Alert = (props) => {
  return (
    <div
      className={`alert alert-${props.type} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{props.type.toUpperCase()}!</strong> {props.msg}
      <button
        type="button"
        className="btn-close"
        onClick={props.close}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
