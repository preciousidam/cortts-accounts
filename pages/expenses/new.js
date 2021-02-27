import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline, Done} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import { DatePicker, Checkbox, message, Popover, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useRouter} from 'next/router';


import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput, DataSelectInput} from '../../components/textinput/styledTextInput';
import {CommaFormatted} from '../../utility';
import {ProtectRoute} from '../../utility/route';
import {getViewData} from '../../lib/hooks';
import {FooterWithButton} from '../../components/footer';
import {setData} from '../../utility/fetcher';
import {openNotification} from '../../components/notification';
import {NameFromId} from '../../components/datatext';
import { mutate } from 'swr';
import Money from '../../components/money';

export const Category = DataSelectInput('categories/');
export const Company = DataSelectInput('companies/');
export const Staff = DataSelectInput('staff/');
export const Account = DataSelectInput('accounts/expenses/');

export function New() {
    
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState({});
    const [item, setItem] = useState({});
    const onChangeText = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setItem(prev => ({...prev, [name]: value}))
    }
    
    const onCategory = e => {
        setItem(prev => ({...prev, category: e}))
    }

    const onCompany = e => {
        setItem(prev => ({...prev, company: e}))
    }

    const methods = [{value: 1, text: 'Cash'},{value: 2, text: 'Transfer'},{value: 3, text: 'Cheque'},]
    const router = useRouter();


    const [processing, setProcessing] = useState(false);

    
    const handleAdd = (e) =>{
        if(!item.description || !item.category || !item.amount){
            message.warning('All field except company cannot be empty');
            return;
        }
        setItems(prev => ([...prev,item]));
        
    }

    useEffect(() => {
        setItem({});
        setDetails(prev => ({...prev, items}))
    }, [items])

    const deleteitem = (id) => {
        const filter = items.filter((x,i) => i != id);
        setItems(filter);
    }

    const onChange = (date, dateString) => {
        setDetails(prev => ({...prev, date: dateString}));
    }

    const onCheck = e => console.log(e.target.checked);

    const save = async _ => {
        const date = moment(new Date(), "YYYY-MM-DD").format('YYYY-MM-DD');
        console.log(details)

        if (!details.recipient){
            message.warning('Select a Payee');
            return
        }
        if (!details.account){
            message.warning('Select an expense account');
            return
        }
        const {data, status} = await setData('expenses/',{...details, date: details.date || date });
        if( status === 201 || status === 200){
            openNotification('Expenses', "Data was save successfully", 'success');
            router.push('/expenses');
            return;
        }
        for (let item in data){
            openNotification(item.toUpperCase(), data[item]);
        }
        
    }

    const discard = _ => router.push('/expenses');
    const optAct = [{text: 'Discard and Close', action: discard},{text: 'Save and Close', action: save},];


    const calcTotal = _ => {
        let total = 0.00;
        items.forEach(({amount}) => total += parseFloat((amount != undefined && amount != '')  ? amount : 0));
        return parseFloat(total).toFixed(2) || '0.00';
    }

    const selectAcct = aid => setDetails(prev => ({...prev, account: aid}))

    const categoryForm = (<div>
        <StyledInput type="text" placeholder="category" id="cate" />
        <Button loading={processing} type="primary" onClick={e => addCategory()}>Add</Button>
    </div>)

    const staffForm = (<div>
        <StyledInput type="text" placeholder="name" id="staff" />
        <Button loading={processing} type="primary" onClick={e => addStaff()}>Add</Button>
    </div>)
    
    const addCategory = async _ => {
        setProcessing(true);
        const title = document.getElementById('cate').value
        const body = {title}
        const {status, data} = await setData('categories/', body);
        setProcessing(false);
        if(status === 201 || status === 200){
            message.success("Category Added")
            mutate('categories/');
            return;
        }
        for (let item in data)
            message.error(data[item]);
    }

    const addStaff = async _ => {
        setProcessing(true);
        const name = document.getElementById('staff').value
        const body = {name}
        const {status, data} = await setData('staff/', body);
        setProcessing(false);
        if(status === 201 || status === 200){
            message.success("Name Added")
            mutate('staff/');
            return;
        }
        for (let item in data)
            message.error(data[item]);
    }


    return (
        <MainLayout title="New Expense" actionFooter={true}>
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div className="float-left">
                            <Staff 
                                onChange={e => setDetails(prev => ({...prev, recipient: e}))}
                                value={details?.recipient}
                            />
                            <Popover 
                                trigger='click'
                                content={staffForm}
                                placement="bottomRight"
                            >
                                <IconButton><PlusOutlined /></IconButton> 
                            </Popover>
                        </div>
                        <div>
                            <Account
                                onChange={selectAcct}
                                value={details?.account}
                            />
                        </div>
                        <div>
                            <h5>Balance: {details?.account && <Balance id={details?.account} />}</h5>
                        </div>
                    </div>
                    <div id="right">
                        <div id="total-cont">
                            <span>Amount</span>
                            <h6 id="total">&#8358; {CommaFormatted(calcTotal())}</h6>
                        </div>
                    </div>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <div id="extra">
                        <div>
                            <div id="date">
                                <span>Payment Date</span>
                                <DatePicker 
                                    onChange={onChange}
                                    format="YYYY-MM-DD" 
                                    defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                                    value={details?.date}
                                />
                            </div>
                            <div id="method">
                                <span>Payment Method</span>
                                <SelectInput 
                                    options={methods} 
                                    defaultChoice="select method" 
                                    id="met"
                                    value={details?.pay_method}
                                    onChange={e => setDetails(prev => ({...prev, pay_method: e}))}
                                />
                            </div>
                        </div>
                        
                        <div id="ref-cont">
                            
                        </div>
                    </div>
                    <div id="new-main" className="container-fluid">
                        <table>
                            <thead>
                                <tr>
                                    <th><Checkbox id="all" onChange={onCheck}></Checkbox></th>
                                    <th>#</th>
                                    <th className="ten">Category</th>
                                    <th className="eighty">Description</th>
                                    <th className="five">Amount</th>
                                    <th className="five">Company</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(({category, description, amount, company}, i) => 
                                    (<tr key={i}>
                                        <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                        <td>{i+1}</td>
                                        <td><NameFromId id={category} link="categories" /></td>
                                        <td>{description}</td>
                                        <td>&#8358; {CommaFormatted(parseFloat(amount).toFixed(2))}</td>
                                        <td><NameFromId id={company} link="companies" /></td>
                                        <td><IconButton className="del" onClick={e => deleteitem(i)}><DeleteOutline  /></IconButton></td>
                                    </tr>))}
                                
                                <tr key={1000000}>
                                    <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                    <td>{items.length+1}</td>
                                    <td className="sBs">
                                        <Category id="category" name="category" onChange={onCategory} value={item?.category} /> 
                                        <Popover 
                                            trigger='click'
                                            content={categoryForm}
                                        >
                                            <IconButton><PlusOutlined /></IconButton> 
                                        </Popover>
                                    </td>
                                    <td><StyledInput id="desc" placeholder="Description" type="text" name="description" onChange={onChangeText} value={item?.description} /></td>
                                    <td><StyledInput id="amt" placeholder="amount" type="number" name="amount" onChange={onChangeText} value={item?.amount} /></td>
                                    <td><Company id="company" name="company" onChange={onCompany} value={item?.company} /></td>
                                    <td><IconButton onClick={handleAdd} className="done"><Done /></IconButton></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CustomScroll>
                <FooterWithButton action={optAct} />
            </div>
        </MainLayout>
    );
}

export const Balance = ({id}) => {
    const {data, isLoading} = getViewData(`accounts/expenses/${id}/`);
    
    return (!isLoading && data && <Money amount={parseFloat(data?.balance).toFixed(2)} />)
}

export default ProtectRoute(New);