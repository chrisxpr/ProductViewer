import { useState } from 'react';

const ProductItem = ({ product, countryInfo, addItemHandler }) => {
  const [quantity, setQuantity] = useState(1);
  const localPrice = product.unitPrice * countryInfo.exchangeRate;
  const selectHandler = (e) => {
    if (e && e.target && e.target.value) {
      console.log(
        'quantity change to:' + e.target.value + ' for product:' + product.code
      );
      setQuantity(e.target.value);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <div className="bg-white ring-1 ring-gray-700 ring-opacity-5 shadow-lg rounded">
            <div className="px-6 py-4">
              <div className="font-bold text-black text-xl">{product.name}</div>
              <ul>
                <li>{product.code}</li>
                <li className="py-2">
                  <strong className="text-sm">
                    Token Price {countryInfo.currencyCode}
                    {': '}
                    {localPrice.toFixed(2)}
                  </strong>
                  &nbsp;
                </li>
                <li>
                  <div className="flex flex-inline">
                    <div className="mr-2">
                      <select
                        defaultValue={1}
                        className=" block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="quantity"
                        onChange={selectHandler}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="bg-black text-white px-1 py-2 rounded text-sm w-16"
                      purpose="buy"
                      onClick={() => addItemHandler(product, quantity)}
                    >
                      Buy
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
