import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import LogoBrand from "../logo_brand/LogoBrand";
import NavigationLinks from "../../routes/NavigationLinks";

const { Sider } = Layout;
const { SubMenu } = Menu;

const LeftSideNav = () => {
  //const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const [collapsed, setCollapsed] = useState(false);
  //const [openKeys, setOpenKeys] = useState(["sub1"]);

  const brandLogoClassName = collapsed ? "brand collapsed" : "brand";

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  // const onOpenChange = openMenuKeys => {
  //   const latestOpenKey = openMenuKeys.find(
  //     key => openKeys.indexOf(key) === -1
  //   );
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys({ openKeys: openMenuKeys });
  //   } else {
  //     setOpenKeys({
  //       openKeys: latestOpenKey ? [latestOpenKey] : []
  //     });
  //   }
  // };

  const getMenuItems = item => {
    return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
  };

  const bindSingleMenuItem = item => {
    return (
      <Menu.Item key={item.key}>
        {item.icon}
        <span>{item.title}</span>
        {item.path && <Link to={item.path} />}
      </Menu.Item>
    );
  };

  const bindSubMenuItem = item => {
    return (
      <SubMenu
        key={item.key}
        title={
          <span>
            {item.icon}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.subMenu.map(item => getMenuItems(item))}
      </SubMenu>
    );
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      style={{
        overflow: "auto",
        height: "100vh",
        left: 0
      }}
    >
      <LogoBrand className={brandLogoClassName} />

      {/* <Link to={""}>
        <BrandLogo
          brandText={"Logo"}
          logo={<Icon style={{ color: "#ff0000" }} type="dingding" />}
          className={headerLogoClassName}
        />
      </Link> */}
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineIndent={15}
        //openKeys={openKeys}
        //onOpenChange={onOpenChange}
      >
        {NavigationLinks.map(item => getMenuItems(item))}
      </Menu>
    </Sider>
  );
};

export default LeftSideNav;

// class SideNavbar extends Component {
//   rootSubmenuKeys = ["sub1", "sub2", "sub4"];

//   state = {
//     collapsed: false,
//     openKeys: ["sub1"]
//   };

//   onCollapse = collapsed => {
//     //console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   onOpenChange = openKeys => {
//     const latestOpenKey = openKeys.find(
//       key => this.state.openKeys.indexOf(key) === -1
//     );
//     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//       this.setState({ openKeys });
//     } else {
//       this.setState({
//         openKeys: latestOpenKey ? [latestOpenKey] : []
//       });
//     }
//   };

//   render() {
//     return (
//       <Sider
//         collapsible
//         collapsed={this.state.collapsed}
//         onCollapse={this.onCollapse}
//       >
//         <div className="logo" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           openKeys={this.state.openKeys}
//           onOpenChange={this.onOpenChange}
//         >
//           <Menu.Item key="1">
//             <Icon type="pie-chart" />
//             <span>Option 1</span>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Icon type="desktop" />
//             <span>Option 2</span>
//           </Menu.Item>
//           <SubMenu
//             key="sub1"
//             title={
//               <span>
//                 <Icon type="user" />
//                 <span>User</span>
//               </span>
//             }
//           >
//             <Menu.Item key="3">Tom</Menu.Item>
//             <Menu.Item key="4">Bill</Menu.Item>
//             <Menu.Item key="5">Alex</Menu.Item>
//           </SubMenu>
//           <SubMenu
//             key="sub2"
//             title={
//               <span>
//                 <Icon type="team" />
//                 <span>Team</span>
//               </span>
//             }
//           >
//             <Menu.Item key="6">Team 1</Menu.Item>
//             <Menu.Item key="8">Team 2</Menu.Item>
//           </SubMenu>
//           <Menu.Item key="9">
//             <Icon type="file" />
//             <span>File</span>
//           </Menu.Item>
//         </Menu>
//       </Sider>
//     );
//   }
// }

//export default SideNavbar;
