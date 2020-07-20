import React, {useState} from 'react';
import { Pagination } from 'antd';
import Paper from '@material-ui/core/Paper';
import CustomScroll from 'react-custom-scroll';

import ActionButton from '../button/actionButtons';

export default function BudgetTable({data}){
    
    const [page, setPage] = useState(1)
    const offset = 8;

    const format = (data) =>{
        return (
            <ul>
                {data.map(({desc}, i) => <li class="item-desc" key={i}>{desc}</li>)}
            </ul>
        );
    }

    const getTotal = (items) =>{
        let total = 0;

        items.forEach( ({amount}) => total += amount);
        return total;
    }

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
                            <th>Date</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(upper,lower).map(({date,items},i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{date}</td>
                                <td>{format(items)}</td>
                                <td>&#8358; {getTotal(items)}</td>
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