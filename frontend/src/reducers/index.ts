import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, userState } from './userReducer';
import { cartReducer, cartState } from './cartReducer';
import { searchReducer, searchState } from './searchReducer';
import { drawerReducer, drawerState } from './drawerReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
  drawer: drawerReducer,
});

export type RootState = {
  user: userState;
  cart: cartState;
  search: searchState;
  drawer: drawerState;
};
