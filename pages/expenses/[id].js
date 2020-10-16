import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline, Done} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import { DatePicker, Checkbox, Button } from 'antd';
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
import {NameFromId} from '../../components/datatext'; 
import {withSwr, withDynamicData} from '../../utility/hoc';


const Accounts = withSwr(SelectInput, 'expense/account/');


const categoryForm = ({add, loading}) => {
    const [title, setTitle] = useState('');

    const onClick = _ => {
        add({title});
        setTitle('');
    }
    return (<div>
        <StyledInput type="text" placeholder="category" id="cate" value={title} onChange={e => setTitle(e.target.value)} />
        <Button loading={loading} type="primary" onClick={onClick}>Add</Button>
    </div>)
}


const staffForm = ({add, loading}) => {
    const [name, setName] = useState('');

    const onClick = _ => {
        add({name});
        setName('');
    }
    return (<div>
        <StyledInput type="text" placeholder="name" id="staff" value={name} onChange={e => setName(e.target.value)} />
        <Button loading={loading} type="primary" onClick={onClick}>Add</Button>
    </div>)
}

const Staff = withDynamicData(staffForm, 'routes/staff/');
const Categories = withDynamicData(categoryForm, 'routes/categories/');


export function Id() {

    
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);
    const methods = [{value: 1, text: 'cash'},{value: 2, text: 'transfer'},{value: 3, text: 'cheque'},]
    const {token} = useAuth();
    const router = useRouter();
    const {id} = router.query;
    const [acct, setAcct] = useState(null);
    const [deletedItem, setDeletedItem] = useState([]);
    const accounts = getViewData('expense/account/');
    const {data,isError,isLoading} = getViewData(`expense/${id}`);
    

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

    
    return (
        <MainLayout title="New Expense" actionFooter={true}>
            <div className="body">
                <div id='top'>
                    <div id="left">
                        
                            <Staff 
                                value={data ? data.recipient : 0 } 
                                button
                                defaultChoice="Choose Payee" 
                                id="recipient"
                                containerStyle={{margin: 0}}
                            />
                        
                        <div>
                            <Accounts  
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
                                                        <Categories 
                                                            onChange={value => onTextChange(value, 'category')} 
                                                            value={items[editing].category || ''} 
                                                            id="category" 
                                                            defaultChoice="select category"
                                                            button
                                                        />
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
                                                        <td><NameFromId id={category} link="routes/categories" /></td>
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