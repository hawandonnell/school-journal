export default function getMember(data, columns, key) {
    const resMember = {
        name: '',
        date: '',
        mark: '',
    }
    data.forEach((member) => {
        let thisMember = false
        Object.entries(member).forEach((field) => {
            if (typeof field[1] === 'object' && field[1] !== null) {
                if (
                    field[1].marks.filter((mark) => mark.key === key).length !==
                    0
                ) {
                    thisMember = true
                    let mark = field[1].marks.filter(
                        (mark) => mark.key === key
                    )[0]
                    let date = columns.filter(
                        (column) => column.dataIndex.toString() === field[0]
                    )[0].title
                    resMember.mark = mark
                    resMember.date = date
                }
            }
        })
        if (thisMember) {
            resMember.name = member.fio
        }
    })
    return resMember
}
