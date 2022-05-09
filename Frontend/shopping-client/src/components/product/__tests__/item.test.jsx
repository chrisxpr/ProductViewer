import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import ProductItem from '../item';
import { testProduct, testCountryInfo, testAddItemHandler } from '../testData';

afterEach(cleanup);

const ProductItemComponent = (
  <ProductItem
    product={testProduct}
    countryInfo={testCountryInfo}
    addItemHandler={testAddItemHandler}
  />
);

describe('Render the product item component', () => {
  it('it renders without error', () => {
    expect(ProductItemComponent).toBeTruthy();
  });

  it('the buy button to be in the dom', () => {
    render(ProductItemComponent);
    expect(screen.getByText(/Buy/i).closest('button')).toBeInTheDocument();
  });

  it('the name to be rendered correctly', () => {
    render(ProductItemComponent);
    expect(screen.getByText(/Polygon/i).closest('div')).toBeInTheDocument();
  });

  it('the price to be rendered correctly', () => {
    render(ProductItemComponent);
    expect(
      screen.getByText(/Token Price USD: 3.00/i).closest('div')
    ).toBeInTheDocument();
  });
});
