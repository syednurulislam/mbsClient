import ItemTypeService from "../../services/inventory/ItemTypeService";
import { Notification } from "../../utility_helper/NotifcationMessage";
import { DefaultErrorMessage } from "../../utility_helper/HelperConstant";

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

export const getItemType = async (
  dispatch,
  pageNumber,
  pageSize,
  searchObject
) => {
  dispatch({ type: ITEM_TYPE_GET_REQUEST });

  await ItemTypeService.getItemType(pageNumber, pageSize, searchObject)
    .then(res => {
      // Notification(
      //   res !== undefined ? res.data.notification : DefaultErrorMessage
      // );
      dispatch({
        type: ITEM_TYPE_GET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: ITEM_TYPE_GET_FAILED
      });
    });
};

export const addItemType = async (dispatch, itemType) => {
  dispatch({ type: ITEM_TYPE_ADD_REQUEST });

  await ItemTypeService.addItemType(itemType)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: ITEM_TYPE_ADD_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: ITEM_TYPE_ADD_FAILED
      });
    });
};

export const updateItemType = async (dispatch, itemType) => {
  dispatch({ type: ITEM_TYPE_UPDATE_REQUEST });

  await ItemTypeService.updateItemType(itemType)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );

      dispatch({
        type: ITEM_TYPE_UPDATE_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: ITEM_TYPE_UPDATE_FAILED
      });
    });
};

export const deleteItemType = async (dispatch, id) => {
  dispatch({ type: ITEM_TYPE_DELETE_REQUEST });

  await ItemTypeService.deleteItemType(id)
    .then(res => {
      Notification(
        res !== undefined ? res.data.notification : DefaultErrorMessage
      );

      dispatch({
        type: ITEM_TYPE_DELETE_SUCCESS,
        payload: id
      });
    })
    .catch(err => {
      Notification(
        err !== undefined ? err.data.notification : DefaultErrorMessage
      );
      dispatch({
        type: ITEM_TYPE_DELETE_FAILED
      });
    });
};
