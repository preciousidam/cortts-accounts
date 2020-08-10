import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Select, Space, DatePicker, Modal } from 'antd';
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
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {accounts} from '../../constants/data';



export function Id({AcctDetails}){

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

    const {acctDetail, transactions} = AcctDetails;
    const [trans, setTrans] = useState(transactions);
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

    const total = typ => {
        let total = 0.0

        transactions.forEach(({type,amount}) => {
            if(type == typ )
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
        <MainLayout title="Acct Details">
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div>
                            <span>Credit</span>
                            <p>&#8358; {CommaFormatted(total('credit'))}</p>
                        </div>
                        <div>
                            <span>Debit</span>
                            <p>&#8358; {CommaFormatted(total('debit'))}</p>
                        </div>
                        <div>
                            <span>Transfer</span>
                            <p>&#8358; {CommaFormatted(total('transfer'))}</p>
                        </div>
                    
                    </div>
                    <div id="right">
                        <Button onClick={_ => handle('debit')} className={classes.debit}  > Debit</Button>
                        <Button onClick={_ => handle('credit')} className={classes.credit}  >Credit </Button>
                    </div>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 90px)">
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
                            <Button className="elevated" onClick={_ => setOpen(!open)} className={classes.pdf} >Export as PDF 
                                <FontAwesomeIcon icon="file-pdf" color="#ED213A" />
                            </Button>
                        </header>
                        <TransTable data={trans} />
                    </Paper>
                </CustomScroll>
                <Modal
                    title="New Transaction"
                    visible={showModal}
                    onOk={handleOk}
                    confirmLoading={loading}
                    onCancel={handleCancel}
                >
                    {type == 'debit' ? <DebitForm acct={acctDetail} /> : <CreditForm acct={acctDetail} />}
                </Modal>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Id);

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


const DebitForm = ({acct}) =>{
    const options = accounts.map(({bank, number, name}) => ({value: number, text: `${bank}(${name} - ${number})`}))
    return (
        <div>
            <StyledInput label="From" type="text" value={`${acct.bank}(${acct.name} - ${acct.no})`} disabled={true} />
            <SelectInput label="To" options={options} defaultChoice="select account"/>
            <StyledInput type="number" placeholder="Amount" />
            <StyledInput type="text" placeholder="Description" />
        </div>
    );
}

const CreditForm = ({acct}) =>{
    const options = accounts.map(({bank, number, name}) => ({value: number, text: `${bank}(${name} - ${number})`}))
    return (
        <div>
            <SelectInput label="From" options={options} defaultChoice="select account"/>
            <StyledInput label="To" type="text" value={`${acct.bank}(${acct.name} - ${acct.no})`} disabled={true} />
            <StyledInput type="number" placeholder="Amount" />
            <StyledInput type="text" placeholder="Description" />
        </div>
    );
}