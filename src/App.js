import { useState, useEffect } from 'react'
import { Menu, Layout, Table, Modal, Button, Typography } from 'antd'
import { IdcardOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeCurrentMember,
    loadData,
    loadMark,
    loadNewData,
    changeData,
} from './appDataSlice'
// import axios from 'axios'

import { useGetColumnsQuery, useGetDataQuery } from './apiSlice'

const { Sider, Content } = Layout

const { Text } = Typography

function MemberMarks(props) {
    const { data, name, myKey } = props

    const currentMark = useSelector((state) => state.appData.currentMark)
    const currentMember = useSelector((state) => state.appData.currentMember)

    const dispatch = useDispatch()

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
                                marks = val[1].mark
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
                        <span>Нет оценок</span>
                    ) : (
                        <>
                            {getMarks().map((res) => (
                                <Button
                                    type="default"
                                    key={res.key}
                                    onClick={() => dispatch(loadMark(res))}
                                >
                                    {res.mark}
                                </Button>
                            ))}
                            {currentMark.isEdit ? <span>edit</span> : null}
                            {currentMark.isDelete ? (
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => {
                                        var newData = data
                                        newData.forEach((res) => {
                                            if (
                                                res.fio === currentMember.name
                                            ) {
                                                Object.entries(res).forEach(
                                                    (val) => {
                                                        if (
                                                            typeof val[1] ==
                                                            'object'
                                                        ) {
                                                            val[1].marks.forEach(
                                                                (mark) => {
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
                                                        }
                                                    }
                                                )
                                            }
                                        })
                                        dispatch(
                                            loadNewData(JSON.stringify(newData))
                                        )
                                        console.log(currentMark)
                                    }}
                                >
                                    Удалить
                                </Button>
                            ) : null}
                        </>
                    )}
                </div>
            ) : (
                <span>Нет оценок</span>
            )}
        </div>
    )
}

function MyTable(props) {
    const { data, columns } = props

    return <Table columns={columns} dataSource={data} />
}

function App() {
    const [collapsed, changeCollapsed] = useState(false)
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
    const newData = useSelector((state) => state.appData.newData)

    const dispatch = useDispatch()

    if (!isColumnsLoading && !isDataLoading) {
        var newColumns = []

        function getMember(date, key) {
            var member = {
                date,
                name: '',
                key,
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
                                                        objData.key
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
                                        onClick={() => {
                                            dispatch(
                                                changeCurrentMember(
                                                    getMember(
                                                        data.title,
                                                        objData.key
                                                    )
                                                )
                                            )
                                            showModal()
                                        }}
                                    >
                                        {objData.marks[0].mark}
                                    </Button>
                                )
                            }
                        } else {
                            // Code in case when 'marks' property not exist, but 'mark' does
                            if (objData.mark) {
                                return objData.mark
                            } else {
                                return (
                                    <Button
                                        type="text"
                                        onClick={() => {
                                            dispatch(
                                                changeCurrentMember(
                                                    getMember(
                                                        data.title,
                                                        objData.key
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
            <div className="App">
                <Layout>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={() => changeCollapsed(!collapsed)}
                    >
                        <Menu
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            style={{ maxWidth: 207, height: '100vh' }}
                            inlineCollapsed={collapsed}
                        >
                            <Menu.Item key="1" icon={<IdcardOutlined />}>
                                Журнал
                            </Menu.Item>
                            <Menu.Item key="2" icon={<FileTextFilled />}>
                                Планы
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: 24 }}>
                        {data ? (
                            <MyTable
                                data={data ? JSON.parse(data) : null}
                                columns={newColumns}
                            />
                        ) : null}
                        <Modal
                            visible={isShowModal}
                            title={currentMember.name}
                            onOk={() => handleOk()}
                            onCancel={() => handleClose()}
                            footer={[
                                <Button
                                    key="back"
                                    type="default"
                                    onClick={() => {
                                        dispatch(loadMark({}))
                                        dispatch(loadNewData(''))
                                        handleClose()
                                    }}
                                >
                                    Отмена
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    disabled={!newData ? true : false}
                                    onClick={() => {
                                        dispatch(loadMark({}))
                                        dispatch(loadData(newData))
                                        handleClose()
                                    }}
                                >
                                    Сохранить
                                </Button>,
                            ]}
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
                </Layout>
            </div>
        )
    } else {
        return 'loading'
    }
}

export default App
