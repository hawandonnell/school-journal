import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
    name: 'appData',
    initialState: {
        columns: '',
        data: '',
        currentMember: {},
    },
    reducers: {
        loadColumns: (state, action) => {
            state.columns = action.payload
        },
        loadData: (state, action) => {
            state.data = action.payload
        },
        changeCurrentMember: (state, action) => {
            state.currentMember = action.payload
        },
    },
})

export const { loadColumns, loadData, changeCurrentMember } =
    appDataSlice.actions

export default appDataSlice.reducer
