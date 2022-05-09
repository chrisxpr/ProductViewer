import { shoppingClient } from '../../services/shoppingClient';
import * as actionType from '../constants/actionTypes';

export const addCartItemAction = (cartItem, dispatch) => {
  try {
    dispatch({
      type: actionType.ADDITEM_TO_CART,
      payload: cartItem,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItemAction = (cartItem, dispatch) => {
  try {
    dispatch({
      type: actionType.DELETEITEM_FROM_CART,
      payload: cartItem,
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeCountryAction = (countryCode, dispatch) => {
  try {
    dispatch({
      type: actionType.CHANGE_COUNTRY,
      payload: countryCode,
    });
  } catch (err) {
    console.log(err);
  }
};

export const calculateShippingAction = async (cartItems, dispatch) => {
  try {
    dispatch({
      type: actionType.CALCULATE_SHIPPING_START,
    });

    const shippingRequest = {
      orderItems: cartItems,
    };

    const { data } = await shoppingClient.calculateShipping(shippingRequest);

    if (data && !data.inError) {
      dispatch({
        type: actionType.CALCULATE_SHIPPING_COMPLETE,
        payload: data,
      });
    } else {
      dispatch({
        type: actionType.CALCULATE_SHIPPING_FAIL,
        payload:
          'Unable to calculate shipping for purchase. Check that WebAPI services are running and the apiUrl endpoint is configured correctly in shoppingConfig.js',
      });

      return;
    }
  } catch (err) {
    dispatch({
      type: actionType.CALCULATE_SHIPPING_FAIL,
      payload: err.toString(),
    });
  }
};

export const processOrderAction = async (cartItems, countryCode, dispatch) => {
  try {
    dispatch({
      type: actionType.PROCESS_ORDER_START,
    });

    const orderRequest = {
      orderItems: cartItems,
      countryCode: countryCode,
    };

    const { data } = await shoppingClient.processOrder(orderRequest);

    if (data.inError) {
      dispatch({
        type: actionType.PROCESS_ORDER_FAIL,
        payload: 'Unable to complete purchase',
      });
      console.log(console.log(JSON.stringify(data)));
      return;
    }

    dispatch({
      type: actionType.PROCESS_ORDER_COMPLETE,
    });

    return data;
  } catch (err) {
    dispatch({
      type: actionType.PROCESS_ORDER_FAIL,
      payload: err.toString(),
    });
  }
};
