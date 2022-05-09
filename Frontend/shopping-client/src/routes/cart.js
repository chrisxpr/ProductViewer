import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContainer from '../components/cart/container';
import {
  calculateShippingAction,
  deleteCartItemAction,
  processOrderAction,
} from '../store/actions/cart';
import { Store } from '../store/provider';

export const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    isLoading,
    errorMessage,
    products,
    cartItems,
    countryInfo,
    shippingInfo,
    purchaseInProgress,
  } = state;

  let navigate = useNavigate();

  useEffect(() => {
    const loadShippingCost = async () => {
      await calculateShippingAction(cartItems, dispatch);
    };

    let isMounted = true;

    if (isMounted && cartItems && cartItems.length > 0) {
      loadShippingCost()
        .then(() => {
          console.log('shipping retrieved loaded');
        })
        .catch(console.error);
    }

    return () => {
      isMounted = false;
    };
  }, [cartItems]);

  const deleteItemHandler = (cartItem) => {
    console.log('request to delete item ' + cartItem.productId);
    deleteCartItemAction(cartItem, dispatch);
  };

  const purchaseHandler = async () => {
    console.log('request to complete purchase');
    const data = await processOrderAction(
      cartItems,
      countryInfo.countryCode,
      dispatch
    );

    console.log('data:' + data);

    if (!data.InError) {
      navigate('../complete', { replace: true });
    }
  };

  return (
    <div className="flex flex-col p-5">
      <CartContainer
        isLoading={isLoading}
        loadingError={errorMessage}
        products={products}
        cartItems={cartItems}
        countryInfo={countryInfo}
        shippingInfo={shippingInfo}
        deleteHandler={deleteItemHandler}
        purchaseInProgress={purchaseInProgress}
        purchaseHandler={purchaseHandler}
      />
    </div>
  );
};
