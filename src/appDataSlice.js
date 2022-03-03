import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
    name: 'appData',
    initialState: {
        columns: '',
        data: '',
        currentMember: {},
        currentMark: {},
    },
    reducers: {
        loadColumns: (state, action) => {
            state.columns = action.payload
        },
        loadData: (state, action) => {
            state.data = action.payload
        },
        changeData: (state, action) => {
            state.data = action.payload
        },
        loadMark: (state, action) => {
            state.currentMark = action.payload
        },
        changeCurrentMember: (state, action) => {
            state.currentMember = action.payload
        },
    },
})

export const {
    loadColumns,
    loadData,
    changeCurrentMember,
    loadMark,
    changeData,
} = appDataSlice.actions

export default appDataSlice.reducer
