import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Button from 'react-bootstrap/Button';

import { ListRowsProps } from '../TableRows';
import { Player } from '../../../App';

const getKeyValue = <U extends keyof T, T extends object>(key: U,obj: T) => obj[key];

const ListRows = ({buttonAction, list, columns} : ListRowsProps) => {
    return <>{
        list.map((player:Player) => 
            <tr key={player.id}>
                {columns.map((col) => (
                    <td key={col.field + player.id}>
                        { getKeyValue<keyof typeof player, typeof player>(col.field, player) }
                    </td> 
                ))}
                { 
                    !buttonAction ? null : 
                    <td>
                        <Button variant={ player.isChosen ? 'danger' : 'primary'} onClick={() => buttonAction(player)}>
                            { player.isChosen ? "Remove" : "Add" }
                        </Button>
                    </td>
                }
            </tr>
        )
    }</>
}

export default ListRows;