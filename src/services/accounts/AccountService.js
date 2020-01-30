import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class AccountService {
  static getTransactionPagination = async (
    pageNumber,
    pageSize,
    searchObject
  ) => {
    const {
      fromDate,
      toDate,
      transactionType,
      PropertyName,
      Desc,
      CustomerId
    } = searchObject;

    //console.log(searchObject);

    try {
      const response = await http.get(
        API_BASE_URL + "/AccountTransactions",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            fromDate,
            toDate,
            transactionType,
            PropertyName,
            CustomerId,
            Desc
          }
        }
      );
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static getAccountBalance = async (customerId) => {
    try {
      const response = await http.get(API_BASE_URL + "/getAccountBalance", {
        headers: getHeaders(),
        params: {
            customerId
        }
      });
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static postForDeposit = async (dispatch, deposit)  => {
    try {
      const response = await http.post(
        API_BASE_URL + "/accountDeposit",
        deposit,
        {
          headers: getHeaders(),
        }
      );
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static postForWithdrawal = async (withdrawal) => {
    try {
      const response = await http.post(
        API_BASE_URL + "/accountWithdraw",
        withdrawal,
        {
          headers: getHeaders()
        }
      );
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static postForTransfer = async transfer => {
    try {
      const response = await http.post(
        API_BASE_URL + "/balanceTransfer",
        transfer,
        {
          headers: getHeaders()
        }
      );
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default AccountService;
