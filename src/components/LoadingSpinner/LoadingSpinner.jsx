import React from "react";
import { FadeLoader } from "react-spinners";
import "./LoadingSpinner.scss"; 

const LoadingSpinner = ({
  loading,
  size = 80,
  color = "#0a66c2",
  children,
}) => {
  return loading ? (
    <div className="loading-container ">
      <FadeLoader size={size} color={color} />
    </div>
  ) : (
    children
  );
};

export default LoadingSpinner;
