import {
  Customer_Add_Request,
  Customer_Add_Success,
  Customer_Add_Failed,
  Customer_Sli_Request,
  Customer_Sli_Success,
  Customer_Sli_Failed,
  Get_Customer_Request,
  Get_Customer_Success,
  Get_Customer_Failed,
  Customer_Flag_Reset
} from "../../utility_helper/ActionType";

export const initCustomerState = {
  customers: {
    lists: [],
    links: [],
    paging: {}
  },
  specificCustomer: {
    id: "00000000-0000-0000-0000-000000000000",
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    customerType: "",
    dateOfBirth: "",
    country: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    personalCode: "",
    password: ""
  },
  customerSliList: [],
  syncNeeded: false,
  success: false,
  loading: false
};

/* AuthReducer */
export const CustomerReducer = (state, action) => {
  switch (action.type) {
    case Customer_Flag_Reset:
      return {
        ...state,
        success: false,
        syncNeeded: false,
        loading: false
      };
    case Customer_Add_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        success: false
      };
    case Customer_Add_Success:
      //console.log(ITEM_TYPE_ADD_SUCCESS, action);
      return {
        ...state,
        specificCustomer: action.payload,
        syncNeeded: true,
        loading: false,
        success: true
      };
    case Customer_Add_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        success: false
      };
    case Customer_Sli_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case Customer_Sli_Success:
      //console.log("Customer_Sli_Success", action.payload);
      return {
        ...state,
        customerSliList: action.payload,
        syncNeeded: false,
        loading: false,
        success: false
      };
    case Customer_Sli_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        success: false
      };
    case Get_Customer_Request:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case Get_Customer_Success:
      //console.log("Customer_Sli_Success", action.payload);
      return {
        ...state,
        specificCustomer: action.payload,
        syncNeeded: false,
        loading: false,
        success: false
      };
    case Get_Customer_Failed:
      return {
        ...state,
        syncNeeded: false,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};
