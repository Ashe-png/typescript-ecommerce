import { PayloadAction } from '@reduxjs/toolkit';

export type searchState = {
  text: string;
};

export const searchReducer = (
  state: searchState = { text: '' },
  action: PayloadAction<object>
) => {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
