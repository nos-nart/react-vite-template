import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
// import { useRefreshTokenQuery } from '../services/auth';
// import { useAppSelector } from '@/redux/store';
// import { selectAuth } from '../slices/auth';

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // const auth = useAppSelector(selectAuth);
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      // useRefreshTokenQuery({ refreshToken: auth.refreshToken as any });
      // @NOTE: resetState
    }

    return next(action);
  };
