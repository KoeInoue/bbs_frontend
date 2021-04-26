import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      profileImgUrl: '',
      name: '',
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user += action.payload;
    },
    logout: (state) => {
      state.user = { id: '', profileImgUrl: '', name: '' };
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
