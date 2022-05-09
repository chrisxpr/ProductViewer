import { ListContainer } from '../layout/listContainer';
import CartItem from './item';

const CartList = ({
  isLoading,
  loadingError,
  products,
  cartItems,
  countryInfo,
  deleteHandler,
}) => {
  return (
    <>
      <ListContainer
        isLoadingList={isLoading}
        loadingError={loadingError}
        list={cartItems}
        listEmptyMessage="You have no products in your basket!"
        type="TABLE"
      >
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Product
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Quantity
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Item Price ({countryInfo.currencyCode})
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Total ({countryInfo.currencyCode})
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {cartItems && (
              <>
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.productId}
                    cartItem={cartItem}
                    products={products}
                    countryInfo={countryInfo}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </ListContainer>
    </>
  );
};

export default CartList;
