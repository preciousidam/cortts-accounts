import React, {useState} from 'react';
import {ChevronLeftOutlined, ChevronRightOutlined, CreateOutlined, DeleteOutline, RemoveRedEyeOutlined} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';


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

    const header = ['#',...Object.keys(data[0]),'action']
    const [upper,lower] = [page,page+7];


    const handlePagination = (action) =>{
        console.log('called')
        if (action === 'dec'){
            if (page != 0)
                setPage(page-7)
        }else if(action == 'inc'){
            if (page+7 < data.lenght)
                setPage(page+7)
        }
    }
    console.log(`${page} ${upper}`)
    return(
        <div className="table-cont">
            <Filter action={handlePagination} page={page} />
            <Paper elevation={2} className="container-fluid table">
                <div className="row thead">
                    <div className="col-lg-1 th">{header[0]}</div>
                    <div className="col-lg-2 th">{header[1]}</div>
                    <div className="col-lg-8 th">{header[2]}</div>
                    <div className="col-lg-1 th">{header[3]}</div>
                </div>
                <div className="tbody">
                    {sortByDate(data.slice(upper,lower)).map((item, i) => <TableItem key={i} item={item} index={i} />)}
                </div>
            </Paper>
        </div>
    );
}

export const Filter = ({action,page}) => {
    return (
        <div className="filters">
            <div className="pagination">
                <div className="control-nav" onClick={action('dec')}>
                    <ChevronLeftOutlined />
                </div>
                <p className="control-text">1 to 15 ... 100</p>
                <div className="control-nav" onClick={action('inc')}>
                    <ChevronRightOutlined />
                </div>
            </div>
        </div>
    )
}

export const TableItem = ({actions, item, index}) => {

    const format = (data) =>{
        return (
            <ul>
                {data.map(({desc}, i) => <li class="item-desc" key={i}>{desc}</li>)}
            </ul>
        );
    }


    return (
        <div className={`row tr`}>
            <div className="col-lg-1 td">{index+1}</div>
            <div className="col-lg-2 td">{item.date}</div>
            <div className="col-lg-8 td">{format(item.items)}</div>
            <div className="col-lg-1 td"><ActionButton /></div>
        </div>
    )
}