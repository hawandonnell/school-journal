import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddMarkModal from './AddMarkModal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import getMember from '../getMember'
import { changeCurrentMember } from '../appDataSlice'

export default function AddMark({ isAdd, name, date }) {
    const [addMarkModalVisible, setAddMarkModalVisible] = useState(false)

    return (
        <div style={{ padding: 24 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {isAdd ? (
                    <Button
                        type="text"
                        id="1"
                        onClick={(e) => {
                            console.log(e.target.id)
                            setAddMarkModalVisible(true)
                        }}
                    >
                        <PlusOutlined
                            style={{
                                color: 'rgba(24, 144, 255, 1)',
                            }}
                        />
                    </Button>
                ) : (
                    <Button type="text" disabled>
                        <PlusOutlined
                            style={{
                                color: '#8c8c8c',
                            }}
                        />
                    </Button>
                )}
                <AddMarkModal
                    isVisible={addMarkModalVisible}
                    setIsVisible={setAddMarkModalVisible}
                    name={name}
                    date={date}
                />
            </div>
        </div>
    )
}
