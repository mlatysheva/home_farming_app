import React from "react";
import "./Spinner.scss";

/**
 * @description A spinner component to be used when data is loading
 * @returns {JSX.Element}
 */
export const Spinner: React.FC = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};