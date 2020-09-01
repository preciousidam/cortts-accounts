import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline, Done} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import { DatePicker, Checkbox, message, Popover, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useRouter} from 'next/router';


import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {CommaFormatted} from '../../utility';
import {ProtectRoute} from '../../utility/route';
import { category, company} from '../../constants/data';
import {getViewData} from '../../lib/hooks';
import {FooterWithButton} from '../../components/footer';
import {setData} from '../../utility/fetcher';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';



export function New() {

    
    const [items, setItems] = useState([]);
    
    const ref = parseInt(new Date().getTime().toString().slice(6,12));
    
    const methods = [{value: 1, text: 'cash'},{value: 2, text: 'transfer'},{value: 3, text: 'cheque'},]
    const {token} = useAuth();
    const router = useRouter();
    const accounts = getViewData('expense/account/');
    const staff = getViewData('routes/staff');
    const categories = getViewData('routes/categories');
    const [selectedAcct, setSelectedAcct] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (selectedAcct != null) return;
        if(!accounts.isLoading && accounts.data) setSelectedAcct(accounts.data[0])
    },[selectedAcct, accounts]);

    let opt = accounts.isLoading ? [] : accounts.data.map(({id, name}) => ({text: name, value: id}));
    let cat = categories.isLoading ? [] : categories.data.map(({id, title}) => ({text: title, value: id}));
    let staffOpt = staff.isLoading ? [] : staff.data.map(({id, name}) => ({text: name, value: id}));

    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value || '';
        let category_id = document.getElementById('category').value || '';
        let amount = parseFloat(document.getElementById('amt').value);
        let company = parseFloat(document.getElementById('company').value);
        
        
        if(desc != '' && cat != '' && amt != NaN){
            setItems([...items,{desc,category_id, amount, company}]);
            clearField();
        }
        else message.warning('All field except company cannot be empty')
    }

    const clearField = () => {
        document.getElementById('desc').value = "";
        document.getElementById('category').value = "";
        document.getElementById('amt').value = "";
        document.getElementById('company').value = "";
    }

    const deleteitem = (id) => {
        const filter = items.filter((x,i) => i != id);
        setItems(filter);
    }


    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onCheck = e => console.log(e.target.checked);

    const save = async _ => {
        const date = moment(new Date(), "DD-MM-YYYY").format('DD-MM-YYYY');
        const amount = calcTotal();
        const recipient = document.getElementById('recipient').value;
        const account = document.getElementById('acct').value;
        const method = document.getElementById('met').value;

        if (recipient == 0 || recipient == '0' || recipient == ''){
            message.warning('Select a Payee');
            return
        }
        if (account == 0 || account == '0' || account == ''){
            message.warning('Select an expense account');
            return
        }
        const {msg, status} = await setData('expense/create',{date,items,ref,amount, recipient,account,method},token);

        openNotification(status,msg);

        if( status == 'success'){
            router.push('/expenses');
        }
        
    }

    const discard = _ => router.push('/budget');
    const optAct = [{text: 'Discard and Close', action: discard},{text: 'Save and Close', action: save},];

    const getCat = i => {
        let selCat = cat.find(({value}) => value == i);
        return selCat.text;
    };

    const getName = i => {
        let cat = company.find(({value}) => parseInt(value) == i);
        return cat ? cat.text : '';
    };

    const calcTotal = _ => {
        let total = 0.00;
        items.forEach(({amount}) => total += parseFloat((amount != undefined && amount != '')  ? amount : 0));
        return parseFloat(total).toFixed(2) || '0.00';
    }

    const selectAcct = aid => setSelectedAcct(accounts.data.find(({id})=> id == aid));

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
        const {status, msg, data} = await setData('routes/category/create', body,token);
        setProcessing(false);
        if(status == 'success'){
            categories.mutate([...categories.data,data]);
            message.success(msg)
        }
        else message.error(msg)
    }

    const addStaff = async _ => {
        setProcessing(true);
        const name = document.getElementById('staff').value
        const body = {name}
        const {status, msg, data} = await setData('routes/staff/create', body,token);
        setProcessing(false);
        if(status == 'success'){
            staff.mutate([...staff.data,data]);
            message.success(msg)
        }
        else message.error(msg)
    }



    return (
        <MainLayout title="New Expense" actionFooter={true}>
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div className="float-left">
                            <SelectInput options={staffOpt} defaultChoice="Choose Payee" id="recipient" />
                            <Popover 
                                trigger='click'
                                content={staffForm}
                                placement="bottomRight"
                            >
                                <IconButton><PlusOutlined /></IconButton> 
                            </Popover>
                        </div>
                        <div>
                            <SelectInput 
                                value={selectedAcct ? selectedAcct.id : 0}
                                onChange={e => selectAcct(e.target.value)}
                                options={opt} 
                                defaultChoice="Select Account" 
                                id="acct" 
                            />
                        </div>
                        <div>
                            <h5>Balance: &#8358; {CommaFormatted(selectedAcct? selectedAcct.balance: '0.00')}</h5>
                        </div>
                    </div>
                    <div id="right">
                        <div id="total-cont">
                            <span>Amount</span>
                            <h4 id="total">&#8358; {CommaFormatted(calcTotal())}</h4>
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
                                    format="DD-MM-YYYY" 
                                    defaultValue={moment(new Date(), 'MM-DD-YYYY')} 
                                />
                            </div>
                            <div id="method">
                                <span>Payment Method</span>
                                <SelectInput options={methods} defaultChoice="select method" id="met" />
                            </div>
                        </div>
                        
                        <div id="ref-cont">
                            <span>Ref No#</span>
                            <StyledInput placeholder='ref' type="text" value={ref} id="ref" />
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
                                {items.map(({category_id, desc, amount, company}, i) => 
                                    (<tr key={i}>
                                        <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                        <td>{i+1}</td>
                                        <td>{getCat(category_id)}</td>
                                        <td>{desc}</td>
                                        <td>&#8358; {CommaFormatted(amount.toFixed(2))}</td>
                                        <td>{getName(company)}</td>
                                        <td><IconButton className="del" onClick={e => deleteitem(i)}><DeleteOutline  /></IconButton></td>
                                    </tr>))}
                                
                                <tr key={1000000}>
                                    <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                    <td>{items.length+1}</td>
                                    <td className="sBs">
                                        <SelectInput id="category" options={cat} defaultChoice="select category" /> 
                                        <Popover 
                                            trigger='click'
                                            content={categoryForm}
                                        >
                                            <IconButton><PlusOutlined /></IconButton> 
                                        </Popover>
                                    </td>
                                    <td><StyledInput id="desc" placeholder="Description" type="text" /></td>
                                    <td><StyledInput id="amt" placeholder="amount" type="number" /></td>
                                    <td><SelectInput id="company" defaultChoice="Company" options={company} /></td>
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

export default ProtectRoute(New);