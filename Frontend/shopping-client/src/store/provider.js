import { createContext, useReducer } from 'react';
import { initialShopState, shopReducer } from './reducers/shopReducer';

export const Store = createContext();

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
