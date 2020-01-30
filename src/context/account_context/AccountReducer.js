import {
  Account_Balance_Get_Request,
  Account_Balance_Get_Success,
  Account_Balance_Get_Failed,
  Account_Deposit_Request,
  Account_Deposit_Success,
  Account_Deposit_Failed,
  Account_Withdrawal_Request,
  Account_Withdrawal_Success,
  Account_Withdrawal_Failed,
  Account_Deposit_Withdrawal_Clear,
  Account_Transfer_Request,
  Account_Transfer_Success,
  Account_Transfer_Failed,
  Get_Account_Transaction_Pagination_Request,
  Get_Account_Transaction_Pagination_Success,
  Get_Account_Transaction_Pagination_Failed
} from "../../utility_helper/ActionType";

export const initAccountState = {
  transactions: {
    lists: [],
    links: [],
    paging: {}
  },
  specificTransaction: {
    id: "00000000-0000-0000-0000-000000000000"
  },
  accountBalance: [],
  customerSli: [],
  syncNeeded: false,
  depositSuccess: false,
  withdrawalSuccess: false,
  transferSuccess: false,
  loading: false
};

/* AuthReducer */
export const AccountReducer = (state, action) => {
  switch (action.type) {
    case Account_Deposit_Withdrawal_Clear:
      return {
        ...state,
        depositSuccess: false,
        withdrawalSuccess: false,
        transferSuccess: false,
        loading: false,
        syncNeeded: false
      };
    case Get_Account_Transaction_Pagination_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case Get_Account_Transaction_Pagination_Success:
      return {
        ...state,
        transactions: action.payload,
        syncNeeded: true,
        loading: false
      };
    case Get_Account_Transaction_Pagination_Failed:
      return {
        ...state,
        syncNeeded: true,
        loading: false
      };
    case Account_Balance_Get_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case Account_Balance_Get_Success:
      return {
        ...state,
        accountBalance: action.payload,
        syncNeeded: false,
        loading: false
      };
    case Account_Balance_Get_Failed:
      //console.log("Item Type Pagination: ", action.payload);
      return {
        ...state,
        syncNeeded: false,
        loading: false
      };
    case Account_Deposit_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true,
        depositSuccess: false
      };
    case Account_Deposit_Success:
      //console.log(ITEM_TYPE_ADD_SUCCESS, action);
      return {
        ...state,
        accountBalance: action.payload,
        syncNeeded: true,
        loading: false,
        depositSuccess: true
      };
    case Account_Deposit_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        depositSuccess: false
      };
    case Account_Withdrawal_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true,
        withdrawalSuccess: false
      };
    case Account_Withdrawal_Success:
      //console.log(ITEM_TYPE_ADD_SUCCESS, action);
      return {
        ...state,
        accountBalance: action.payload,
        syncNeeded: true,
        loading: false,
        withdrawalSuccess: true
      };
    case Account_Withdrawal_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        withdrawalSuccess: false
      };
    case Account_Transfer_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true,
        transferSuccess: false
      };
    case Account_Transfer_Success:
      return {
        ...state,
        accountBalance: action.payload,
        syncNeeded: true,
        loading: false,
        transferSuccess: true
      };
    case Account_Transfer_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        transferSuccess: false
      };
    default:
      return state;
  }
};
