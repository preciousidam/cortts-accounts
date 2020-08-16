import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Select, Space, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import {useRouter} from 'next/router';
import moment from 'moment';
import {openNotification} from '../../components/notification';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {CommaFormatted} from '../../utility';
import {ExpenseTable} from '../../components/table/expenses';
import {impress} from '../../constants/data';
import {delData} from '../../utility/fetcher';
import {getViewData} from '../../lib/hooks';
import Loader from '../../components/loader';
import useAuth from '../../provider';


export function Expenses(){

    const useStyles = makeStyles({
        credit: {
          background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
          border: 0,
          borderRadius: 20,
          boxShadow: '0 3 5 2 rgba(#85c226, .3)',
          color: 'white',
          padding: '5px 30px',
          margin: '0 10px',
        },
        debit: {
          background: 'linear-gradient(45deg, #ED213A 30%, #93291E 90%)',
          border: 0,
          borderRadius: 20,
          boxShadow: '0 3 5 2 rgba(#ED213A, .3)',
          color: 'white',
          padding: '5px 30px',
          margin: '0 10px',
        },
        pdf: {
            background: '#ffffff',
            border: 1,
            borderRadius: 5,
            borderColor: '#c6c6c6',
            borderStyle: 'solid',
            color: '#000000',
            padding: '5px 30px',
          },
    });

    const { Option } = Select;
    const {RangePicker} = DatePicker;

    const { data, isLoading, isError, mutate } = getViewData('expense/');
    const {token} = useAuth();
    const [expenses, setExpenses] = useState([]);
    const classes = useStyles();
    const [filter, setFilter] = useState({date: [moment('01-01-2020', 'DD-MM-YYYY'), moment(new Date('09-12-2021'), 'DD-MM-YYYY')],transType: 'all'});
    const router = useRouter();

    const dataLoaded = () => {
        if(!isLoading && data){
            
            const expense = data;
            if(expense){
                setExpenses(expense);
            }
        }
    }


    useEffect(() => {
        dataLoaded();
    });

    const del = async id => {
        const {data, status, msg} = await delData('expense/delete',id,token)
        openNotification(status, msg)
        if(status == 'success') mutate(data);
    }


    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    
    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    const handleChange = value => {
        if(value == 'all')
            setTrans(transactions);
        else
            setTrans(transactions.filter(({type}) => value == type));
    }


    const filterView = () => (<Space>
            <Select defaultValue="all" onChange={handleChange} className="filter">
                <Option value="all">All</Option>
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
                <Option value="transfer">Transfer</Option>
            </Select>
        </Space>);

    const total = date => {
        let total = 0.0

        expenses.forEach(({amount}) => {
            total += parseFloat(amount);
        });

        return parseFloat(total).toFixed(2);
    }

    
    const handleCancel = async _ => setShowModal(false);
    const handle = _ => router.push('/expenses/new');
    

    return (
        <MainLayout title="Expenses">
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div>
                            <span>Impress Balance</span>
                            <p>&#8358; {CommaFormatted(impress.balance)}</p>
                        </div>
                        <div>
                            <span>Total Expenses</span>
                            <p>&#8358; {CommaFormatted(total('debit'))}</p>
                        </div>
                    
                    </div>
                    <div id="right">
                        <Button onClick={_ => handle()} className={classes.credit}  >New Expenses <Add /> </Button>
                    </div>
                </div>
                {!isLoading ? <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All Transactions</h4>
                            <RangePicker
                                className="date-sort"
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                onOk={onOk}
                                id="date"
                                defaultValue={filter.date}
                            />
                            {filterView()}
                            <Button className="elevated" onClick={_ => setOpen(!open)} className={classes.pdf} >Export as PDF 
                                <FontAwesomeIcon icon="file-pdf" color="#ED213A" />
                            </Button>
                        </header>
                        <ExpenseTable data={expenses} filter={filter} actions={{del}}/>
                    </Paper>
                </CustomScroll>: isError ? <h1>Something Happened</h1>: <Loader />}
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Expenses);
