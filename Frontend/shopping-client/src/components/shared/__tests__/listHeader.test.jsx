import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { ListHeader } from '../listHeader';

afterEach(cleanup);

const ListHeaderComponent = <ListHeader title="Jest Test" />;

describe('Render the list header component', () => {
  it('it renders without error', () => {
    expect(ListHeaderComponent).toBeTruthy();
  });

  it('the header text to be in the dom', () => {
    render(ListHeaderComponent);
    expect(screen.getByText(/Jest Test/i).closest('h2')).toBeInTheDocument();
  });
});
