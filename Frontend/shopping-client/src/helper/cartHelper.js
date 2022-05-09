export const cartItemCount = (cartItems) => {
  let totalCount = 0;

  if (cartItems) {
    let initialValue = 0;

    totalCount = cartItems.reduce((itemCount, item) => {
      return parseInt(itemCount) + parseInt(item.quantity);
    }, initialValue);
  }

  return totalCount;
};

export const getProductById = (products, productId) => {
  return products.filter((p) => p.id === productId).shift();
};
