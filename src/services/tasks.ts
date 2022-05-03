import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Tasks } from './types';

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, void>({
      query: () => `/tasks`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksQuery } = tasksApi;
