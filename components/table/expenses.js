import React, {useState} from 'react';
import { Button, Pagination, Popconfirm } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import moment from 'moment';


import {CommaFormatted} from '../../utility';
import {getViewData} from '../../lib/hooks';
import Money from '../money';
import {NameFromId} from '../datatext';

export const ExpenseTable = ({data, del, filter}) => {

    const [page, setPage] = useState(1)
    const offset = 20;
    const router = useRouter();
    const text = "Are you sure you want to delete?"

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];


    const sortdata = (x,y) =>{
        let date1 = new Date(x.date.split('-')[2],x.date.split('-')[1] - 1, x.date.split('-')[0]);
        let date2 = new Date(y.date.split('-')[2],y.date.split('-')[1] - 1, y.date.split('-')[0]);

        if(date1 > date2){
            return -1;
        }
        if (date1 < date2){
            return 1;
        }

        return 0
    }

    const applyFilter = data => data.filter(({date}) => filter.date[0] <= moment(date, 'DD-MM-YYYY') && filter.date[1] >= moment(date, 'DD-MM-YYYY'));
    

    return (
        <div id="expense-table">
            <table>
                <thead>
                    <tr>
                        <th>Sn</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applyFilter(data.slice(upper,lower)).sort(sortdata).map(({id,date, amount, items, recipient, ref}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td><NameFromId id={recipient} link="routes/staff" /></td>
                            <td><Money amount={CommaFormatted(amount)} /></td>
                            <td>{items[0].description}</td>
                            <td className="action-space">
                                <Button icon={<EditOutlined />} type="primary" onClick={e => router.push(`/expenses/${ref}`)} />
                                <Popconfirm placement="top" title={text} onConfirm={_ => del(id)} okText="Yes" cancelText="No">
                                    <Button icon={<DeleteOutlined />} type="primary" danger/>
                                </Popconfirm> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data.length - 1} onChange={onChange} />
            </div>
        </div>
    );
}