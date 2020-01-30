import axios from "axios";
import { message } from "antd";
import { LOGIN_PATH } from "../routes/NavigationPath";
import { getTokenExpirationValidity } from "../utility_helper/Utility";

function RedirectToLoginPage() {
  window.location.replace(LOGIN_PATH);
}

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    if (!getTokenExpirationValidity()) {
      console.log("I am before request and token time expire.");
      message.info(
        "Login Time Expire. Redirect To Login Page Within 2 Seconds."
      );
      window.setTimeout(RedirectToLoginPage, 2000);
      return false;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
