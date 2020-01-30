import http from "../../utility_helper/HttpService";
import { config, getHeaders } from "../../utility_helper/HelperConstant";

const { API_BASE_URL } = config;

class DosageFormService {
  static getDosageForm = async (pageNumber, pageSize, searchObject) => {
    const { dosageFormName, description, recordStatus, Desc } = searchObject;

    try {
      const response = await http.get(
        API_BASE_URL + "/DosageForm/GetWithPagination",
        {
          headers: getHeaders(),
          params: {
            pageNumber,
            pageSize,
            dosageFormName,
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

  static addDosageForm = async dosageForm => {
    try {
      const response = await http.post(API_BASE_URL + "/DosageForm", dosageForm, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static updateDosageForm = async dosageForm => {
    try {
      const response = await http.put(API_BASE_URL + "/DosageForm", dosageForm, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };

  static deleteDosageForm = async id => {
    try {
      const response = await http.delete(API_BASE_URL + "/DosageForm?id=" + id, {
        headers: getHeaders()
      });
      return response;
    } catch (error) {
      let err = error.response;
      throw err;
    }
  };
}

export default DosageFormService;
