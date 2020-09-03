import React, {useState} from 'react';
import { Pagination } from 'antd';
import {useRouter} from 'next/router';


import {CommaFormatted} from '../../utility';
import ActionButton from '../button/actionButtons';

export const BudgetTable = ({data, actions}) => {

    const [page, setPage] = useState(1)
    const offset = 20;
    const router = useRouter();

    const onChange = pag => {
        setPage(pag);
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];


    const format = data => (
        <ul>
            {data.map(({description}, i) => <li className="item-desc" key={i}>{description}</li>)}
        </ul>
    );

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
                    {data.slice(upper,lower).sort(sortdata).map(({id,date, items, amount, ref}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{ref}</td>
                            <td>{format(items)}</td>
                            <td>&#8358; {CommaFormatted(amount)}</td>
                            <td><ActionButton actions={{view, del: _ => {actions.del(id)}}} /></td>
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