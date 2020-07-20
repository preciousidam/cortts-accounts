import React, {useState} from 'react';
import { Pagination } from 'antd';
import Paper from '@material-ui/core/Paper';
import CustomScroll from 'react-custom-scroll';

import ActionButton from '../button/actionButtons';


export default function InvoiceTable({data}){
    
    const [page, setPage] = useState(1)
    const offset = 8;

    const onChange = pag => {
        setPage(pag)
    };

    const format = items => (
        <ul>
            {items.map(({type}, i) => <li class="item-desc" key={i}>{type}</li>)}
        </ul>
    )

    const [upper,lower] = [(offset * page) - offset, page * offset];
    return (
        <Paper className="detail-table-cont">
            <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Invoice No.</th>
                            <th>Date</th>
                            <th>Recipient</th>
                            <th>Flat</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                        <tbody>
                            {data.slice(upper,lower).map(({invNo, date, recipient, items, flat, total}, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{invNo}</td>
                                    <td>{date}</td>
                                    <td>{recipient}</td>
                                    <td>{flat}</td>
                                    <td>{format(items)}</td>
                                    <td>&#8358; {total}</td>
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