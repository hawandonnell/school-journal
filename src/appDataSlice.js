import { createSlice } from '@reduxjs/toolkit'
import columns from './columns'
import dataSource from './dataSource'

export const appDataSlice = createSlice({
    name: 'appData',
    initialState: {
        columns,
        data: dataSource,
        currentMember: {
            name: '',
            date: '',
            mark: {},
        },
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
        deleteData: (state, action) => {
            const plainData = JSON.parse(state.data)
            plainData.forEach((res) => {
                if (res.fio === action.payload.name) {
                    Object.entries(res).forEach((val) => {
                        if (typeof val[1] == 'object') {
                            if (val[1].marks) {
                                val[1].marks.forEach((mark) => {
                                    if (mark.key === action.payload.key) {
                                        val[1].marks.splice(
                                            val[1].marks.indexOf(mark),
                                            1
                                        )
                                    }
                                })
                            } else {
                                if (val[1].mark) {
                                    val[1].mark.forEach((mark) => {
                                        if (mark.key === action.payload.key) {
                                            val[1].mark.splice(
                                                val[1].mark.indexOf(mark),
                                                1
                                            )
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
    deleteData,
} = appDataSlice.actions

export default appDataSlice.reducer
