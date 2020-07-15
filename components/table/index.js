import React, {useState} from 'react';
import {ChevronLeftOutlined, ChevronRightOutlined, CreateOutlined, DeleteOutline, RemoveRedEyeOutlined} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';


import ActionButton from '../button/actionButtons';

const sortByDate = (data) =>{
    let array = data.sort((x,y) =>{
        const date1 = new Date(x.date);
        const date2 = new Date(y.date);

        if (date1 < date2)
            return -1;
        else if (date1 > date2)
            return 1;

        return 0;
    });

    return array
}


export default function Table({data}){

    const [page, setPage] = useState(0);

    const header = ['#',...Object.keys(data[0]),'Amount','action']
    const [upper,lower] = [page,page+7];


    const handlePagination = (action) =>{
        
        if (action === 'dec'){
            
            setPage(page-7)
        }else if(action == 'inc'){
            
            setPage(page+7)
        }
    }

    return(
        <div className="table-cont">
            <Filter action={handlePagination} page={page} total={data.length} />
            <Paper elevation={2} className="container-fluid table">
                <div className="row thead">
                    <div className="col-lg-1 th">{header[0]}</div>
                    <div className="col-lg-2 th">{header[1]}</div>
                    <div className="col-lg-6 th">{header[2]}</div>
                    <div className="col-lg-2 th">{header[3]}</div>
                    <div className="col-lg-1 th">{header[4]}</div>
                </div>
                <div className="tbody">
                    {sortByDate(data.slice(upper,lower)).map((item, i) => <TableItem key={i} item={item} index={i} page={page} total={data.length} />)}
                </div>
            </Paper>
        </div>
    );
}

export const Filter = ({action,page, total}) => {
    return (
        <div className="filters">
            <div className="pagination">
                <div className="control-nav" >
                    <IconButton className="contr-btn" onClick={() => action('dec')}><ChevronLeftOutlined /></IconButton>
                </div>
                <p className="control-text">{page+1} to {page+7} ... {total}</p>
                <div className="control-nav">
                    <IconButton className="contr-btn" onClick={() => action('inc')}><ChevronRightOutlined /></IconButton>
                </div>
            </div>
        </div>
    )
}

export const TableItem = ({actions, item, index, page}) => {

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


    return (
        <div className={`row tr`}>
            <div className="col-lg-1 td">{page+index+1}</div>
            <div className="col-lg-2 td">{item.date}</div>
            <div className="col-lg-6 td">{format(item.items)}</div>
            <div className="col-lg-2 td"><span>&#8358;</span> {getTotal(item.items)}</div>
            <div className="col-lg-1 td"><ActionButton /></div>
        </div>
    )
}