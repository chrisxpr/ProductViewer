import { shoppingClient } from '../../services/shoppingClient';
import * as actionType from '../constants/actionTypes';

export const getProductsAction = async (dispatch) => {
  try {
    dispatch({ type: actionType.PRODUCTLIST_FETCH_REQUEST });

    const { data } = await shoppingClient.getProducts();

    //console.log(data);
    if (data && !data.inError) {
      dispatch({
        type: actionType.PRODUCTLIST_FETCH_SUCCESS,
        payload: data.productList,
      });
    } else {
      dispatch({
        type: actionType.PRODUCTLIST_FETCH_FAIL,
        payload:
          'Unable to load products at this time.  Check that WebAPI services are running and the apiUrl endpoint is configured correctly in shoppingConfig.js',
      });
    }
  } catch (err) {
    dispatch({
      type: actionType.PRODUCTLIST_FETCH_FAIL,
      payload: 'An error has occured',
    });
  }
};
