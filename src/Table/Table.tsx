import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import BootStrapTable from 'react-bootstrap/Table';
import { TableProps, Player } from '../App';

const getKeyValue = <U extends keyof T, T extends object>(key: U,obj: T) => obj[key];

const Table = ({ list, columns, tableKey, children } : TableProps) => {
    var listRows = null
        if (list.length < 1) {
            listRows = <tr>
                <td colSpan={columns.length} style={{textAlign: "center"}}>
                    {children}
                </td>
            </tr>
        } else {
            listRows = (list.map((player:Player) => 
                <tr key={player.id}>
                    {columns.map((col) => (
                        <td key={col.field + player.id}>
                            { getKeyValue<keyof typeof player, typeof player>(col.field, player) }
                        </td> 
                    ))}
                </tr>
            ))
        }

    const listHeaders = 
    <tr key={tableKey}>
        {columns.map((col, index) => (
            <th key={tableKey + index}>
                { col.title }
            </th> 
        ))}
    </tr>

    return (
        <>
            <BootStrapTable striped bordered hover>
                <thead>{listHeaders}</thead>
                <tbody>
                    {listRows}
                </tbody>
            </BootStrapTable>
        </>
    );
}

export default Table;