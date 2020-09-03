import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import BootStrapTable from 'react-bootstrap/Table';
import { TableProps, Players } from '../App';
import TableHeader from './TableHeader/TableHeader';
import TableRows from './TableRows/TableRows';
import TablePaginator from './TablePaginator/TablePaginator';

const Table = ({ list, columns, tableKey, children, buttonAction, page, total_pages, loadHandler } : TableProps) => {
    return (
        <>
            <BootStrapTable striped bordered hover>
                <TableHeader 
                        columns={columns}
                        tableKey={tableKey}
                        buttonAction={buttonAction}/>
                <TableRows
                    columns={columns}
                    buttonAction={buttonAction}
                    list={list}
                    placeholder={children}/>
            </BootStrapTable>
            {
                page && total_pages && loadHandler ? 
                <TablePaginator
                    page={page}
                    total_pages={total_pages}
                    loadHandler={loadHandler}/> :
                null
            }
        </>
    );
}

type TableHeaderProps = {
    tableKey:string,
    columns:Array<any>,
    buttonAction?:Function
}

type TableRowsProps = {
    buttonAction?:Function,
    columns:Array<any>,
    list:Players,
    placeholder:React.ReactNode
}

type TablePaginatorProps = {
    page: number,
    total_pages: number,
    loadHandler: Function
}

export default Table;

export type { TableHeaderProps, TableRowsProps, TablePaginatorProps };