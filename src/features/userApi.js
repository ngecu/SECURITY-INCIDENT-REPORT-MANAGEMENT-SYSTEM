import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const base_url = 'http://localhost:5000/api/users';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
