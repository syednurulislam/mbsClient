import React from "react";
import "./logobrand.scss";

const BrandLogo = ({ brandText, className }) => {
  return (
    <div className={className}>
      <span className="icon">
        <img src={require("../../assets/media/images/logo.ico")} alt="logo" />
      </span>
      <span className="text">{brandText}</span>
    </div>
  );
};

BrandLogo.defaultProps = {
  className: "brand",
  brandText: "Mini Banking"
};

export default BrandLogo;
