import { useState, useEffect } from 'react'
import { Menu, Layout, Table, Modal, Button } from 'antd'
import { IdcardOutlined, FileTextFilled, PlusOutlined } from '@ant-design/icons'
import { loadColumns, loadData } from './appDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const { Sider, Content } = Layout

// Test data code
// if (
//     typeof objData === 'string' ||
//     objData instanceof String
// ) {
//     console.log(objData)
// } else {
//     console.log(objData)
// }
// if (
//     typeof objData === 'string' ||
//     objData instanceof String
// ) {
//     return objData
// } else {
//     if (objData.marks) {
//         objData.marks.map((res) => (
//             <div key={res.key}>{res.mark}</div>
//         ))
//     } else {
//         return objData.mark
//     }
// }

function App() {
    const [collapsed, changeCollapsed] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    // const [currentModal, setCurrentModal] = useState({})

    const resColumns = []

    useEffect(() => {
        const columns = axios.get('https://beta.citorleu.kz/v1/common/columns')
        const data = axios.get('https://beta.citorleu.kz/v1/common/data')
        axios.all([columns, data]).then(
            axios.spread((...responses) => {
                responses[0].data.forEach((data) =>
                    resColumns.push({
                        title: data.title,
                        dataIndex: data.key,
                        key: data.key,
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
                                                onClick={() => showModal()}
                                            >
                                                <PlusOutlined
                                                    style={{
                                                        color: 'rgba(24, 144, 255, 1)',
                                                    }}
                                                />
                                            </Button>
                                        )
                                    } else {
                                        return objData.marks.map((res) => (
                                            <div key={res.key}>{res.mark}</div>
                                        ))
                                    }
                                } else {
                                    // Code in case when 'marks' property not exist, but 'mark' does
                                    if (objData.mark) {
                                        return objData.mark
                                    } else {
                                        return (
                                            <Button
                                                type="text"
                                                onClick={() => showModal()}
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
                )
                resColumns[0].dataIndex = 'fio'

                // const jsonColumns = JSON.stringify(resColumns)
                // const jsonData = JSON.stringify(responses[1].data)

                // dispatch(loadData(jsonData))
                // dispatch(loadColumns(jsonColumns))

                setColumns(resColumns)
                setData(responses[1].data)
            })
        )
    }, [])

    // const columns = useSelector((state) => state.appData.columns)

    // const data = useSelector((state) => state.appData.data)

    // const dispatch = useDispatch()

    // const plainData = JSON.parse(data)
    // console.log(plainData)
    // const plainColumns = JSON.parse(columns)
    // console.log(plainColumns)

    const showModal = () => {
        setIsShowModal(true)
    }

    const handleOk = () => {
        setIsShowModal(false)
    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    // const columns = [
    //     {
    //         title: 'Fio',
    //         dataIndex: 'fio',
    //         key: 'fio',
    //     },
    //     {
    //         title: '31-08',
    //         dataIndex: 998,
    //         key: 998,
    //     },
    //     {
    //         title: '30-08',
    //         dataIndex: 997,
    //         key: 997,
    //     },
    // ]

    // const data = [
    //     {
    //         key: '1',
    //         fio: 'John Brown',
    //         998: 'check',
    //         997: 'this',
    //     },
    //     {
    //         key: '2',
    //         fio: 'Hawandonnell',
    //         998: 'check',
    //         997: 'this',
    //     },
    //     {
    //         key: '3',
    //         fio: 'Jack Jonhson',
    //         998: 'check',
    //         997: 'this',
    //     },
    // ]

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
                    <Table columns={columns} dataSource={data} />
                    <Modal
                        visible={isShowModal}
                        title="Check"
                        onOk={() => handleOk()}
                        onCancel={() => handleClose()}
                    >
                        Some data
                    </Modal>
                </Content>
            </Layout>
        </div>
    )
}

export default App
