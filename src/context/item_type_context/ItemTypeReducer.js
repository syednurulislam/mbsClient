import {
  ITEM_TYPE_GET_REQUEST,
  ITEM_TYPE_GET_SUCCESS,
  ITEM_TYPE_GET_FAILED,
  ITEM_TYPE_ADD_REQUEST,
  ITEM_TYPE_ADD_SUCCESS,
  ITEM_TYPE_ADD_FAILED,
  ITEM_TYPE_UPDATE_REQUEST,
  ITEM_TYPE_UPDATE_SUCCESS,
  ITEM_TYPE_UPDATE_FAILED,
  ITEM_TYPE_DELETE_REQUEST,
  ITEM_TYPE_DELETE_SUCCESS,
  ITEM_TYPE_DELETE_FAILED
} from "../../utility_helper/ActionTypeInventory";

export const initItemTypeState = {
  itemTypes: {
    lists: [],
    links: [],
    paging: {}
  },
  specificItemType: {
    id: "00000000-0000-0000-0000-000000000000",
    itemTypeName: "",
    description: "",
    recordStatus: true
  },
  itemTypeSli: [],
  syncNeeded: false,
  loading: false
};

/* AuthReducer */
export const ItemTypeReducer = (state, action) => {
  switch (action.type) {
    case ITEM_TYPE_GET_REQUEST:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case ITEM_TYPE_GET_SUCCESS:
      //console.log(ITEM_TYPE_GET_SUCCESS, action);
      return {
        ...state,
        itemTypes: action.payload,
        syncNeeded: true,
        loading: false
      };
    case ITEM_TYPE_GET_FAILED:
      //console.log("Item Type Pagination: ", action.payload);
      return {
        ...state,
        syncNeeded: true,
        loading: false
      };
    case ITEM_TYPE_ADD_REQUEST:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case ITEM_TYPE_ADD_SUCCESS:
      //console.log(ITEM_TYPE_ADD_SUCCESS, action);
      return {
        ...state,
        itemTypes: {
          ...state.itemTypes,
          lists: [...state.itemTypes.lists, action.payload]
        },
        syncNeeded: true,
        loading: false
      };
    case ITEM_TYPE_ADD_FAILED:
      return {
        ...state,
        syncNeeded: false,
        loading: false
      };
    case ITEM_TYPE_UPDATE_REQUEST:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case ITEM_TYPE_UPDATE_SUCCESS:
      //console.log(ITEM_TYPE_UPDATE_SUCCESS, action);
      return {
        ...state,
        itemTypes: {
          ...state.itemTypes,
          lists: state.itemTypes.lists.map(itype =>
            itype.id === action.payload.id ? action.payload : itype
          )
        },
        syncNeeded: true,
        loading: false
      };
    case ITEM_TYPE_UPDATE_FAILED:
      return {
        ...state,
        syncNeeded: false,
        loading: false
      };
    case ITEM_TYPE_DELETE_REQUEST:
      return {
        ...state,
        syncNeeded: false,
        loading: true
      };
    case ITEM_TYPE_DELETE_SUCCESS:
      console.log(ITEM_TYPE_UPDATE_SUCCESS, action);
      return {
        ...state,
        itemTypes: {
          ...state.itemTypes,
          lists: state.itemTypes.lists.filter(
            itype => itype.id !== action.payload
          )
        },
        syncNeeded: true,
        loading: false
      };
    case ITEM_TYPE_DELETE_FAILED:
      return {
        ...state,
        syncNeeded: false,
        loading: false
      };
    default:
      return state;
  }
};
