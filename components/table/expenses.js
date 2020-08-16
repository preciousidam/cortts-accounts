import React, {useState} from 'react';
import { Pagination } from 'antd';
import {useRouter} from 'next/router';


import {CommaFormatted} from '../../utility';
import ActionButton from '../button/actionButtons';
import {staff} from '../../constants/data';

export const ExpenseTable = ({data, actions}) => {

    const [page, setPage] = useState(1)
    const offset = 20;
    const router = useRouter();

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];

    const getName = name => {
        const st = staff.find(({id}) => id == parseInt(name));
        return st.name;
    }

    const sortdata = (x,y) =>{
        let date1 = new Date(x.date.split('-')[2],x.date.split('-')[1] - 1, x.date.split('-')[0]);
        let date2 = new Date(y.date.split('-')[2],y.date.split('-')[1] - 1, y.date.split('-')[0]);

        if(date1 > date2){
            return 1;
        }
        if (date1 < date2){
            return -1;
        }

        return 0
    }
    
    const view = id => router.push(`/expenses/${id}`);

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
                    {data.slice(upper,lower).sort(sortdata).map(({id,date, amount, items, recipient, ref}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{getName(recipient)}</td>
                            <td>{CommaFormatted(amount)} </td>
                            <td>{items[0].description}</td>
                            <td><ActionButton actions={{view: () => view(ref), del: _ => actions.del(id)}} /></td>
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