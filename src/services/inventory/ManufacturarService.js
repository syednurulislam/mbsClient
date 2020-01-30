import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class ManufacturarService {
  static getManufacturar = async (pageNumber, pageSize, searchObject) => {
    const { manufacturarName, manufacturarLocalAgentName, description, contactNumber, conatctEmail, address, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/Manufacturar/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            manufacturarName,
            manufacturarLocalAgentName,
            description,
            contactNumber,
            conatctEmail,
            address,
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

  static addManufacturar = async manufacturar => {
    try {
      const response = await http.post(API_BASE_URL + "/Manufacturar", manufacturar, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateManufacturar = async manufacturar => {
    try {
      const response = await http.put(API_BASE_URL + "/Manufacturar", manufacturar, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteManufacturar = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/Manufacturar?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default ManufacturarService;
