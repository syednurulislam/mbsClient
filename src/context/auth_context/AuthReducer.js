import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST
} from "../../utility_helper/ActionTypeInventory";

/* Auth State */
const auth = JSON.parse(localStorage.getItem("auth"));
export const initAuthState = auth || {
  isLogin: false,
  token: "",
  user: null,
  loading: false,
  accountBalance: null
};

/* AuthReducer */
export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      console.log(LOGIN_SUCCESS, action);
      return {
        ...state,
        isLogin: action.payload.isLogin,
        user: action.payload.user,
        accountBalance: action.payload.accountBalance,
        loading: false
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};
