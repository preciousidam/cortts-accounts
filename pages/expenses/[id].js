import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline, Done, Alarm} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import { DatePicker, Space, Checkbox } from 'antd';
import moment from 'moment';

import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {CommaFormatted} from '../../utility';
import {ProtectRoute} from '../../utility/route';
import {impress, staff, category} from '../../constants/data';
import {getExpenses, getRef} from '../../lib/expenses';



export function Id({expenses}) {

    const getItem = {amount: expenses.amount, category_id: expenses.category_id, desc: expenses.desc};
    const [items, setItems] = useState([{...getItem}]);
    const ref = expenses.ref;
    console.log(expenses)

    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value || '';
        let category_id = document.getElementById('category').value || '';
        let amount = parseFloat(document.getElementById('amt').value);
        
        
        if(desc != '' && cat != '' && amt != NaN){
            setItems([...items,{desc,category_id, amount}]);
            clearField();
        }
    }

    const clearField = () => {
        document.getElementById('desc').value = "";
        document.getElementById('category').value = "";
        document.getElementById('amt').value = "";
    }

    const deleteitem = (id) => {
        const filter = items.filter((x,i) => i != id);
        setItems(filter);
    }

    const getTotal = () => {
        let total = 0;

        items.forEach( ({amount}) => total += amount);
        return total;
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onCheck = e => console.log(e.target.checked)

    const options = staff.map(({id, name}) => ({value: id, text: name}));
    const acct = [{value: 1, text: 'Impress'}];
    const methods = [{value: 1, text: 'cash'},{value: 2, text: 'transfer'},{value: 3, text: 'cheque'},]
    const cat = category.map(({id, name}) => ({value: id, text: name}));

    const getCat = i => {
        let cat = category.find(({id}) => id == i);
        return cat.name || '';
    };

    const calcTotal = _ => {
        let total = 0.00;
        items.forEach(({amount}) => total += amount);
        return parseFloat(total).toFixed(2) || '0.00';
    }

    const avalBal = _ => {
        let bal = parseFloat(impress.balance) - parseFloat(calcTotal());

        return bal.toFixed(2) || '0.00';
    }
    
    return (
        <MainLayout title="New Expense" actionFooter={true}>
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div className="float-left">
                            <SelectInput options={options} defaultChoice="Choose Payee" />
                        </div>
                        <div>
                            <SelectInput value={1} options={acct} defaultChoice="Select Account" />
                        </div>
                        <div>
                            <h5>Balance: &#8358; {CommaFormatted(avalBal())}</h5>
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
                                <DatePicker format="DD-MM-YYYY" defaultValue={moment(expenses.date, 'DD-MM-YYYY')} onChange={onChange} />
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(({category_id, desc, amount}, i) => 
                                    (<tr key={i}>
                                        <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                        <td>{i+1}</td>
                                        <td>{getCat(category_id)}</td>
                                        <td>{desc}</td>
                                        <td>{amount}</td>
                                        <td><IconButton className="del" onClick={e => deleteitem(i)}><DeleteOutline  /></IconButton></td>
                                    </tr>))}
                                
                                <tr key={1000000}>
                                    <td><Checkbox className="all" onChange={onCheck}></Checkbox></td>
                                    <td>{items.length+1}</td>
                                    <td><SelectInput id="category" options={cat} defaultChoice="select category" /></td>
                                    <td><StyledInput id="desc" placeholder="Description" type="text" /></td>
                                    <td><StyledInput id="amt" placeholder="amount" type="number" /></td>
                                    <td><IconButton onClick={handleAdd} className="done"><Done /></IconButton></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CustomScroll>
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Id);

export async function getStaticPaths(){
    const paths = getRef();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const {expenses} = getExpenses(params.id);
    
    return {
        props: {expenses}
    }
}