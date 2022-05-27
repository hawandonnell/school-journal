import { Layout, Table } from 'antd'
import { useSelector } from 'react-redux'

const { Content } = Layout

function AppContent() {
    const data = useSelector((state) => state.appData.data)
    const columns = useSelector((state) => state.appData.columns)
    return (
        <Content style={{ padding: 24 }}>
            <Table dataSource={data} columns={columns} />
        </Content>
    )
}

export default AppContent
