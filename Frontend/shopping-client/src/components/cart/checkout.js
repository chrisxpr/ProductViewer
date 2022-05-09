import { getProductById } from '../../helper/cartHelper';

const CartCheckout = ({
  isLoading,
  products,
  cartItems,
  countryInfo,
  shippingInfo,
  purchaseHandler,
  purchaseInProgress,
}) => {
  const localSubTotal = () => {
    let initialValue = 0;
    const totalCost = cartItems.reduce((totalCost, item) => {
      const product = getProductById(products, item.productId);

      return (
        parseFloat(totalCost) + parseFloat(item.quantity) * product.unitPrice
      );
    }, initialValue);

    return totalCost;
  };

  const subTotal = localSubTotal();
  const totalCost = subTotal + shippingInfo.cost;

  const adjustedSubTotal = subTotal * countryInfo.exchangeRate;
  const adjustedShippingCost = shippingInfo.cost * countryInfo.exchangeRate;
  const adjustedTotal = totalCost * countryInfo.exchangeRate;

  return (
    <>
      <div className="flex flex-row justify-end px-5 py-5">
        <table className="border-collapse table-auto w-96 text-sm">
          <tbody className="bg-white dark:bg-slate-800">
            <tr>
              <td className="p-4 pl-8 text-slate-500 dark:text-slate-400">
                <b>Subtotal ({countryInfo.currencyCode})</b>
              </td>
              <td className="p-4 pr-8 text-slate-500 dark:text-slate-400">
                {adjustedSubTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                <b>Shipping ({countryInfo.currencyCode})</b>
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                {adjustedShippingCost.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                <b>Total ({countryInfo.currencyCode})</b>
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                {adjustedTotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                className="p-4 pr-8 text-slate-500 dark:text-slate-400"
              >
                {purchaseInProgress ? (
                  <>Please wait whilst we process your order</>
                ) : (
                  <>
                    {!isLoading && (
                      <button
                        type="button"
                        className="bg-black text-white px-1 py-2 rounded text-sm w-64"
                        onClick={() => purchaseHandler(cartItems)}
                      >
                        Place Order
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartCheckout;
