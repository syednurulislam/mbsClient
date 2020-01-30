import React, { createContext, useReducer } from "react";
import { AuthReducer, initAuthState } from "./auth_context/AuthReducer";
import { loginRequest, logoutRequest } from "./auth_context/AuthActions";

import {
  CustomerReducer,
  initCustomerState
} from "./customer_context/CustomerReducer";
import {
  addCustomer,
  customerSli,
  getCustomer,
  customerFlagReset
} from "./customer_context/CustomerAction";

import {
  AccountReducer,
  initAccountState
} from "./account_context/AccountReducer";

import {
  depositWithdrawalClear,
  getAccountBalance,
  postForDeposit,
  postForWithdrawal,
  postForTransfer,
  getTransactionPagination
} from "./account_context/AccountAction";

import {
  ItemTypeReducer,
  initItemTypeState
} from "./item_type_context/ItemTypeReducer";
import {
  getItemType,
  addItemType,
  updateItemType,
  deleteItemType
} from "./item_type_context/ItemTypeAction";

import { ContextBinder } from "./ContextBinder";
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const authContext = ContextBinder(useReducer(AuthReducer, initAuthState), {
    loginRequest,
    logoutRequest
  });

  const itemTypeContext = ContextBinder(
    useReducer(ItemTypeReducer, initItemTypeState),
    {
      getItemType,
      addItemType,
      updateItemType,
      deleteItemType
    }
  );

  const customerContext = ContextBinder(
    useReducer(CustomerReducer, initCustomerState),
    {
      addCustomer,
      customerSli,
      getCustomer,
      customerFlagReset
    }
  );

  const accountContext = ContextBinder(
    useReducer(AccountReducer, initAccountState),
    {
      depositWithdrawalClear,
      getAccountBalance,
      postForDeposit,
      postForWithdrawal,
      postForTransfer,
      getTransactionPagination
    }
  );

  return (
    <GlobalContext.Provider
      value={{
        authContext,
        customerContext,
        itemTypeContext,
        accountContext
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
