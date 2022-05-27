import AddMark from './sub-components/AddMark'
import MarksList from './sub-components/MarksList'

const columns = [
    {
        title: 'Fio',
        dataIndex: 'fio',
        key: 'fio',
    },
    {
        title: '27.03',
        dataIndex: 123,
        key: 123,
        render: (cell) => {
            if (cell.marks.length === 0) {
                return <AddMark isAdd={cell.isAdd} />
            } else {
                return <MarksList marks={cell.marks} isAdd={cell.isAdd} />
            }
        },
    },
    {
        title: '28.03',
        dataIndex: 124,
        key: 124,
        render: (cell) => {
            if (cell.marks.length === 0) {
                return <AddMark isAdd={cell.isAdd} />
            } else {
                return <MarksList marks={cell.marks} isAdd={cell.isAdd} />
            }
        },
    },
    {
        title: '29.03',
        dataIndex: 125,
        key: 125,
        render: (cell) => {
            if (cell.marks.length === 0) {
                return <AddMark isAdd={cell.isAdd} />
            } else {
                return <MarksList marks={cell.marks} isAdd={cell.isAdd} />
            }
        },
    },
]

export default columns
