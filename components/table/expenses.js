import React, {useState} from 'react';
import { Pagination } from 'antd';


import {CommaFormatted} from '../../utility';
import ActionButton from '../button/actionButtons';
import {staff} from '../../constants/data';

export const ExpenseTable = ({data}) => {

    const [page, setPage] = useState(1)
    const offset = 20;

    const onChange = pag => {
        setPage(pag)
    };
    const [upper,lower] = [(offset * page) - offset, page * offset];

    const getName = name => {
        const st = staff.find(({id}) => id == name);
        return st.name;
    }

    const sortdata = (x,y) =>{
        let date1 = new Date(x.date.split('-')[2],x.date.split('-')[1] - 1, x.date.split('-')[0]);
        let date2 = new Date(y.date.split('-')[2],y.date.split('-')[1] - 1, y.date.split('-')[0]);

        if(date1 > date2){
            console.log('this');
            return 1;
        }
        if (date1 < date2){
            console.log('that');
            return -1;
        }

        return 0
    }
    
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
                    {data.slice(upper,lower).sort(sortdata).map(({id,date, amount, desc, name}, i) => (
                        <tr key={id}>
                            <td>{i+1}</td>
                            <td>{date}</td>
                            <td>{getName(name)}</td>
                            <td>{CommaFormatted(amount)} </td>
                            <td>{desc}</td>
                            <td><ActionButton /></td>
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