import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class CategoryService {
  static CategoryTree = async () => {
    try {
      const response = await http.get(API_BASE_URL + "/Category/CategoryTree", {
        headers: getHeaders(),
        params: {}
      });
      //console.log(response);
      return response;
    } catch (error) {
      //console.log("catch", error.response);
      let err = error.response;
      throw err;
    }
  };

  static GetWithPagination = async (pageNumber, pageSize, searchObject) => {
    const { categoryName, description, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/Category/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            categoryName,
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

  static addCategory = async category => {
    try {
      const response = await http.post(API_BASE_URL + "/Category", category, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateCategory = async category => {
    try {
      const response = await http.put(API_BASE_URL + "/Category", category, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteCategory = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/Category?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default CategoryService;
