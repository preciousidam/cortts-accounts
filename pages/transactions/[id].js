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
import {TransTable} from '../../components/table/transactions';



const useStyles = makeStyles({
    credit: {
      background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3 5 2 rgba(#85c226, .3)',
      color: 'white',
      padding: '10px 30px',
      margin: '0 10px',
    },
    debit: {
      background: 'linear-gradient(45deg, #93291E 30%, #ED213A 90%)',
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3 5 2 rgba(#ED213A, .3)',
      color: 'white',
      padding: '10px 30px',
      margin: '0 10px',
    },
    pdf: {
        background: '#ffffff',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(#85c226, .3)',
        color: '#000000',
        padding: '10px 30px',
        margin: '0 10px',
      },
});

const { Option } = Select;
const {RangePicker} = DatePicker;

export function Transactions({AcctDetails}){

    const {acctDetail, transactions} = AcctDetails;
    const [trans, setTrans] = useState(transactions);
    const classes = useStyles();
    

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

    return (
        <MainLayout title="Acct Details">
            <div className="body">
                <div id='top'>
                    <div>
                    
                        
                    
                    </div>
                    <div>
                        <Button onClick={_ => setOpen(!open)} className={classes.debit}  > Debit</Button>
                        <Button onClick={_ => setOpen(!open)} className={classes.credit}  >Credit </Button>
                    </div>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All Transactions</h4>
                            <RangePicker
                                className="date-sort"
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                onOk={onOk}
                                id="date"
                            />
                            {filter()}
                        </header>
                        <TransTable data={trans} />
                    </Paper>
                </CustomScroll>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Transactions);

export async function getStaticPaths(){
    const paths = getAllAcct();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const AcctDetails = getAcctDetails(params.id);
    
    return {
        props: {AcctDetails}
    }
}