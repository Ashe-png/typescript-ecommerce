import { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../functions/types';

export type cartState = IProduct[] | null;

let initialState: cartState = [];

//load cart items from local storage
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart')!);
  } else {
    initialState = [];
  }
}

export const cartReducer = (
  state: cartState = initialState,
  action: PayloadAction<object>
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    default:
      return state;
  }
};
