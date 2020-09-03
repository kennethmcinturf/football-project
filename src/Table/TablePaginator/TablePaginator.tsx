// {
//     players.data.total_pages > 0 && players.data.page < players.data.total_pages ?
//     <Button variant="success" onClick={loadMoreResults}>Load More</Button> : null
//   }

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Button from 'react-bootstrap/Button';

import { TablePaginatorProps } from '../Table';

const TablePaginator = ({ loadHandler, page, total_pages } : TablePaginatorProps) => {
    return (
        total_pages && page < total_pages ? <Button variant="success" onClick={() => loadHandler()}>Load More</Button> : null
    );
}

export default TablePaginator;