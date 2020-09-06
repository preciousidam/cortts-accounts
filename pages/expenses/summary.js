import React, {useState, useEffect} from 'react';
import { Breadcrumb, DatePicker, Button as Btn } from 'antd';
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
import Money from '../../components/money';

const months = {'01': 'January', '02': 'February', 
                '03': 'March', '04': 'April', 
                '05': 'May', '06': 'June',
                '07': 'July', '08': 'August',
                '09': 'September', '10': 'October',
                '11': 'November', '12': 'December'
}


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

    const { RangePicker } = DatePicker;

    const classes = useStyles();

    const {data, isError, isLoading} = getViewData('expense/summary');
    const [showItems, setShowItems] = useState(false);
    const [items, setItems] = useState(null);
    const [summary, setSummary] = useState([]);
    const [caption, setCaption] = useState([]);
    const [date, setDate] = useState([moment(new Date(), 'MM-YYYY'), moment(new Date(), 'MM-YYYY')]);
    const title = `Expense Report from ${months[date[0].format('MM-YYYY').split('-')[0]]} ${date[0].format('MM-YYYY').split('-')[1]}
    - ${months[date[1].format('MM-YYYY').split('-')[0]]} ${date[1].format('MM-YYYY').split('-')[1]}`;


    const total = items => {
        let tot = 0.0;

        const filteredItems = items.filter(({created_at}) => moment(created_at.slice(3,), 'MM-YYYY') >= 
                                date[0] && moment(created_at.slice(3,), 'MM-YYYY') <= date[1] )

        filteredItems.forEach(item => {
            tot += parseFloat(item.amount);
        });

        return parseFloat(tot).toFixed(2);
    }

    
    useEffect(() => {
        if(data){
            setSummary(data);
        }
    }, [data]);

    const renderBreadcrumb = _ => (<Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/expenses"><a>Expenses</a></Link></Breadcrumb.Item>
        <Breadcrumb.Item>Summary</Breadcrumb.Item>
    </Breadcrumb>);

    const onChange = (value, something) => setDate(value);
    const handleClick = (items, caption) => {
        setItems(items.filter(({created_at}) => moment(created_at.slice(3,), 'MM-YYYY') >= 
                    date[0] && moment(created_at.slice(3,), 'MM-YYYY') <= date[1]));
        setCaption(caption)
        setShowItems(true);
    }

    return (
        <MainLayout title="Expenses Summary">
            <div className="body">
                <div id='top'>
                    {renderBreadcrumb()}
                    <RangePicker onChange={onChange} picker="month" value={date} format="MM-YYYY" />
                    <Button className="elevated" onClick={_ => router.push('/expenses/summary')} className={classes.pdf} >
                        Download Report 
                        <FontAwesomeIcon icon="file-pdf" color="#ffffff" style={{margin: 5}} />
                    </Button>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    {!isLoading ? <div id='summary-cont'>
                        <h5>{title}</h5>
                        {showItems ? (
                            <ItemHistory 
                                items={items} 
                                caption={caption} 
                                total={total(items)} 
                                onClick={_ => setShowItems(false)}
                            />) :<div className="wrapped">
                            {summary.map(({category, items}, id) => 
                                <Card key={id} 
                                    title={category.title} 
                                    total={total(items)} 
                                    onClick={_ => handleClick(items, category.title)} 
                                />
                            )}
                        </div>}
                    </div>: isError ? <p>Something happened cannot fetch data </p>: <Loader />}
                </CustomScroll>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Summary);



const colors = ['#ffbf00', '#25D366', '#00dcf5', '#ff0000']


export const Card = ({title, total, onClick}) => (<Paper className="sum-card" onClick={onClick}>
    <span className='color' style={{backgroundColor: colors[Math.floor(Math.random() * 4)]}}></span>
    <p>{title}</p>
    <span><Money amount={CommaFormatted(total)} /></span>
</Paper>)

export const ItemHistory = ({items, total, caption, onClick}) => (<Paper className="items-cont">
    <div>
        <h4>{caption} summary</h4>
        <table>
            <thead>
                <tr>
                    <th>Sn</th>
                    <th>Date</th>
                    <th style={{width: '70%'}}>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map(({created_at, description, amount }, i) => (
                    <tr>
                        <td>{i+1}</td>
                        <td>{created_at}</td>
                        <td>{description}</td>
                        <td><Money amount={amount} /></td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="total"><Money amount={total} /></td>
                </tr>
            </tbody>
        </table>
        <Btn type="primary" onClick={onClick}>Back</Btn>
    </div>
</Paper>)