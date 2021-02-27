import React, {useState} from 'react';
import { Button, Pagination, Popconfirm } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';
import moment from 'moment';


import {CommaFormatted} from '../../utility';
import {getViewData} from '../../lib/hooks';
import Money from '../money';
import {NameFromId} from '../datatext';


export const ExpenseTable = ({account, del, filter}) => {
    const {data, isLoading, isError} = getViewData(`expenses/?account=${account||-1}`);
    const router = useRouter();
    const text = "Are you sure you want to delete?";
 

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
                    {data?.map(({id,date, total, items, recipient, ref}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td><NameFromId id={recipient} link="staff" /></td>
                            <td><Money amount={CommaFormatted(parseFloat(total).toFixed(2))} /></td>
                            <td>{items[0]?.description}</td>
                            <td className="action-space">
                                <Button icon={<EditOutlined />} type="primary" onClick={e => router.push(`/expenses/${id}`)} />
                                <Popconfirm placement="top" title={text} onConfirm={_ => del(id)} okText="Yes" cancelText="No">
                                    <Button icon={<DeleteOutlined />} type="primary" danger/>
                                </Popconfirm> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination current={1} defaultCurrent={1} total={data?.length - 1} />
            </div>
        </div>
    );
}