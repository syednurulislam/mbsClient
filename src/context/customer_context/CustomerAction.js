import CustomerService from "../../services/customer/CustomerService";
import { Notification } from "../../utility_helper/NotifcationMessage";
import { DefaultErrorMessage } from "../../utility_helper/HelperConstant";

import {
  Customer_Add_Request,
  Customer_Add_Success,
  Customer_Add_Failed,
  Customer_Sli_Request,
  Customer_Sli_Success,
  Customer_Sli_Failed,
  Get_Customer_Request,
  Get_Customer_Success,
  Get_Customer_Failed,
  Customer_Flag_Reset
} from "../../utility_helper/ActionType";

export const addCustomer = async (dispatch, customer) => {
  dispatch({ type: Customer_Add_Request });

  await CustomerService.addCustomer(customer)
    .then(res => {
      console.log("res.data.notification=> ", res.data.notification);
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Customer_Add_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.Notification : DefaultErrorMessage
      );
      dispatch({
        type: Customer_Add_Failed
      });
    });
};

export const customerSli = async dispatch => {
  dispatch({ type: Customer_Sli_Request });

  await CustomerService.customerSli()
    .then(res => {
      dispatch({
        type: Customer_Sli_Success,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Customer_Sli_Failed
      });
    });
};

export const getCustomer = async dispatch => {
  dispatch({ type: Get_Customer_Request });

  await CustomerService.getCustomer()
    .then(res => {
      dispatch({
        type: Get_Customer_Success,
        payload: res.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: Get_Customer_Failed
      });
    });
};

export const customerFlagReset = async dispatch => {
  dispatch({
    type: Customer_Flag_Reset,
    payload: ""
  });
};
