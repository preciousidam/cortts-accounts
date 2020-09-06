import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Avatar, Menu, Dropdown, notification, Spin } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { StickyContainer, Sticky } from 'react-sticky';
import useAuth from '../../provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import {Add, CloseOutlined} from '@material-ui/icons';
import Link from 'next/link';
import CustomScroll from 'react-custom-scroll';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {banks} from '../../constants/data';
import {CommaFormatted} from '../../utility';
import {BarChart, PieChart} from '../../components/charts';
import {SelectInput, StyledInput} from '../../components/textinput/styledTextInput';
import {getViewData} from '../../lib/hooks';
import {setAcct, delData} from '../../utility/fetcher';
import Loader from '../../components/loader';



export function Transactions(){

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
          border: 0,
          borderRadius: 20,
          boxShadow: '0 3 5 2 rgba(#85c226, .3)',
          color: 'white',
          padding: '5px 30px',
          margin: '0 10px',
        },
    });

    const { data: accounts, isLoading, isError, mutate } = getViewData('accounts/');
    const {token} = useAuth();
    
    const [active, setActive] = useState(null);
    const [trans, setTrans] = useState([]);
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const dataLoaded = () => {
        if(!isLoading && accounts){
            if(active == null)
                setActive(accounts[0].id);
            const acct = accounts.find(({id}) => id == active);
            const transactions = acct?.transactions;
            if(transactions){
                setTrans(transactions);
            }
        }
    }


    useEffect(() => {
            dataLoaded();
        });

    const openNotification = (status,msg) => {
        notification.open({
          message: status,
          description: msg,
          icon: status == 'success' ? <CheckCircleOutlined style={{ color: '#00ff00' }} /> : <CloseCircleOutlined style={{ color: '#ff0000' }} />,
        });
    };
    
    const del = async (rid) => {
        const {msg, status, data} = await delData('accounts/delete',rid,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
        setActive(data[0].id);
    }
    
    const add = async (e) => {
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;
        const balance = parseFloat(document.getElementById('balance').value).toFixed(2);
        const bank = document.getElementById('bank').value;
        const sc = document.getElementById('sc').value;

        
        const {msg, status, data} = await setAcct(balance,name,number,sc,bank,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
        clear();
    }

    const clear = () => {
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('bank').value = "";
        document.getElementById('balance').value = "";
        document.getElementById('sc').value = "";
    }

    

    return (
        <MainLayout title="Transactions">
            <div className="body">
                <div id='top'>
                    <h4>Overview</h4>
                    <Button onClick={_ => setOpen(!open)} className={classes.root}  >New Account <Add /></Button>
                </div>
                { !isLoading ? (<CustomScroll heightRelativeToParent="calc(100% - 65px)">
                    <div id="acct-list">
                        {accounts.map(({balance, bank,name, id}, index) => 
                            (<Paper 
                                className={`acct-bal ${id == active? 'active':''}`}
                                onClick={e => {
                                    setActive(id)
                                }}
                                key={id}
                            >   
                                    
                                <span className="caret"><ExtraMenu del={del} id={id} /></span>
                                
                                <h4>&#8358; {CommaFormatted(balance)}</h4>
                                <p>{name} - <span className="bank">{bank}</span></p>
                            </Paper>)
                        )}
                    </div>
                    <div id="trans" className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-lg-5">
                                <h4 className="h4">Recent Transactions</h4>
                                <Paper id="recent-trans">
                                    <StickyContainer className="sticky">
                                        {trans.reverse().map(({id, ...rest}) => (
                                            <TransactionElement key={id} {...rest}/>
                                        ))}
                                    </StickyContainer>
                                </Paper>
                            </div>
                            <div className="col-md-6 col-lg-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <h4 className="h4">Monthly Transactions</h4>
                                        <Paper id="bar">
                                            <StickyContainer className="sticky">
                                                <BarChart data={[12, 19, 3, 5, 4, 15, 9, 3]} />
                                            </StickyContainer>
                                        </Paper>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <h4 className="h4">Monthly Transactions</h4>
                                        <Paper id="pie">
                                            <StickyContainer className="sticky">
                                                <PieChart data={[3, 9, 4]} />
                                            </StickyContainer>
                                        </Paper>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <h4 className="h4">Transactions summary</h4>
                                        <Paper id="sum">
                                            <StickyContainer className="sticky">
                                                <div>
                                                    <div>
                                                        <Summary data={trans}/>
                                                    </div>
                                                </div>
                                            </StickyContainer>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomScroll>): isError ? (<p>Something happended</p>): <Loader /> }
                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Accounts</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Acct Name" id="name" type="text" />
                            <StyledInput placeholder="Acct Number" id="number" type="text" />
                            <SelectInput placeholder="Bank" id="bank" type="text" options={banks} defaultChoice="Select Bank" />
                            <StyledInput placeholder="Sort Code" id="sc" type="text" />
                            <StyledInput placeholder="Opening Balance" id="balance" type="number" />
                            <button className="btn btn-success add" onClick={add}>Save Account</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Transactions);

const icons = {transfer: <FontAwesomeIcon icon="exchange-alt" />, 
                debit: <FontAwesomeIcon icon="credit-card" />,
                credit: <FontAwesomeIcon icon="money-bill-alt" />,
                cancelled: <FontAwesomeIcon icon="ellipsis-h" />,}

const styles = {
    debit: {
        backgroundColor: '#ffbf00'
    },
    credit: {
        backgroundColor: '#25D366'
    },
    transfer: {
        backgroundColor: '#00dcf5'
    },
    cancelled: {
        
    },
}

const TransactionElement = ({beneficiary, transType, date, amount}) => (
    <div className="trans-item">
        <div className="fLeft">
            <Avatar style={styles[transType]} >{icons[transType]}</Avatar>
            <div className="trans-det">
                <p className={transType == 'cancelled'? 'cancelled': ''}>{beneficiary}</p>
                <span>{date}</span>
            </div>
        </div>
        <span className={`${transType == 'cancelled'? 'cancelled': ''} ${transType == 'credit'? 'credit': 'debit'}`}>
            {transType != 'credit'? '- ': ''}&#8358; {CommaFormatted(amount)}
        </span>
    </div>
);

const Summary = ({data}) => {
    
    const sum = [];

    const calcCredit = _ => {
        let cre = 0.0;

        data.forEach(({transType, amount}) => {
            if(transType === 'credit') 
                cre += parseFloat(amount)
        });

        sum.push({type: 'credit', total: cre, title: 'Credit'});
        
    };

    const calcDebit = _ => {
        let deb = 0.0;

        data.forEach(({transType, amount}) => {
            
            if(transType === 'debit') 
                deb += parseFloat(amount)
        });

        sum.push({type: 'debit', total: deb, title: 'Debit'});
    }

    const calcImp = _ => {
        let imp = 0.0;

        data.forEach(({transType, amount}) => {
            if(transType === 'transfer') 
                imp += parseFloat(amount)
        });

        sum.push({type: 'transfer', total: imp, title: 'Impress'});
    }

    calcCredit();
    calcDebit();
    calcImp();

    return (<div className="trans-item">
        <div>
            {sum.map(({type,total,title}, ind) => (
                <div className="sumDet" key={ind}>
                    <Avatar style={styles[type]} >{icons[type]}</Avatar>
                    <div className="trans-det">
                        <span>{title}</span>
                        <p>&#8358; {CommaFormatted(parseFloat(total).toFixed(2))}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}

const ExtraMenu = ({id, del}) => {
    const menu = (<Menu>
        <Menu.Item>
            <Link href={`/transactions/${id}`}>
                <a>
                    View
                </a>
            </Link>
        </Menu.Item>
        <Menu.Item danger>
            <a onClick={e => {
                e.preventDefault();
                del(id);
            }}>
                Delete
            </a>
        </Menu.Item>
        
  </Menu>)

    return (<Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <FontAwesomeIcon icon="caret-down" />
        </a>
    </Dropdown>);
};