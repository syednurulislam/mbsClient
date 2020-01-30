import http from "../../utility_helper/HttpService";
import { config } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class AuthService {
  static login = credential => {
    return http.post(API_BASE_URL + "/login", credential);
  };

  static loginAsync = async credential => {
    try {
      console.log("loginAsync", credential);
      const response = await http.post(API_BASE_URL + "/login", credential);
      //console.log(response);
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static forgetPassword = user => {
    return http.post(API_BASE_URL + "/Login/ForgetPassword", user);
  };
}

export default AuthService;
