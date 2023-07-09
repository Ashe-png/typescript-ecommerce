import { PayloadAction } from '@reduxjs/toolkit';

type userT = {
  name: string | null;
  email: string | null;
  token: string | null;
  role: string | null;
  _id: string | null;
};

export type userState = {
  user: userT;
} | null;

export const userReducer = (
  state: userState = null,
  action: PayloadAction<object>
) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return action.payload;
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};
