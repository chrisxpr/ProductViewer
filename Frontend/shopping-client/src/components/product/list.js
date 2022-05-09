import { ListHeader } from '../shared/listHeader';
import { ProductListGrid } from './listGrid';

const ProductList = ({
  isLoadingList,
  loadingError,
  products,
  countryInfo,
  addItemHandler,
}) => {
  return (
    <>
      <ListHeader title="Product List" />

      <ProductListGrid
        isLoadingList={isLoadingList}
        loadingError={loadingError}
        products={products}
        countryInfo={countryInfo}
        addItemHandler={addItemHandler}
      />
    </>
  );
};

export default ProductList;
