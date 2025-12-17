import React from "react";

function Notification({ message, type = "success" }) {
  if (!message) {
    return null;
  }

  return <div className={`notification ${type}`}>{message}</div>;
}

export default Notification;
