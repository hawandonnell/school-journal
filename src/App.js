import { useState } from 'react'
import { Menu, Layout } from 'antd'
import { IdcardOutlined, FileTextFilled } from '@ant-design/icons'

import { Outlet, Link } from 'react-router-dom'

const { Sider } = Layout

function App() {
    const [collapsed, changeCollapsed] = useState(false)

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
                            <Link to="/">Журнал</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileTextFilled />}>
                            <Link to="/hello">Планы</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Outlet />
            </Layout>
        </div>
    )
}

export default App
