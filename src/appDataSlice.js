import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
    name: 'appData',
    initialState: {
        columns: [],
        data: [],
    },
    reducers: {
        loadColumns: (state, action) => {
            state.columns = action.payload
        },
        loadData: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { loadColumns, loadData } = appDataSlice.actions

export default appDataSlice.reducer
