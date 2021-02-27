import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { DatePicker, Popover, Button as Btn } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import {useRouter} from 'next/router';
import moment from 'moment';
import {openNotification} from '../../components/notification';
import {MoreVertOutlined} from '@material-ui/icons';
import Link from 'next/link';
import {mutate} from 'swr';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {ExpenseTable} from '../../components/table/expenses';
import {delData, setData} from '../../utility/fetcher';
import {DataSelectInput, SelectInput, StyledInput} from '../../components/textinput/styledTextInput';

export const Accounts = DataSelectInput('accounts/expenses/');

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


    const {RangePicker} = DatePicker;
    
    const classes = useStyles();
    const [acct, setAcct] = useState(null);
    const [filter, setFilter] = useState({date: [moment('01-01-2020', 'DD-MM-YYYY'), moment(new Date('09-12-2021'), 'DD-MM-YYYY')],category: 'all'});
    const router = useRouter();
    const [formData, setFormdata] = useState({name: '', balance: 0.00});
    const [processing, setProcessing] = useState(false);
    const [createView, setCreateView] = useState(true);

    


    const del = async id => {
        const {status, data} = delData(`expenses/${id}/`)
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('expenses/');
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
        
    }


    const onChange = (value, dateString) => {
        setFilter({...filter,date: value})
    }

    
    const handle = _ => router.push('/expenses/new');
    
    const createAcct = async _ => {
        setProcessing(true);
        const body = {...formData, open_balance: parseFloat(formData.balance).toFixed(2)}
        const {status, data} = await setData('accounts/expenses/', body);
        setProcessing(false);
        if (status === 200 || status === 201){
            openNotification("Success","Account created successfully", 'success');
            mutate('accounts/expenses/')
            return
        }
        
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }

    const fundAcct = async _ => {
        setProcessing(true);
        const body = {amount: parseFloat(formData.balance).toFixed(2), account: acct}
        const {status, data} = await setData('accounts/topup/', body);
        setProcessing(false);
        if (status === 200 || status === 201){
            openNotification("Success","Account created successfully", 'success');
            mutate('accounts/topup/');
            return
        }
        
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }

    const addForm = _ => (<div>
                {createView ?<div className="dropForm">
                    <div className='seperate'>
                        <Btn onClick={_ => setCreateView(false)} type="primary" block>Fund Account</Btn>
                    </div>
                    <p>Create new Expense account</p>
                    <StyledInput 
                        value={formData.name} 
                        onChange={e => setFormdata({...formData, name: e.target.value})} 
                        type="text" 
                        placeholder="Account Title" 
                        id="title" 
                    />
                    <StyledInput
                        value={formData.open_balance} 
                        onChange={e => setFormdata({...formData, open_balance: e.target.value})}
                        type="number" 
                        placeholder="Opening Balance" 
                        id="balance" min={0} 
                    />

                    <Btn loading={processing} type="primary" onClick={e => createAcct()}>Add</Btn>
                </div>:
                <div className="dropForm">
                    <div className='seperate'>
                        <Btn onClick={_ => setCreateView(true)} type="primary" block>Create Account</Btn>
                    </div>
                    <p>Fund {acct ? acct.name: ''} account</p>
                    
                    <StyledInput
                        value={formData.balance} 
                        onChange={e => setFormdata({...formData,balance: e.target.value})}
                        type="number" 
                        placeholder="amount" 
                        id="balance" min={0} 
                    />

                    <Btn loading={processing} type="primary" onClick={e => fundAcct()}>Fund</Btn>
                </div>}
                <Link href={`expenses/account/${acct ? acct.id : null}`}>
                    <a className="history">view account history?</a>
                </Link>
            </div>)
    

    return (
        <MainLayout title="Expenses">
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <h5>Expense Transactions</h5>
                    </div>
                    <div id="right">
                        <div>
                            <Accounts onChange={e => setAcct(e)} value={acct} />
                            <Popover 
                                content={addForm} 
                                placement="bottomRight" 
                                trigger='click'
                            >
                                <IconButton><MoreVertOutlined /></IconButton>
                            </Popover>
                        </div>
                        <Button onClick={_ => handle()} className={classes.credit}  >New Expenses <Add /> </Button>
                    </div>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <Paper id="transactions">
                        <header id="header">
                            {/*<h4>All Transactions</h4>*/}
                            <RangePicker
                                className="date-sort"
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                id="date"
                                defaultValue={filter.date}
                            />
                            
                            <Button className="elevated" onClick={_ => router.push('/expenses/summary')} className={classes.pdf} >Expense Report 
                                <FontAwesomeIcon icon="chart-pie" color="#ED213A" style={{margin: 5}} />
                            </Button>
                        </header>
                        <ExpenseTable account={acct} filter={filter} del={del}/>
                    </Paper>
                </CustomScroll>
            </div>
        </MainLayout>
    )
}


export default ProtectRoute(Expenses);


