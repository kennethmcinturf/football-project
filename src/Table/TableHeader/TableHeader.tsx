import React from 'react';

import { TableHeaderProps } from '../Table';

const TableHeader = ({columns, tableKey, buttonAction} : TableHeaderProps) => {
    return ( 
        <thead>
            <tr key={tableKey}>
                {columns.map((col, index) => (
                    <th key={tableKey + index}>
                        { col.title }
                    </th> 
                ))}
                { 
                    !buttonAction ? null : <td key={tableKey + '-button-action'}></td>
                }
            </tr>
        </thead>
    );
}

export default TableHeader;