import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/app-types';
const user = localStorage.getItem('user')
  ? (JSON.parse(localStorage.getItem('user')!) as IUser)
  : undefined;
let initialState: { user?: IUser | undefined; isLoggedIn: boolean } = {
  isLoggedIn: user?.uid ? true : false,
  user: user,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      console.log('state', state);
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
