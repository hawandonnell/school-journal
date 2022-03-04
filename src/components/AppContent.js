import { useState, useEffect } from 'react'
import { Layout, Table, Modal, Button, Typography, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeCurrentMember,
    loadData,
    loadMark,
    addData,
    changeData,
} from '../appDataSlice'

import { useGetColumnsQuery, useGetDataQuery } from '../apiSlice'

const { Content } = Layout

const { Text } = Typography

function MemberMarks(props) {
    const { data, name, myKey } = props

    const currentMark = useSelector((state) => state.appData.currentMark)
    const currentMember = useSelector((state) => state.appData.currentMember)

    const [markInput, setMarkInput] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        setMarkInput(0)
    }, [currentMember])
    const getMarks = () => {
        var marks
        data.forEach((res) => {
            if (res.fio === name) {
                Object.entries(res).forEach((val) => {
                    if (typeof val[1] == 'object') {
                        if (val[1].key === myKey) {
                            if (val[1].marks) {
                                marks = val[1].marks
                            } else {
                                if (val[1].mark) {
                                    marks = val[1].mark
                                } else {
                                    marks = []
                                }
                            }
                        }
                    }
                })
            }
        })
        return marks
    }

    return (
        <div>
            {getMarks() ? (
                <div>
                    {getMarks().length === 0 ? (
                        <>
                            <span>Нет оценок</span>

                            {currentMember.isAdd ? (
                                <div>
                                    <h3>Добавить оценку</h3>
                                    <InputNumber
                                        defaultValue={0}
                                        onChange={(value) =>
                                            setMarkInput(value)
                                        }
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            dispatch(
                                                addData({
                                                    name: currentMember.name,
                                                    key: currentMember.key,
                                                    mark: markInput,
                                                })
                                            )
                                        }}
                                    >
                                        Добавить
                                    </Button>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {getMarks().map((res) => (
                                <Button
                                    type="default"
                                    key={res.key}
                                    onClick={() => dispatch(loadMark(res))}
                                    style={{
                                        borderColor:
                                            res.mark > 10
                                                ? '#07d100'
                                                : '#cad100',
                                        color:
                                            res.mark > 10
                                                ? '#07d100'
                                                : '#cad100',
                                    }}
                                >
                                    {res.mark}
                                </Button>
                            ))}
                            {currentMark.isEdit ? (
                                <div>
                                    <h3>Изменить оценку</h3>
                                    <InputNumber
                                        value={currentMark.mark}
                                        onChange={(value) => {
                                            var newMark = {
                                                ...currentMark,
                                                mark: value,
                                            }
                                            dispatch(loadMark(newMark))
                                            dispatch(
                                                changeData({
                                                    mark: newMark,
                                                    name: currentMember.name,
                                                })
                                            )
                                        }}
                                    />
                                </div>
                            ) : null}
                            {currentMark.isDelete ? (
                                <div>
                                    <Button
                                        type="text"
                                        danger
                                        onClick={() => {
                                            var newData = data
                                            newData.forEach((res) => {
                                                if (
                                                    res.fio ===
                                                    currentMember.name
                                                ) {
                                                    Object.entries(res).forEach(
                                                        (val) => {
                                                            if (
                                                                typeof val[1] ==
                                                                'object'
                                                            ) {
                                                                if (
                                                                    val[1].marks
                                                                ) {
                                                                    val[1].marks.forEach(
                                                                        (
                                                                            mark
                                                                        ) => {
                                                                            if (
                                                                                mark.key ===
                                                                                currentMark.key
                                                                            ) {
                                                                                val[1].marks.splice(
                                                                                    val[1].marks.indexOf(
                                                                                        mark
                                                                                    ),
                                                                                    1
                                                                                )
                                                                            }
                                                                        }
                                                                    )
                                                                } else {
                                                                    if (
                                                                        val[1]
                                                                            .mark
                                                                    ) {
                                                                        val[1].mark.forEach(
                                                                            (
                                                                                mark
                                                                            ) => {
                                                                                if (
                                                                                    mark.key ===
                                                                                    currentMark.key
                                                                                ) {
                                                                                    val[1].mark.splice(
                                                                                        val[1].mark.indexOf(
                                                                                            mark
                                                                                        ),
                                                                                        1
                                                                                    )
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    )
                                                }
                                            })
                                            dispatch(
                                                loadData(
                                                    JSON.stringify(newData)
                                                )
                                            )
                                            dispatch(loadMark({}))
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            ) : null}
                            {currentMember.isAdd ? (
                                <div>
                                    <>
                                        <h3>Добавить оценку</h3>
                                        <InputNumber
                                            defaultValue={0}
                                            onChange={(value) =>
                                                setMarkInput(value)
                                            }
                                        />
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                dispatch(
                                                    addData({
                                                        name: currentMember.name,
                                                        key: currentMember.key,
                                                        mark: markInput,
                                                    })
                                                )
                                            }}
                                        >
                                            Добавить
                                        </Button>
                                    </>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            ) : (
                // Code in case when 'marks' property not exist, but 'mark' does
                <>
                    {console.log(getMarks())}
                    {currentMember.isAdd ? (
                        <div>
                            <>
                                <h3>Добавить оценку</h3>
                                <InputNumber
                                    defaultValue={0}
                                    onChange={(value) => setMarkInput(value)}
                                />
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        dispatch(
                                            addData({
                                                name: currentMember.name,
                                                key: currentMember.key,
                                                mark: markInput,
                                            })
                                        )
                                    }}
                                >
                                    Добавить
                                </Button>
                            </>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}

function MyTable(props) {
    const { data, columns } = props

    return <Table columns={columns} dataSource={data} />
}

function AppContent() {
    const [isShowModal, setIsShowModal] = useState(false)
    const [isFetched, setIsFetched] = useState(false)

    const showModal = () => {
        setIsShowModal(true)
    }

    const handleOk = () => {
        setIsShowModal(false)
    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    const { data: columns, isLoading: isColumnsLoading } = useGetColumnsQuery()
    const { data: memberData, isLoading: isDataLoading } = useGetDataQuery()

    const currentMember = useSelector((state) => state.appData.currentMember)
    const data = useSelector((state) => state.appData.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadMark({}))
    }, [dispatch, isShowModal])

    if (!isColumnsLoading && !isDataLoading) {
        var newColumns = []

        function getMember(date, key, isAdd) {
            var member = {
                date,
                name: '',
                key,
                isAdd,
            }
            memberData.forEach((res) => {
                Object.entries(res).forEach((val) => {
                    if (typeof val[1] == 'object') {
                        if (val[1].key === key) {
                            member.name = res['fio']
                        }
                    }
                })
            })
            return member
        }

        columns.forEach((data) => {
            newColumns.push({
                title: data.title,
                key: data.key,
                dataIndex: data.key,
                render: (objData) => {
                    if (
                        typeof objData === 'string' ||
                        objData instanceof String
                    ) {
                        return objData
                    } else {
                        if (objData.marks) {
                            if (objData.marks.length === 0) {
                                return (
                                    <Button
                                        type="text"
                                        onClick={() => {
                                            dispatch(
                                                changeCurrentMember(
                                                    getMember(
                                                        data.title,
                                                        objData.key,
                                                        objData.isAdd
                                                    )
                                                )
                                            )
                                            showModal()
                                        }}
                                    >
                                        <PlusOutlined
                                            style={{
                                                color: 'rgba(24, 144, 255, 1)',
                                            }}
                                        />
                                    </Button>
                                )
                            } else {
                                return (
                                    <Button
                                        type="default"
                                        style={{
                                            borderColor:
                                                objData.marks[
                                                    objData.marks.length - 1
                                                ].mark > 10
                                                    ? '#07d100'
                                                    : '#cad100',
                                            color:
                                                objData.marks[
                                                    objData.marks.length - 1
                                                ].mark > 10
                                                    ? '#07d100'
                                                    : '#cad100',
                                        }}
                                        onClick={() => {
                                            dispatch(
                                                changeCurrentMember(
                                                    getMember(
                                                        data.title,
                                                        objData.key,
                                                        objData.isAdd
                                                    )
                                                )
                                            )
                                            showModal()
                                        }}
                                    >
                                        {
                                            objData.marks[
                                                objData.marks.length - 1
                                            ].mark
                                        }
                                    </Button>
                                )
                            }
                        } else {
                            // Code in case when 'marks' property not exist, but 'mark' does
                            if (objData.mark) {
                                if (objData.mark.length === 0) {
                                    return (
                                        <Button
                                            type="text"
                                            onClick={() => {
                                                dispatch(
                                                    changeCurrentMember(
                                                        getMember(
                                                            data.title,
                                                            objData.key,
                                                            objData.isAdd
                                                        )
                                                    )
                                                )
                                                showModal()
                                            }}
                                        >
                                            <PlusOutlined
                                                style={{
                                                    color: 'rgba(24, 144, 255, 1)',
                                                }}
                                            />
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <Button
                                            type="default"
                                            style={{
                                                borderColor:
                                                    objData.mark[
                                                        objData.mark.length - 1
                                                    ].mark > 10
                                                        ? '#07d100'
                                                        : '#cad100',
                                                color:
                                                    objData.mark[
                                                        objData.mark.length - 1
                                                    ].mark > 10
                                                        ? '#07d100'
                                                        : '#cad100',
                                            }}
                                            onClick={() => {
                                                dispatch(
                                                    changeCurrentMember(
                                                        getMember(
                                                            data.title,
                                                            objData.key,
                                                            objData.isAdd
                                                        )
                                                    )
                                                )
                                                showModal()
                                            }}
                                        >
                                            {
                                                objData.mark[
                                                    objData.mark.length - 1
                                                ].mark
                                            }
                                        </Button>
                                    )
                                }
                            } else {
                                return (
                                    <Button
                                        type="text"
                                        onClick={() => {
                                            dispatch(
                                                changeCurrentMember(
                                                    getMember(
                                                        data.title,
                                                        objData.key,
                                                        objData.isAdd
                                                    )
                                                )
                                            )
                                            showModal()
                                        }}
                                    >
                                        <PlusOutlined
                                            style={{
                                                color: 'rgba(24, 144, 255, 1)',
                                            }}
                                        />
                                    </Button>
                                )
                            }
                        }
                    }
                },
            })
        })

        newColumns[0].dataIndex = newColumns[0].title

        if (!isFetched) {
            dispatch(loadData(JSON.stringify(memberData)))
            setIsFetched(true)
        }

        return (
            <Content style={{ padding: 24 }}>
                <MyTable
                    data={data ? JSON.parse(data) : null}
                    columns={newColumns}
                />
                <Modal
                    visible={isShowModal}
                    title={currentMember.name}
                    onOk={() => handleOk()}
                    onCancel={() => handleClose()}
                    footer={null}
                >
                    <Text type="secondary">Дата: </Text>
                    <span>{currentMember.date}</span>
                    <br />
                    <Text type="secondary">Оценки: </Text>
                    {data ? (
                        <MemberMarks
                            data={JSON.parse(data)}
                            name={currentMember.name}
                            myKey={currentMember.key}
                        />
                    ) : null}
                </Modal>
            </Content>
        )
    } else {
        return 'loading'
    }
}

export default AppContent
