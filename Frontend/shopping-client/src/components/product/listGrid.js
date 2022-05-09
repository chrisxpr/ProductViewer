import { ListContainer } from '../layout/listContainer';
import ProductItem from './item';

export const ProductListGrid = ({
  isLoadingList,
  loadingError,
  products,
  countryInfo,
  addItemHandler,
}) => {
  return (
    <ListContainer
      isLoadingList={isLoadingList}
      loadingError={loadingError}
      list={products}
      listEmptyMessage="no products to display!"
      type="GRID"
    >
      {products && (
        <>
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              countryInfo={countryInfo}
              addItemHandler={addItemHandler}
            />
          ))}
        </>
      )}
    </ListContainer>
  );
};
