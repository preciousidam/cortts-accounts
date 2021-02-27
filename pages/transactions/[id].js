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
import {useAccounts} from '../../provider';

const addTransaction = async body => {

    const {status, data} = await setData('accounts/transactions/', body);
    console.log(data)
    if( status == 200 || status === 201){
        //mt([data, ...transactions]);
        openNotification("Success","Transaction has been saved", 'success');
        return true;
    }
    for (let m in data) openNotification(m.toUpperCase(),data[m]);
    return false;
}

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
    const router = useRouter();

    
    const { selectedAcct: account, done, setSelected } = useAccounts();
    const {id} = router.query;
    
    useEffect(() => {
        setSelected(id);
    }, [])

    const classes = useStyles();
    const [type, setType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(moment(new Date(),"DD-MM-YYYY"));
    const [cheTran, setCheTran] = useState('Cheque');
    const [filter, setFilter] = useState({date: [moment('01-01-2020', 'DD-MM-YYYY'), moment(new Date('09-12-2021'), 'DD-MM-YYYY')],transType: 'all'});
    const [form, setForm] = useState({mode: 'Cheque', account: account?.id})


    const onChange = (value, dateString) => {
        setFilter({...filter,date: value});
    }
      
   

    const handleChange = value => {
        setFilter({...filter, transType: value});
    }


    const filterView = () => (
        <Space>
            <Select defaultValue={filter.transType} onChange={handleChange} className="filter">
                <Option value="all">All</Option>
                <Option value="credit">Credit</Option>
                <Option value="debit">Debit</Option>
            </Select>
        </Space>
    );

    const onChangeText = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let file = (e.target.type === 'file'&& e.target.files.length > 0) ? e.target.files[0] : null

        setForm(prev => ({...prev, [name]: file||value}));
       
    }

    const onDateChanged = (date, field) => {
        setForm(prev => ({...prev, [field]: date}));
    }

    const handleOk = async () => {
        setLoading(true);
        const acct = account?.id;
        const ben_name = document.getElementById('bene').value;
        const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
        const desc = `${document.getElementById('description').value} via ${cheTran}`;
       

        const result = await addTransaction({account: acct, ben_name, amount, desc, type, mode: cheTran});
        if( result){
            clear();
            setLoading(false);
            setShowModal(false);
        }
        setLoading(false);
    };

    const clear = () => {
        setForm({mode: 'Cheque'});
    }
    
    const handleCancel = async () => setShowModal(false);

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
                            <h5>&#8358; {CommaFormatted(parseFloat(account?.total_credit).toFixed(2))}</h5>
                        </div>
                        <div>
                            <span>Debit</span>
                            <h5>&#8358; {CommaFormatted(parseFloat(account?.total_debit).toFixed(2))}</h5>
                        </div>
                        <div>
                            <span>Opening Balance</span>
                            <h5>&#8358; {CommaFormatted(parseFloat(account?.open_balance).toFixed(2))}</h5>
                        </div>
                        <div>
                            <span>Balance</span>
                            <h5>&#8358; {CommaFormatted(parseFloat(account?.balance).toFixed(2))}</h5>
                        </div>
                    
                    </div>
                    <div id="right">
                        <Button onClick={_ => handle('debit')} className={classes.debit}  > Debit</Button>
                        <Button onClick={_ => handle('credit')} className={classes.credit}  >Credit </Button>
                    </div>
                </div>
                { (done) && <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All Transactions</h4>
                            <RangePicker
                                className="date-sort"
                                format="DD-MM-YYYY"
                                onChange={onChange}
                                
                                id="date"
                                defaultValue={filter.date}
                            />
                            {filterView()}
                            <Button className="elevated" onClick={_ => setOpen(!open)} className={classes.pdf} >Export as PDF 
                                <FontAwesomeIcon icon="file-pdf" color="#ED213A" />
                            </Button>
                        </header>
                        <TransTable filter={filter} />
                    </Paper>
                </CustomScroll>}
                <Modal
                    title={`${type == 'credit'? 'Credit': 'Debit'} Transaction`}
                    visible={showModal}
                    onOk={handleOk}
                    confirmLoading={loading}
                    onCancel={handleCancel}
                >
                    {type == 'debit' ? 
                        <DebitForm onChange={onChangeText} form={form} /> 
                        : <CreditForm  onChange={onChangeText} form={form} />}
                </Modal>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Id);


const DebitForm = ({form, onChange}) =>{
    
    return (
        <div>
            <StyledInput type="text" id="bene" placeholder="beneficiary" name="ben_name" onChange={onChange} value={form.ben_name} />
            <div className="sideByside">
                <StyledInput id="amount" type="number" placeholder="Amount" name="amount" onChange={onChange} value={form.amount} />
                <DatePicker format="DD-MM-YYYY" defaultValue={moment(new Date(), 'DD-MM-YYYY')} onChange={(date, dateString) => setDate(dateString)} />
            </div>
            <StyledInput id="description" type="text" placeholder="description" name="desc" value={form.desc} onChange={onChange} />
            <span>Transaction done by?  </span>
            <Radio.Group value={form.mode} onChange={onChange} name="mode">
                <Radio value={'Cheque'}>Cheque</Radio>
                <Radio value={'Transfer'}>Transfer</Radio>
            </Radio.Group>
        </div>
    );
}

const CreditForm = ({ form, onChange }) =>{
    
    return (
        <div>
            <StyledInput type="text" id="bene" placeholder="beneficiary" name="ben_name" onChange={onChange} value={form.ben_name} />
            <div className="sideByside">
                <StyledInput id="amount" type="number" placeholder="Amount" name="amount" onChange={onChange} value={form.amount} />
                <DatePicker format="DD-MM-YYYY" defaultValue={moment(new Date(), 'DD-MM-YYYY')} onChange={(date, dateString) => setDate(dateString)} />
            </div>
            <StyledInput id="description" type="text" placeholder="description" name="desc" value={form.desc} onChange={onChange} />
            <span>Transaction done by?  </span>
            <Radio.Group value={form.mode} onChange={onChange} name="mode">
                <Radio value={'Cheque'}>Cheque</Radio>
                <Radio value={'Transfer'}>Transfer</Radio>
            </Radio.Group>
        </div>
    );
}