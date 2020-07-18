import React, {useState} from 'react';
import { Pagination } from 'antd';
import Paper from '@material-ui/core/Paper';

import ActionButton from '../button/actionButtons';

export default function AccountsTable({data}){
    
    const [page, setPage] = useState(1)
    const offset = 8;

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];
    return (
        <Paper className="detail-table-cont">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Acct Name</th>
                        <th>Acct Number</th>
                        <th>Owner</th>
                        <th>Bank</th>
                        <th>Sort Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(upper,lower).map(({name,number,owner,bank,sc},i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{name}</td>
                            <td>{number}</td>
                            <td>{owner}</td>
                            <td>{bank}</td>
                            <td>{sc}</td>
                            <td><ActionButton /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
        </Paper>
    );
}