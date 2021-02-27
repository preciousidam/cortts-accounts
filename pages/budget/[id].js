import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';


import MainLayout from "../../layouts/mainLayout";
import {StyledInput} from '../../components/textinput/styledTextInput';
import {ProtectRoute} from '../../utility/route';
import {FooterWithButton} from '../../components/footer';
import {editData, setData} from '../../utility/fetcher';
import useAuth from '../../provider';
import {CommaFormatted} from '../../utility';
import { openNotification } from '../../components/notification';
import { getViewData } from '../../lib/hooks';


export function New() {
    
    const [items, setItems] = useState([]);
    const router = useRouter();
    const {id} = router.query;
    const {data, isLoading} = getViewData(`budgets/${id}/`)

    useEffect(() => {
        if (!isLoading && data){
            setItems(data?.items)
        }
    }, [data, isLoading])

    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value;
        let qty = parseInt(document.getElementById('qty').value);
        let amount = parseInt(document.getElementById('amount').value);
        
        if(desc != '' && qty != NaN && amount != NaN){
            setItems([...items,{description: desc, quantity:qty, amount}]);
            clearField();
        }
    }


    const save = async _ => {

        const {data, status} = await editData(`budgets/${id}/`,{...data, items});
        if (status === 200 || status === 201){
            router.push('/budget');
            return;
        }

        for(let item in data)
            openNotification(item.toUpperCase(), data[item]);
    }

    const discard = _ => router.push('/budget');   

    const options = [{text: 'Save and Close', action: save},{text: 'Discard and Close', action: discard}];

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

        items.forEach( ({amount}) => total += parseFloat(amount));
        return parseFloat(total).toFixed(2);
    }

    return (
        <MainLayout title="budget" actionFooter={true}>
            <div className="body">
                <CustomScroll>
                    <div className="container-fluid">
                        <Paper className="container cont">
                            <div className="item-cont">
                                <div className="list-cont">
                                    <header>
                                        <Typography className="text" color="textPrimary">Items</Typography>
                                        <Typography className="text" color="textPrimary"> <span>&#8358;</span> {CommaFormatted(getTotal())}</Typography>
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
                                            items.map(({description,quantity,amount},i)=>(
                                                <div key={i} className="row">
                                                    <div className="col-1"><span>{i+1}</span></div>
                                                    <div className="col-5"><span>{description}</span></div>
                                                    <div className="col-1"><span>{quantity}</span></div>
                                                    <div className="col-2"><span>{amount}</span></div>
                                                    <div className="col-2"><span>{amount*quantity}</span></div>
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
                                    <StyledInput label="Amount" id="amount" placeholder="Amount" type="number" />
                                    <button className="btn btn-success" onClick={handleAdd}>Add Item</button>

                                </div>
                            </div>
                            
                        </Paper>
                    </div>
                    
                </CustomScroll>
                <FooterWithButton action={options} />
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(New);