import { useState } from 'react'
import { Space } from 'antd'
import { Button } from 'antd'
import AddMark from './AddMark'
import MarkModal from './MarkModal'

import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentMember } from '../appDataSlice'
import getMember from '../getMember'

export default function MarksList({ marks, isAdd }) {
    const [markModalVisible, setMarkModalVisible] = useState(false)

    const data = useSelector((state) => state.appData.data)
    const columns = useSelector((state) => state.appData.columns)

    const dispatch = useDispatch()

    const { name, date } = getMember(data, columns, marks[0].key)

    return (
        <Space>
            {marks.map((res) => (
                <Button
                    key={res.key}
                    type="default"
                    style={{
                        color:
                            res.mark > 2
                                ? res.mark > 4
                                    ? '#00eb2f'
                                    : '#cad100'
                                : 'red',
                        borderColor:
                            res.mark > 2
                                ? res.mark > 4
                                    ? '#00eb2f'
                                    : '#cad100'
                                : 'red',
                    }}
                    onClick={() => {
                        dispatch(
                            changeCurrentMember(
                                getMember(data, columns, res.key)
                            )
                        )
                        setMarkModalVisible(true)
                    }}
                >
                    {res.mark}
                </Button>
            ))}
            <MarkModal
                isVisible={markModalVisible}
                setIsVisible={setMarkModalVisible}
            />
            <AddMark isAdd={isAdd} name={name} date={date} />
        </Space>
    )
}
