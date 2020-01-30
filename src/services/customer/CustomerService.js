import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class CustomerService {
  static addCustomer = async customer => {
    try {
      //console.log(customer);
      const response = await http.post(
        API_BASE_URL + "/customers", // /Login/CustomerRegistration
        customer
      );
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static customerSli = async () => {
    try {
      const response = await http.get(API_BASE_URL + "/customerAccountList", {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static getCustomer = async () => {
    try {
      const response = await http.get(API_BASE_URL + "/Customer/GetCustomer", {
        headers: getHeaders()
      });
      //console.log(response);
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };
}

export default CustomerService;
