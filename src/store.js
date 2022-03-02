import { configureStore } from '@reduxjs/toolkit'
import appDataReducer from './appDataSlice'
import { apiSlice } from './apiSlice'

export default configureStore({
    reducer: {
        appData: appDataReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
