import { useState, useEffect } from 'react'
import { Menu, Layout, Table, Modal, Button, Typography } from 'antd'
import { IdcardOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeCurrentMember,
    loadData,
    loadMark,
    changeData,
} from './appDataSlice'
// import axios from 'axios'

import { useGetColumnsQuery, useGetDataQuery } from './apiSlice'

const { Sider, Content } = Layout

const { Text } = Typography

function MemberMarks(props) {
    const { data, name, myKey } = props

    const currentMark = useSelector((state) => state.appData.currentMark)

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
                        <div>
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
                            {currentMark.isDelete ? <span>delete</span> : null}
                        </div>
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

        dispatch(loadData(JSON.stringify(memberData)))

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
                                data={JSON.parse(data)}
                                columns={newColumns}
                            />
                        ) : null}
                        <Button
                            type="primary"
                            onClick={() => {
                                const plainData = JSON.parse(data)
                                dispatch(loadData(JSON.stringify(plainData[0])))
                                console.log(data)
                            }}
                        >
                            change data
                        </Button>
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
                                        handleClose()
                                    }}
                                >
                                    Отмена
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    onClick={() => {
                                        dispatch(loadMark({}))
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
