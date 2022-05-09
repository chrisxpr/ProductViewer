import { useContext, useEffect, useRef } from 'react';
import ProductList from '../components/product/list';
import { addCartItemAction } from '../store/actions/cart';
import { getProductsAction } from '../store/actions/product';
import { Store } from '../store/provider';

export const Products = () => {
  const { state, dispatch } = useContext(Store);
  const { isLoading, errorMessage, products, countryInfo, cartItems } = state;

  const initialRender = useRef(true);

  useEffect(() => {
    const loadProducts = async () => {
      await getProductsAction(dispatch);
    };

    let isMounted = true;

    if (initialRender.current) {
      if (isMounted) {
        initialRender.current = false;
        loadProducts()
          .then(() => {
            console.log('products loaded');
          })
          .catch(console.error);
      }
    }

    return () => {
      isMounted = false;
    };
  });

  const addItemHandler = (product, quantity) => {
    console.log('request to purchase ' + quantity + ' of: ' + product.code);

    var cartItem = {
      productId: product.id,
      quantity: quantity,
    };

    addCartItemAction(cartItem, dispatch);

    JSON.stringify(cartItems);
  };

  return (
    <div className="flex flex-col p-5">
      <ProductList
        isLoadingList={isLoading}
        loadingError={errorMessage}
        products={products}
        countryInfo={countryInfo}
        addItemHandler={addItemHandler}
      />
    </div>
  );
};
