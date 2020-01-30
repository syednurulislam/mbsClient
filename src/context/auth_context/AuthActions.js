import AuthService from "../../services/authorization/AuthService";
import { DefaultLoginErrorMessage } from "../../utility_helper/HelperConstant";
import { Notification } from "../../utility_helper/NotifcationMessage";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST
} from "../../utility_helper/ActionTypeInventory";

/* Auth Actions */
export const loginRequest = async (dispatch, user) => {
  console.log("from action", user);
  dispatch({ type: LOGIN_REQUEST });

  await AuthService.loginAsync(user)
    .then(res => {
      // console.log("Action", res);
      localStorage.setItem("auth", JSON.stringify(res.data.data));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultLoginErrorMessage
      );
      dispatch({
        type: LOGIN_FAILED
      });
    });
};

export const logoutRequest = dispatch => {
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.removeItem("auth");
};
