import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Avatar, Menu, Dropdown } from 'antd';
import { StickyContainer } from 'react-sticky';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import {Add, CloseOutlined} from '@material-ui/icons';
import Link from 'next/link';
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {banks} from '../../constants/data';
import {CommaFormatted} from '../../utility';
import {BarChart, PieChart} from '../../components/charts';
import {SelectInput, StyledInput} from '../../components/textinput/styledTextInput';
import {useAccounts} from '../../provider';



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

    const {selectedAcct, done, add, del, accounts, setSelected} = useAccounts();
    
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    
    const onClick = async (e) => {
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;
        const balance = parseFloat(document.getElementById('balance').value).toFixed(2);
        const bank = document.getElementById('bank').value;
        const sort_code = document.getElementById('sc').value;
        const account_officer = document.getElementById('acct_off_name').value;
        const account_officer_number = document.getElementById('acct_off_num').value;

        
        let result = await add({balance,name,number,sort_code,bank, account_officer, account_officer_number});
        if(result) clear();
    }

    const clear = () => {
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('bank').value = "";
        document.getElementById('balance').value = "";
        document.getElementById('sc').value = "";
        document.getElementById('acct_off_name').value = "";
        document.getElementById('acct_off_num').value = "";
    }

    

    return (
        <MainLayout title="Transactions">
            <div className="body">
                <div id='top'>
                    <h4>Overview</h4>
                    <Button onClick={_ => setOpen(!open)} className={classes.root}  >New Account <Add /></Button>
                </div>
                { (done && accounts) && (<CustomScroll heightRelativeToParent="calc(100% - 65px)">
                    <div id="acct-list">
                        {accounts?.map(({number, bank,name, id}, index) => 
                            (<Paper 
                                className={`acct-bal ${id == selectedAcct?.id? 'active':''}`}
                                onClick={e => {
                                    setSelected(id)
                                }}
                                key={id}
                            >   
                                    
                                <span className="caret"><ExtraMenu del={del} id={id} /></span>
                                <span className="bank">{bank}</span>
                                <h4 className="number">{number}</h4>
                                <p className="name">{name}</p>
                                
                            </Paper>)
                        )}
                    </div>
                    <div id="trans" className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-lg-5">
                                <h4 className="h4">Recent Transactions</h4>
                                <Paper id="recent-trans">
                                    <StickyContainer className="sticky">
                                        {selectedAcct?.recent_transaction?.map(({id, ...rest}) => (
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
                                                        <Summary 
                                                            total_credit={selectedAcct?.total_credit}
                                                            total_debit={selectedAcct?.total_debit}
                                                        />
                                                    </div>
                                                </div>
                                            </StickyContainer>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomScroll>)}
                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Account</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Acct Name" id="name" type="text" />
                            <StyledInput placeholder="Acct Number" id="number" type="text" />
                            <SelectInput placeholder="Bank" id="bank" type="text" options={banks} defaultChoice="Select Bank" />
                            <StyledInput placeholder="Sort Code" id="sc" type="text" />
                            <StyledInput placeholder="Opening Balance" id="balance" type="number" />
                            <StyledInput placeholder="Acct Name" id="acct_off_name" type="text" />
                            <StyledInput placeholder="Acct Number" id="acct_off_num" type="text" />
                            <button className="btn btn-success add" onClick={onClick}>Save Account</button>
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

const TransactionElement = ({ben_name, type, created_at, amount}) => (
    <div className="trans-item">
        <div className="fLeft">
            <Avatar style={styles[type]} >{icons[type]}</Avatar>
            <div className="trans-det">
                <p className={type == 'cancelled'? 'cancelled': ''}>{ben_name}</p>
                <span>{moment(created_at).fromNow()}</span>
            </div>
        </div>
        <span className={`${type == 'cancelled'? 'cancelled': ''} ${type == 'credit'? 'credit': 'debit'}`}>
            {type != 'credit'? '- ': ''}&#8358; {CommaFormatted(parseFloat(amount).toFixed(2))}
        </span>
    </div>
);

const Summary = ({total_credit, total_debit}) => {

    return (<div className="trans-item">
        <div>
            <div className="sumDet">
                <Avatar style={styles['credit']} >{icons['credit']}</Avatar>
                <div className="trans-det">
                    <span>{'Credit'}</span>
                    <p>&#8358; {CommaFormatted(parseFloat(total_credit).toFixed(2))}</p>
                </div>
            </div>
            <div className="sumDet">
                <Avatar style={styles['debit']} >{icons['debit']}</Avatar>
                <div className="trans-det">
                    <span>{'Debit'}</span>
                    <p>&#8358; {CommaFormatted(parseFloat(total_debit).toFixed(2))}</p>
                </div>
            </div>
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
    </Menu>)

    return (<Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <FontAwesomeIcon icon="caret-down" />
        </a>
    </Dropdown>);
};