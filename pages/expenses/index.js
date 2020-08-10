import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Select, Space, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {CommaFormatted} from '../../utility';
import {getAllAcct, getAcctDetails} from '../../lib/accounts';
import {ExpenseTable} from '../../components/table/expenses';
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {accounts, expensesData, impress} from '../../constants/data';



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

    
    const [expenses, setExpenses] = useState(expensesData);
    const classes = useStyles();
    const [type, setType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)


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


    const filter = () => (
        <Space>
            <Select defaultValue="all" onChange={handleChange} className="filter">
                <Option value="all">All</Option>
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
                <Option value="transfer">Transfer</Option>
            </Select>
        </Space>
    );

    const total = date => {
        let total = 0.0

        expenses.forEach(({amount}) => {
            total += parseFloat(amount);
        });

        return parseFloat(total).toFixed(2);
    }


    const handleOk = async () => {
        setLoading(true);
        
    };
    
    const handleCancel = async () => {
        setShowModal(false);
    };

    const handle = type => {
        setType(type);
        setShowModal(true);
    }

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
                        <Button onClick={_ => handle('credit')} className={classes.credit}  >New Expenses <Add /> </Button>
                    </div>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All Expenses</h4>
                            <RangePicker
                                className="date-sort"
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                onOk={onOk}
                                id="date"
                            />
                            {filter()}
                            <Button className="elevated" onClick={_ => setOpen(!open)} className={classes.pdf} >Export as PDF 
                                <FontAwesomeIcon icon="file-pdf" color="#ED213A" />
                            </Button>
                        </header>
                        <ExpenseTable data={expenses} />
                    </Paper>
                </CustomScroll>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Expenses);
