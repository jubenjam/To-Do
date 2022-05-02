import React from 'react'

function TableHeader()  {
    return (
        <thead>
            <tr>
                <th>Task</th>
                <th>Complete By</th>
                <th>Category</th>
                <th></th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
        var date = new Date(row.date.replace(/-/g, '/').replace(/T.+/, ''));
        return (
            <tr key={index}>
                <td>{row.task}</td>
                <td>{date.toDateString()}</td>
                <td>{row.category}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        );
    }
    );
    return (
        <tbody>
            {rows}
        </tbody>
    );
}
  
  
function Table (props) {
    return (
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
        </table>
    );
}
export default Table;