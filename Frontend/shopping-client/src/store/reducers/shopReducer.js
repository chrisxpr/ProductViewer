import * as actionType from '../constants/actionTypes';

export const initialShopState = {
  isLoading: false,
  errorMessage: null,
  products: null,
  productCount: 0,
  cartItems: [],
  countryList: [
    {
      countryCode: 'AU',
      currencyCode: 'AUD',
      exchangeRate: 1.0,
    },
    {
      countryCode: 'IT',
      currencyCode: 'EUR',
      exchangeRate: 0.67,
    },
    {
      countryCode: 'US',
      currencyCode: 'USD',
      exchangeRate: 0.7,
    },
  ],
  countryInfo: {
    countryCode: 'AU',
    currencyCode: 'AUD',
    exchangeRate: 1.0,
  },
  shippingInfo: {
    rate: 'STANDARD',
    cost: 10.0,
  },
};

export const shopReducer = (state = initialShopState, action) => {
  switch (action.type) {
    case actionType.PRODUCTLIST_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        products: null,
        productCount: 0,
      };
    case actionType.PRODUCTLIST_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        products: action.payload,
        productCount: action.payload ? action.payload.length : 0,
      };
    case actionType.PRODUCTLIST_FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        products: null,
        productCount: 0,
      };
    case actionType.ADDITEM_TO_CART:
      const index = state.cartItems
        .map((x) => x.productId)
        .indexOf(action.payload.productId);

      if (index < 0) {
        return {
          ...state,
          cartItems: state.cartItems.concat(action.payload),
        };
      }

      const newCartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload.productId) {
          return {
            productId: action.payload.productId,
            quantity:
              parseInt(item.quantity) + parseInt(action.payload.quantity),
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        cartItems: newCartItems,
      };
    case actionType.DELETEITEM_FROM_CART:
      const deleteIndex = state.cartItems
        .map((x) => x.productId)
        .indexOf(action.payload.productId);

      return {
        ...state,
        cartItems: state.cartItems.splice(deleteIndex, 1),
        errorMessage: null,
      };
    case actionType.CHANGE_COUNTRY:
      const selectedCountry = state.countryList
        .filter((c) => c.countryCode === action.payload)
        .shift();

      return {
        ...state,
        countryInfo: selectedCountry,
      };
    case actionType.CALCULATE_SHIPPING_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case actionType.CALCULATE_SHIPPING_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case actionType.CALCULATE_SHIPPING_COMPLETE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        shippingInfo: action.payload,
      };
    case actionType.PROCESS_ORDER_START:
      return {
        ...state,
        purchaseInProgress: true,
        errorMessage: null,
      };
    case actionType.PROCESS_ORDER_FAIL:
      return {
        ...state,
        purchaseInProgress: false,
        errorMessage: action.payload,
      };
    case actionType.PROCESS_ORDER_COMPLETE:
      return {
        ...state,
        purchaseInProgress: false,
        errorMessage: null,
        cartItems: [],
      };

    default:
      return state;
  }
};
