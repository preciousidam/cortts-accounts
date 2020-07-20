import React, {useState} from 'react';
import { Pagination } from 'antd';
import Paper from '@material-ui/core/Paper';
import CustomScroll from 'react-custom-scroll';

import ActionButton from '../button/actionButtons';

export default function DetailsTable({data}){
    
    const [page, setPage] = useState(1)
    const offset = 8;

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];
    return (
        <Paper className="detail-table-cont">
            <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(upper,lower).map(({name,email,address,cp,phone},i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name}</td>
                                <td>{address}</td>
                                <td>{email}</td>
                                <td>{cp}</td>
                                <td>{phone}</td>
                                <td><ActionButton /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CustomScroll>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
        </Paper>
    );
}