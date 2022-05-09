import { getProductById } from '../../helper/cartHelper';

const CartItem = ({ cartItem, products, countryInfo, deleteHandler }) => {
  const product = getProductById(products, cartItem.productId);
  const localPrice =
    parseFloat(product.unitPrice) * parseFloat(countryInfo.exchangeRate);
  const totalPrice = localPrice * parseFloat(cartItem.quantity);

  return (
    <>
      <tr>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
          {product.name}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          {cartItem.quantity}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          {localPrice.toFixed(2)}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          {totalPrice.toFixed(2)}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          <button
            type="button"
            className="bg-black text-white px-1 py-2 rounded text-sm w-16"
            onClick={() => deleteHandler(cartItem)}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
