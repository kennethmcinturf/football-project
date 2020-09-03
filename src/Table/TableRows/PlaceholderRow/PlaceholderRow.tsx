import React from 'react';

import { PlaceholderRowProps } from '../TableRows';

const PlaceholderRow = ({buttonAction, placeholder, columns} : PlaceholderRowProps) => {
    return (
        <tr>
            <td colSpan={buttonAction ? columns.length + 1 : columns.length} style={{textAlign: "center"}}>
                {placeholder}
            </td>
        </tr>
    );
}

export default PlaceholderRow;