import React from 'react';

import { Players } from '../../App';
import { TableRowsProps } from '../Table';
import PlaceholderRow from './PlaceholderRow/PlaceholderRow';
import ListRows from './ListRows/ListRows';

const TableRows = ({buttonAction, columns, list, placeholder} : TableRowsProps) => {
    return (
        <tbody>
            { 
                list.length < 1
                ?
                <PlaceholderRow
                    buttonAction={buttonAction}
                    placeholder={placeholder}
                    columns={columns}/> 
                :
                <ListRows
                    buttonAction={buttonAction}
                    columns={columns}
                    list={list}/>
            }
        </tbody>
    );
}

type PlaceholderRowProps = {
    buttonAction?: Function | undefined,
    placeholder:React.ReactNode,
    columns:Array<any>
}

type ListRowsProps = {
    buttonAction?: Function | undefined,
    columns:Array<any>,
    list:Players
}

export default TableRows;

export type { PlaceholderRowProps, ListRowsProps };