import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '../../services';
import type { RootState } from '../../store';

const initialState = {
  id: '',
  fullName: '',
  token: '',
  isAuthenticated: false,
  userName: '',
  roleName: '',
  refreshToken: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }: PayloadAction<any>) => {
          return { ...state, ...payload };
        }
      )
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, { payload }: PayloadAction<any>) => {
          return { ...state, ...payload };
        }
      );
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectAuth = (state: RootState) => state.auth;
