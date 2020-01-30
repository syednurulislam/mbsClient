import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";

import { CUSTOMER_PROFILE_PATH } from "../../routes/NavigationPath";
import { GlobalContext } from "../../context/GlobalContextProvider";

import "../header/site_header.scss";

const HeaderRightNav = () => {
  const { authContext } = useContext(GlobalContext);

  const logOut = () => {
    authContext.logoutRequest();
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={CUSTOMER_PROFILE_PATH}>Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={logOut}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className="drop_down">
      <div style={{ minWidth: "150px", textAlign: "right" }}>
        <span>{authContext.user.userName}</span> &nbsp;
        <Avatar size="large" icon="user" className="ant-dropdown-link" />
      </div>
    </Dropdown>
  );
};

export default HeaderRightNav;
