import { lazy } from "react";
import * as NavPath from "./NavigationPath";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const CustomerInfo = lazy(() => import("../pages/customer/CustomerInfo"));

const AccountDeposit = lazy(() => import("../pages/account/AccountDeposit"));
const AccountOpening = lazy(() => import("../pages/account/AccountOpening"));
const BalanceTransfer = lazy(() => import("../pages/account/BalanceTransfer"));
const WithdralAmount = lazy(() => import("../pages/account/WithdralAmount"));
const CustomerProfile = lazy(() => import("../pages/customer/CustomerProfile"));
const AccountStatement = lazy(() =>
  import("../pages/reports/AccountStatement")
);

const Routes = [
  {
    path: NavPath.DASHBOARD_PATH,
    exact: true,
    isPrivate: false,
    pageName: "Dashboard",
    component: Dashboard
  },
  {
    path: NavPath.CUSTOMER_INFO_PATH,
    exact: true,
    isPrivate: false,
    pageName: "CustomerInfo",
    component: CustomerInfo
  },
  {
    path: NavPath.CUSTOMER_PROFILE_PATH,
    exact: true,
    isPrivate: false,
    pageName: "CustomerProfile",
    component: CustomerProfile
  },
  {
    path: NavPath.ACCOUNT_DEPOSIT_PATH,
    exact: true,
    isPrivate: false,
    pageName: "AccountDeposit",
    component: AccountDeposit
  },
  {
    path: NavPath.ACCOUNT_OPENING_PATH,
    exact: true,
    isPrivate: false,
    pageName: "AccountOpening",
    component: AccountOpening
  },
  {
    path: NavPath.BALANCE_TRANSFER_PATH,
    exact: true,
    isPrivate: false,
    pageName: "BalanceTransfer",
    component: BalanceTransfer
  },
  {
    path: NavPath.WITHDRAL_AMOUNT_PATH,
    exact: true,
    isPrivate: false,
    pageName: "WithdralAmount",
    component: WithdralAmount
  },
  {
    path: NavPath.ACCOUNT_STATEMENT_PATH,
    exact: true,
    isPrivate: false,
    pageName: "AccountStatement",
    component: AccountStatement
  }
];

export default Routes;
