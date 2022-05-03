import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Maybe } from './types';

type AuthResponse = Maybe<{
  id: string;
  token: string;
  refreshToken: string;
  userName: string;
  isAuthenticated: boolean;
  roleName: string;
  fullName: string;
}>;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_HOST as string,
  }),
  endpoints: (build) => ({
    //                ResultType          QueryArg
    //                    v                  v
    login: build.mutation<AuthResponse, Record<string, string>>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: build.query<AuthResponse, { refreshToken: string }>({
      query: (args) => ({
        url: `/user/refresh-token?refreshToken=${args.refreshToken}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenQuery } = authApi;
