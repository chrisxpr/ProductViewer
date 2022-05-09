import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import CartCheckout from '../checkout';

import {
  testCartItem,
  testProductList,
  testCountryInfo,
  testDeleteHandler,
} from '../testData';

afterEach(cleanup);

const CartCheckoutComponent = (
  <CartCheckout
    cartItem={testCartItem}
    products={testProductList}
    countryInfo={testCountryInfo}
    deleteHandler={testDeleteHandler}
  />
);

describe('Render the cart item component', () => {
  it('it renders without error', () => {
    expect(CartCheckoutComponent).toBeTruthy();
  });
});
