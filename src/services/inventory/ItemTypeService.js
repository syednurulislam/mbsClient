import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class ItemTypeService {
  static getItemType = async (pageNumber, pageSize, searchObject) => {
    const { itemTypeName, description, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/ItemType/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            itemTypeName,
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

  static addItemType = async itemType => {
    try {
      const response = await http.post(API_BASE_URL + "/ItemType", itemType, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateItemType = async itemType => {
    try {
      const response = await http.put(API_BASE_URL + "/ItemType", itemType, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteItemType = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/ItemType?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default ItemTypeService;
