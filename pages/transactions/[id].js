import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Radio, Select, Space, DatePicker, Modal, notification } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {CommaFormatted} from '../../utility';
import {TransTable} from '../../components/table/transactions';
import {StyledInput} from '../../components/textinput/styledTextInput';
import {getViewData} from '../../lib/hooks';
import useAuth from '../../provider';
import {setTran} from '../../utility/fetcher';
import Loader from '../../components/loader';



export function Id(){

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
    
    const {token} = useAuth();

    const router = useRouter();

    const { id } = router.query;
    const { data, isLoading, isError, mutate } = getViewData(`accounts/${id}`);

    const [trans, setTrans] = useState([]);
    const classes = useStyles();
    const [type, setType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(moment(new Date(),"DD-MM-YYYY"));
    const [cheTran, setCheTran] = useState('cheque');
    const [filter, setFilter] = useState({date: [moment('01-01-2020', 'DD-MM-YYYY'), moment(new Date('09-12-2021'), 'DD-MM-YYYY')],transType: 'all'});


    const dataLoaded = () => {
        if(!isLoading && data){
            const transactions = data?.transactions;
            if(transactions)
                setTrans(transactions);
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


    const onChange = (value, dateString) => {
        //console.log('Selected Time: ', value);
        //console.log('Formatted Selected Time: ', dateString);
        setFilter({...filter,date: value});
    }
      
    const onOk = (value) => {
        console.log('onOk: ', value);
    }

    const handleChange = value => {
        setFilter({...filter, transType: value});
    }


    const filterView = () => (<Space>
            <Select defaultValue={filter.transType} onChange={handleChange} className="filter">
                <Option value="all">All</Option>
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
                <Option value="transfer">Transfer</Option>
            </Select>
        </Space>);

    const total = typ => {
        let total = 0.0

        if (data){
            data.transactions.forEach(({transType,amount}) => {
                if(transType == typ )
                    total += parseFloat(amount);
            });
        }
        return parseFloat(total).toFixed(2);
    }


    const handleOk = async () => {
        setLoading(true);
        const acct_id = data.id;
        const beneficiary = document.getElementById('bene').value;
        const dat = date;
        const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
        const description = `${document.getElementById('description').value} via ${cheTran}`;
        const transType = type

        const {msg, status, data} = await setTran({acct_id,beneficiary,date: date,amount,description, transType}, token);
        if( status == 'success'){
            mutate({...data, transactions: data});
            clear();
        }
        openNotification(status,msg);
        setLoading(false);
        setShowModal(false);
    };

    const clear = () => {
        document.getElementsByTagName('input').value = ""
    }
    
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
                            <span>Balance</span>
                            <p>&#8358; {CommaFormatted(data? data.balance : '0.00')}</p>
                        </div>
                    
                    </div>
                    <div id="right">
                        <Button onClick={_ => handle('debit')} className={classes.debit}  > Debit</Button>
                        <Button onClick={_ => handle('credit')} className={classes.credit}  >Credit </Button>
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
                        <TransTable data={trans} filter={filter} />
                    </Paper>
                </CustomScroll>: isError ? <h1>Something Happened</h1>: <Loader />}
                <Modal
                    title={`${type == 'credit'? 'Credit': 'Debit'} Transaction`}
                    visible={showModal}
                    onOk={handleOk}
                    confirmLoading={loading}
                    onCancel={handleCancel}
                >
                    {type == 'debit' ? <DebitForm acct={data} setDate={setDate} cheTran={cheTran} setCheTran={setCheTran} /> 
                                    : <CreditForm acct={data} setDate={setDate} cheTran={cheTran} setCheTran={setCheTran} />}
                </Modal>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Id);


const DebitForm = ({acct, setDate, cheTran, setCheTran}) =>{
    
    return (
        <div>
            <StyledInput id="id" type="text" value={`${acct.bank}(${acct.name} - ${acct.number})`} disabled={true} />
            <StyledInput type="text" id="bene" placeholder="beneficiary" />
            <div className="sideByside">
                <StyledInput id="amount" type="number" placeholder="Amount" />
                <DatePicker format="DD-MM-YYYY" defaultValue={moment(new Date(), 'DD-MM-YYYY')} onChange={(date, dateString) => setDate(dateString)} />
            </div>
            <StyledInput id="description" type="text" placeholder="description" />
            <span>Transaction done by?  </span>
            <Radio.Group value={cheTran} onChange={e => setCheTran(e.target.value)}>
                <Radio value={'cheque'}>Cheque</Radio>
                <Radio value={'transfer'}>Transfer</Radio>
            </Radio.Group>
        </div>
    );
}

const CreditForm = ({acct, setDate, cheTran, setCheTran}) =>{
    return (
        <div>
            <StyledInput type="text" placeholder="sender" id="bene" />
            <StyledInput id="id" type="text" value={`${acct.bank}(${acct.name} - ${acct.number})`} disabled={true} />
            <div className="sideByside">
                <StyledInput id="amount" type="number" placeholder="Amount" />
                <DatePicker format="DD-MM-YYYY" defaultValue={moment(new Date(), 'DD-MM-YYYY')} onChange={(date, dateString) => setDate(dateString)} />
            </div>
            <StyledInput id="description" type="text" placeholder="description" />
            <span>Transaction done by?  </span>
            <Radio.Group value={cheTran} onChange={e => setCheTran(e.target.value)}>
                <Radio value={'cheque'}>Cheque</Radio>
                <Radio value={'transfer'}>Transfer</Radio>
            </Radio.Group>
        </div>
    );
}