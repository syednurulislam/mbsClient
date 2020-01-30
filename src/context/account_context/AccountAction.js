import AccountService from "../../services/accounts/AccountService";
import { Notification } from "../../utility_helper/NotifcationMessage";
import { DefaultErrorMessage } from "../../utility_helper/HelperConstant";

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

export const depositWithdrawalClear = async dispatch => {
  dispatch({ type: Account_Deposit_Withdrawal_Clear });
};

export const getTransactionPagination = async (
  dispatch,
  pageNumber,
  pageSize,
  searchObject
) => {
  dispatch({ type: Get_Account_Transaction_Pagination_Request });

  await AccountService.getTransactionPagination(
    pageNumber,
    pageSize,
    searchObject
  )
    .then(res => {
      dispatch({
        type: Get_Account_Transaction_Pagination_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Get_Account_Transaction_Pagination_Failed
      });
    });
};

export const getAccountBalance = async (dispatch, customerId) => {
  dispatch({ type: Account_Balance_Get_Request });
  await AccountService.getAccountBalance(customerId)
    .then(res => {
      dispatch({
        type: Account_Balance_Get_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Balance_Get_Failed
      });
    });
};

export const postForDeposit = async (dispatch, desposit) => {

  dispatch({ type: Account_Deposit_Request });

  await AccountService.postForDeposit(dispatch,desposit)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Deposit_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Deposit_Failed
      });
    });
};

export const postForWithdrawal = async (dispatch, withdrawal) => {
  dispatch({ type: Account_Withdrawal_Request });

  await AccountService.postForWithdrawal(withdrawal)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Withdrawal_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Withdrawal_Failed
      });
    });
};

export const postForTransfer = async (dispatch, transfer) => {
  dispatch({ type: Account_Transfer_Request });
  await AccountService.postForTransfer(transfer)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Transfer_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Account_Transfer_Failed
      });
    });
};
