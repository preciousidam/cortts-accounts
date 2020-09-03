import React, {useState, useEffect} from 'react';
import { Breadcrumb, DatePicker } from 'antd';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';

import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {getViewData} from '../../lib/hooks';
import Loader from '../../components/loader';
import {CommaFormatted} from '../../utility';


export function Summary(){

    const useStyles = makeStyles({
        pdf: {
            background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
            border: 1,
            borderRadius: 5,
            borderColor: '#85c226',
            borderStyle: 'solid',
            color: '#ffffff',
            padding: '5px 30px',
          },
    });

    const total = items => {
        let tot = 0.0;

        items.forEach(item => {
            tot += parseFloat(item.amount);
        });

        return parseFloat(tot).toFixed(2);
    }

    const classes = useStyles();

    const {data, isError, isLoading} = getViewData('expense/summary');
    const [summary, setSummary] = useState([]);
    const [date, setDate] = useState(moment(new Date(), 'DD-MM-YYYY'));

    useEffect(() => {
        if(data){
            setSummary(data);
        }
    }, [data]);

    const renderBreadcrumb = _ => (<Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/expenses"><a>Expenses</a></Link></Breadcrumb.Item>
        <Breadcrumb.Item>Summary</Breadcrumb.Item>
    </Breadcrumb>)

    const onChange = (value) => setDate(value);

    return (
        <MainLayout title="Expenses Summary">
            <div className="body">
                <div id='top'>
                    {renderBreadcrumb()}
                    <DatePicker onChange={onChange} picker="month" value={date} format="MM-YYYY" />
                    <Button className="elevated" onClick={_ => router.push('/expenses/summary')} className={classes.pdf} >
                        Download Report 
                        <FontAwesomeIcon icon="file-pdf" color="#ffffff" style={{margin: 5}} />
                    </Button>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <div id='summary-cont'>
                        {!isLoading ? <div className="wrapped">
                            {summary.map(({category, items}, id) => <Card key={id} title={category.title} total={total(items)} />)}
                        </div>: isError ? <p>Something happened cannt fetch data </p>: <Loader />}
                    </div>
                </CustomScroll>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Summary);



const colors = ['#ffbf00', '#25D366', '#00dcf5', '#ff0000']


export const Card = ({title, total}) => (<Paper className="sum-card">
    <span className='color' style={{backgroundColor: colors[Math.floor(Math.random() * 4)]}}></span>
    <p>{title}</p>
    <span>&#8358; {CommaFormatted(total)}</span>
</Paper>)