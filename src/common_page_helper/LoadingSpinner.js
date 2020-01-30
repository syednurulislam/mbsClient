import React from "react";
import { Spin } from "antd";

const LoadingSpinner = ({ height, width }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height,
    width
  };

  return (
    <div style={style}>
      <Spin size="large" />
    </div>
  );
};

LoadingSpinner.defaultProps = {
  width: "100%",
  height: "100%"
};

export default LoadingSpinner;
