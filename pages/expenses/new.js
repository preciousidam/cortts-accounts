import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';

import MainLayout from "../../layouts/mainLayout";
import {StyledInput} from '../../components/textinput/styledTextInput';
import {ProtectRoute} from '../../utility/route';




export function New() {

    const [items, setItems] = useState([]);

    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value;
        let qty = parseInt(document.getElementById('qty').value);
        let rate = parseInt(document.getElementById('amount').value);
        let amount = qty*rate;
        console.log(rate)
        if(desc != '' && qty != NaN && rate != NaN){
            setItems([...items,{desc,qty,rate,amount}]);
            clearField();
        }
    }

    const clearField = () => {
        document.getElementById('desc').value = "";
        document.getElementById('qty').value = "";
        document.getElementById('amount').value = "";
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

    return (
        <MainLayout title="New Expense" actionFooter={true}>
            <div className="body">
                
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(New);