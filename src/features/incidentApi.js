import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const base_url = 'http://localhost:5000/api/incidents';

export const incidentApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    incident: builder.mutation({
      query: (incidentData) => ({
        url: '/',
        method: 'POST',
        body: incidentData,
      }),
    }),
  }),
});

export const { useIncidentMutation } = incidentApi;
