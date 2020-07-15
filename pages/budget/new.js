import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';

import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import {StyledInput} from '../../components/textinput/styledTextInput';




export default function New() {

    const [items, setItems] = useState([]);

    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value;
        let qty = parseInt(document.getElementById('qty').value);
        let rate = parseInt(document.getElementById('amount').value);
        let amount = qty*rate;
        setItems([...items,{desc,qty,rate,amount}]);
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
        <MainLayout title="budget" actionFooter={true}>
            <div className="body">
                <div className="container-fluid">
                    <Paper className="container cont">
                        <div className="item-cont">
                            <div className="list-cont">
                                <header>
                                    <Typography className="text" color="textPrimary">Items</Typography>
                                    <Typography className="text" color="textPrimary"> <span>&#8358;</span> {getTotal()}</Typography>
                                </header>
                                <section className="list">
                                    <div className="row">
                                        <div className="col-1"><span>#</span></div>
                                        <div className="col-5"><span>Description</span></div>
                                        <div className="col-1"><span>Qty</span></div>
                                        <div className="col-2"><span>Rate</span></div>
                                        <div className="col-2"><span>Amount</span></div>
                                        <div className="col-1"><span>Action</span></div>
                                    </div>
                                    {
                                        items.map(({desc,qty,rate,amount},i)=>(
                                            <div key={i} className="row">
                                                <div className="col-1"><span>{i+1}</span></div>
                                                <div className="col-5"><span>{desc}</span></div>
                                                <div className="col-1"><span>{qty}</span></div>
                                                <div className="col-2"><span>{rate}</span></div>
                                                <div className="col-2"><span>{amount}</span></div>
                                                <div className="col-1">
                                                    <IconButton onClick={()=>deleteitem(i)}><DeleteOutline /></IconButton>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </section>
                            </div>
                            <div className="form">
                                <StyledInput label="Description" id="desc" placeholder="Description" type="text" />
                                <StyledInput label="Quantity" id="qty" type="number" max={20} min={1} />
                                <StyledInput label="Amount" id="amount" placeholder="Amount" type="text" />
                                <button className="btn btn-success" onClick={handleAdd}>Add Item</button>

                            </div>
                        </div>
                        
                    </Paper>
                </div>
            </div>
        </MainLayout>
    );
}