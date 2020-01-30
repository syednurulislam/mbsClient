import React from "react";
import { Icon } from "antd";
import * as NavPath from "./NavigationPath";

const NavigationLinks = [
  {
    key: "dashboard",
    title: "Dashboard",
    path: NavPath.DASHBOARD_PATH,
    icon: <Icon type="pie-chart" />,
    subMenu: null
  },
  {
    key: "accountdeposit",
    title: "Account Transaction",
    path: NavPath.ACCOUNT_DEPOSIT_PATH,
    icon: <Icon type="pie-chart" />,
    subMenu: null
  },
  {
    key: "balancetransfer",
    title: "Balance Transfer",
    path: NavPath.BALANCE_TRANSFER_PATH,
    icon: <Icon type="pie-chart" />,
    subMenu: null
  },
  {
    key: "accountstatement",
    title: "Account Statement",
    path: NavPath.ACCOUNT_STATEMENT_PATH,
    icon: <Icon type="pie-chart" />,
    subMenu: null
  }
];

export default NavigationLinks;
