import { ListHeader } from '../shared/listHeader';
import CartCheckout from './checkout';
import CartList from './list';

const CartContainer = ({
  isLoading,
  loadingError,
  products,
  cartItems,
  countryInfo,
  shippingInfo,
  deleteHandler,
  purchaseInProgress,
  purchaseHandler,
}) => {
  return (
    <>
      <ListHeader title="Shopping Cart" />

      <CartList
        isLoading={isLoading}
        loadingError={loadingError}
        products={products}
        cartItems={cartItems}
        countryInfo={countryInfo}
        deleteHandler={deleteHandler}
      />

      {cartItems && cartItems.length > 0 && (
        <CartCheckout
          isLoading={isLoading}
          products={products}
          cartItems={cartItems}
          countryInfo={countryInfo}
          shippingInfo={shippingInfo}
          purchaseInProgress={purchaseInProgress}
          purchaseHandler={purchaseHandler}
        />
      )}
    </>
  );
};

export default CartContainer;
