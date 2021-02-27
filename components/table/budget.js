import React, {useState} from 'react';
import { Pagination } from 'antd';
import {useRouter} from 'next/router';


import {CommaFormatted} from '../../utility';
import ActionButton from '../button/actionButtons';
import { getViewData } from '../../lib/hooks';

export const BudgetTable = ({ actions}) => {
    const { data, isLoading, isError, mutate } = getViewData('budgets/');
    const [page, setPage] = useState(1)
    const offset = 20;
    const router = useRouter();

    const onChange = pag => {
        setPage(pag);
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];


    const format = data => (
        <ul>
            {data?.map(({description}, i) => <li className="item-desc" key={i}>{description}</li>)}
        </ul>
    );
    
    const view = id => router.push(`/budget/${id}`);

    return (
        <div id="expense-table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Ref No#</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && data?.map(({id,date, items, total, ref}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{ref}</td>
                            <td>{format(items)}</td>
                            <td>&#8358; {CommaFormatted(parseFloat(total).toFixed(2))}</td>
                            <td><ActionButton actions={{view: _ => view(id), del: _ => {actions?.del(id)}}} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <Pagination current={page} defaultCurrent={1} total={data?.length - 1} onChange={onChange} />
            </div>
        </div>
    );
}