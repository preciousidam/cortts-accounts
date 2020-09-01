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
import { company as cp} from '../../constants/data';
import {FooterWithButton} from '../../components/footer';
import {getViewData} from '../../lib/hooks';
import {setData} from '../../utility/fetcher';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import Loader from '../../components/loader';



export function Id() {

    
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);
    let ref = null;
    const methods = [{value: 1, text: 'cash'},{value: 2, text: 'transfer'},{value: 3, text: 'cheque'},]
    const {token} = useAuth();
    const router = useRouter();
    const {id} = router.query;
    const [acct, setAcct] = useState(null);
    const [deletedItem, setDeletedItem] = useState([]);
    const accounts = getViewData('expense/account/');
    const staff = getViewData('routes/staff');
    const categories = getViewData('routes/categories');
    const {data,isError,isLoading} = getViewData(`expense/${id}`);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (acct != null) return;
        if(!accounts.isLoading && accounts.data) setAcct(accounts.data[0])
    },[acct, accounts]);

    let opt = accounts.isLoading ? [] : accounts.data.map(({id, name}) => ({text: name, value: id}));
    let cat = categories.isLoading ? [] : categories.data.map(({id, title}) => ({text: title, value: id}));
    let staffOpt = staff.isLoading ? [] : staff.data.map(({id, name}) => ({text: name, value: id}));

    const dataLoaded = () => {
        if(!isLoading && data ){
            const its = data?.items;
            if(its){
                setItems([...its,{}]);
            }
        }
    }

    useEffect(() => {
        if (acct != null) return;
        if(!accounts.isLoading && accounts.data) setAcct(accounts.data[0])
    },[acct, accounts]);

    useEffect(() => {
        if (items.length != 0) return
            
        dataLoaded();
    },[data]);

    useEffect(() => {
        if (editing == null && items.length > 0 ) setEditing(items.length - 1);
    },[items]);

    const handleAdd = (e) =>{
        if (editing != items.length - 1) setEditing(items.length -1);
        else{ 
            setItems([...items,{}]);
            setEditing(null);
        }
    }


    const deleteitem = (id) => {
        const item = items[id];
        if(item.hasOwnProperty('id'))
            setDeletedItem([...deletedItem,item]);

        const filter = items.filter((x,i) => i != id);
        setItems(filter);
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onCheck = e => console.log(e.target.checked);

    const save = async _ => {
        const itemsdata = items.filter((x,id) => id != items.length-1)
        const {msg, status} = await setData('expense/edit',{...data, amount: calcTotal(),items: itemsdata,deletedItem},token);

        openNotification(status,msg);

        if( status == 'success'){
            router.push('/expenses');
        }
        
    }

    const discard = _ => router.push('/budget');
    const optAct = [{text: 'Discard and Close', action: discard},{text: 'Save and Close', action: save},];

    const getCat = i => {
        let selCat = cat.find(({value}) => value == i);
        return selCat ? selCat.text : '';
    };

    const getName = i => {
        let cat = cp.find(({value}) => parseInt(value) == i);
        return cat ? cat.text : '';
    };

    const calcTotal = _ => {
        let total = 0.00;
        items.forEach(({amount}) => total += parseFloat((amount != undefined && amount != '')  ? amount : 0));
        return parseFloat(total).toFixed(2) || '0.00';
    }

    

    const onTextChange = (value, id) => {
        const edit = items[editing];
        edit[id] = value.target.value;
        let newItems = [];
        items.forEach((x,i) => {
            if(i == editing) newItems.push(edit);
            else newItems.push(x);
        });
        setItems(newItems);
    }

    const selectAcct = aid => setAcct(accounts.data.find(({id})=> id == aid));

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
                            <SelectInput 
                                value={data ? data.recipient : 0 } 
                                options={staffOpt} 
                                defaultChoice="Choose Payee" 
                                id="recipient" 
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
                            <SelectInput 
                                options={opt} 
                                onChange={e => selectAcct(e.target.value)} 
                                value={!isLoading && data ? data.account : null} 
                                defaultChoice="expense acct"
                                disabled
                            />
                        </div>
                        <div>
                            <h5>Balance: &#8358; {acct ? CommaFormatted(acct.balance): '0.00'}</h5>
                        </div>
                    </div>
                    <div id="right">
                        <div id="total-cont">
                            <span>Amount</span>
                            <h4 id="total">&#8358; {CommaFormatted(calcTotal())}</h4>
                        </div>
                    </div>
                </div>
                {!isLoading ? <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                    <div id="extra">
                        <div>
                            <div id="date">
                                <span>Payment Date</span>
                                <DatePicker 
                                    onChange={onChange}
                                    format="DD-MM-YYYY" 
                                    defaultValue={moment(data.date, 'DD-MM-YYYY')} 
                                />
                            </div>
                            <div id="method">
                                <span>Payment Method</span>
                                <SelectInput 
                                    value={data.payMethod} 
                                    options={methods} 
                                    defaultChoice="select method" 
                                    id="met" 
                                />
                            </div>
                        </div>
                        
                        <div id="ref-cont">
                            <span>Ref No#</span>
                            <StyledInput placeholder='ref' type="text" value={data.ref} id="ref" />
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
                                        {      
                                            if (i == editing){
                                                return(
                                                    <tr key={1000000}>
                                                    <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                                    <td>{i+1}</td>
                                                    <td className="sBs">
                                                        <SelectInput 
                                                            onChange={value => onTextChange(value, 'category')} 
                                                            value={items[editing].category || ''} 
                                                            id="category" 
                                                            options={cat} 
                                                            defaultChoice="select category" 
                                                        />
                                                        <Popover 
                                                            trigger='click'
                                                            content={categoryForm}
                                                        >
                                                            <IconButton><PlusOutlined /></IconButton> 
                                                        </Popover>
                                                    </td>
                                                    <td>
                                                        <StyledInput 
                                                            onChange={value => onTextChange(value, 'description')}
                                                            value={items[editing].description || ''} 
                                                            id="desc" 
                                                            placeholder="Description" 
                                                            type="text" 
                                                        />
                                                    </td>
                                                    <td>
                                                        <StyledInput
                                                            onChange={value => onTextChange(value, 'amount')}
                                                            value={items[editing].amount || ''} 
                                                            id="amt" 
                                                            placeholder="amount" 
                                                            type="number" 
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectInput
                                                            onChange={value => onTextChange(value, 'company')}
                                                            value={items[editing].company || ''} 
                                                            id="company" 
                                                            defaultChoice="Company" 
                                                            options={cp} 
                                                        />
                                                    </td>
                                                    <td><IconButton onClick={handleAdd} className="done"><Done /></IconButton></td>
                                                </tr>)
                                            }
                                            return (<tr onClick={_ => setEditing(i)} key={i}>
                                                        <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                                        <td>{i+1}</td>
                                                        <td>{getCat(category)}</td>
                                                        <td>{description}</td>
                                                        <td>&#8358; {CommaFormatted(parseFloat(amount).toFixed(2))}</td>
                                                        <td>{getName(company)}</td>
                                                        <td><IconButton className="del" onClick={e => deleteitem(i)}><DeleteOutline  /></IconButton></td>
                                                    </tr>)
                                        })}
                                
                            </tbody>
                        </table>
                    </div>
                </CustomScroll>: isError ? <h1>Something Happened</h1>: <Loader />}
                <FooterWithButton action={optAct} />
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Id);