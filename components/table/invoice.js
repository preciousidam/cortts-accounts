import React, {useState} from 'react';
import { Button, Pagination, Popconfirm } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import moment from 'moment';


import {CommaFormatted} from '../../utility';
import {getViewData} from '../../lib/hooks';
import Money from '../money';
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
        <div className="detail-table-cont">
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
                            <th>Status</th>
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
                                    <td><Money amount={total} /></td>
                                    <td></td>
                                    <td><ActionButton /></td>
                                </tr>
                            ))}
                        </tbody>
                    
                </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length} onChange={onChange} />
            </div>
        </div>
    );
}