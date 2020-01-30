import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class StoreTypeService {
  static getStoreType = async (pageNumber, pageSize, searchObject) => {
    const { storeName, storeCode, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/StoreType/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            storeName,
            storeCode,
            recordStatus,
            Desc
          }
        }
      );
      //console.log(response);
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static addStoreType = async storeType => {
    try {
      const response = await http.post(API_BASE_URL + "/StoreType", storeType, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateStoreType = async storeType => {
    try {
      const response = await http.put(API_BASE_URL + "/StoreType", storeType, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteStoreType = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/StoreType?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default StoreTypeService;
