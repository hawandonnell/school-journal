import { Modal, Button, Space, Typography, Input } from 'antd'
import { useSelector } from 'react-redux'
const { Text } = Typography

export default function AddMarkModal({ isVisible, setIsVisible }) {
    const currentMember = useSelector((state) => state.appData.currentMember)
    return (
        <Modal
            visible={isVisible}
            title={currentMember.name}
            onOk={() => setIsVisible(false)}
            onCancel={() => setIsVisible(false)}
            footer={[
                <Button key="add" type="primary">
                    Добавить
                </Button>,
                <Button
                    key="cancel"
                    type="default"
                    onClick={() => setIsVisible(false)}
                >
                    Отмена
                </Button>,
            ]}
        >
            <Space direction="vertical">
                <Space>
                    <Text type="secondary">Дата: </Text>
                    <span>{currentMember.date}</span>
                </Space>
                <Space>
                    <Text type="secondary">Оценка: </Text>
                    <Input placeholder="Оценка" />
                </Space>
                <Space>
                    <Button type="primary">5</Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'rgba(130, 101, 176, 1)',
                        }}
                    >
                        4
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'rgba(251, 173, 47, 1)',
                        }}
                    >
                        3
                    </Button>
                    <Button type="primary" danger>
                        2
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'rgba(130, 130, 130, 1)',
                        }}
                    >
                        Д
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'rgba(130, 130, 130, 1)',
                        }}
                    >
                        Н
                    </Button>
                </Space>
            </Space>
        </Modal>
    )
}
