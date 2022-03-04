import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
    name: 'appData',
    initialState: {
        columns: '',
        data: '',
        oldData: '',
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
            const plainData = JSON.parse(state.data)
            plainData.forEach((res) => {
                if (res.fio === action.payload.name) {
                    Object.entries(res).forEach((val) => {
                        if (typeof val[1] == 'object') {
                            if (val[1].marks) {
                                val[1].marks.forEach((mark) => {
                                    if (mark.key === action.payload.mark.key) {
                                        mark.mark = action.payload.mark.mark
                                    }
                                })
                            } else {
                                if (val[1].mark) {
                                    val[1].mark.forEach((mark) => {
                                        if (
                                            mark.key === action.payload.mark.key
                                        ) {
                                            mark.mark = action.payload.mark.mark
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
            state.data = JSON.stringify(plainData)
        },
        addData: (state, action) => {
            const plainData = JSON.parse(state.data)
            plainData.forEach((res) => {
                if (res.fio === action.payload.name) {
                    Object.entries(res).forEach((val) => {
                        if (typeof val[1] == 'object') {
                            if (val[1].key === action.payload.key) {
                                if (val[1].marks) {
                                    val[1].marks.push({
                                        key: Math.random(),
                                        mark: action.payload.mark,
                                        isEdit: true,
                                        isDelete: true,
                                    })
                                } else {
                                    if (!val[1].mark) {
                                        val[1].mark = []
                                    }
                                    val[1].mark.push({
                                        key: Math.random(),
                                        mark: action.payload.mark,
                                        isEdit: true,
                                        isDelete: true,
                                    })
                                }
                            }
                        }
                    })
                }
            })
            state.data = JSON.stringify(plainData)
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
    changeData,
    loadMark,
    addData,
} = appDataSlice.actions

export default appDataSlice.reducer
