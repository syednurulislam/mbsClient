import React from "react";
import { Layout } from "antd";
import HeaderRightNav from "../header_nav/HeaderRightNav";

import "./site_header.scss";

const { Header } = Layout;

const SiteHeader = () => {
  return (
    <Header className="site_header">
      <HeaderRightNav />
    </Header>
  );
};

export default SiteHeader;
