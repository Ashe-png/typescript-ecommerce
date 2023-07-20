import { PayloadAction } from '@reduxjs/toolkit';

export type drawerState = boolean;

export const drawerReducer = (
  state: drawerState = false,
  action: PayloadAction
) => {
  switch (action.type) {
    case 'SET_VISIBLE':
      return action.payload;
    default:
      return state;
  }
};
