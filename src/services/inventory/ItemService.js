import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class ItemService {
  static getItem = async (pageNumber, pageSize, searchObject) => {
    const { itemName, description, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/Item/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            itemName,
            description,
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

  static addItem = async item => {
    try {
      const response = await http.post(API_BASE_URL + "/Item", item, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateItem = async item => {
    try {
      const response = await http.put(API_BASE_URL + "/Item", item, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteItem = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/Item?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default ItemService;
