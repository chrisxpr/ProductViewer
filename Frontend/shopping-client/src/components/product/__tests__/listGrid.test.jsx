import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { ProductListGrid } from '../listGrid';
import {
  testProductList,
  testCountryInfo,
  testAddItemHandler,
} from '../testData';

afterEach(cleanup);

const ProductListGridComponent = (
  <ProductListGrid
    isLoadingList={false}
    loadingError=""
    products={testProductList}
    countryInfo={testCountryInfo}
    addItemHandler={testAddItemHandler}
  />
);

describe('Render the product list grid component', () => {
  it('it renders without error', () => {
    expect(ProductListGridComponent).toBeTruthy();
  });

  it('the names to be rendered correctly', () => {
    render(ProductListGridComponent);
    expect(screen.getByText(/Polygon/i).closest('div')).toBeInTheDocument();
    expect(screen.getByText(/Hexagon/i).closest('div')).toBeInTheDocument();
  });

  it('the prices to be rendered correctly', () => {
    render(ProductListGridComponent);
    expect(
      screen.getByText(/Token Price USD: 3.00/i).closest('div')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Token Price USD: 4.50/i).closest('div')
    ).toBeInTheDocument();
  });
});
