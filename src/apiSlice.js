import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://beta.citorleu.kz/v1/common',
    }),
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => '/data',
        }),
        getColumns: builder.query({
            query: () => '/columns',
        }),
    }),
})

export const { useGetColumnsQuery, useGetDataQuery } = apiSlice
