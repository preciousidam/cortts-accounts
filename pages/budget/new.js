import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';
import { notification } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';


import MainLayout from "../../layouts/mainLayout";
import {StyledInput} from '../../components/textinput/styledTextInput';
import {ProtectRoute} from '../../utility/route';
import {FooterWithButton} from '../../components/footer';
import {setData} from '../../utility/fetcher';
import useAuth from '../../provider';
import {CommaFormatted} from '../../utility';


export function New() {

    const [items, setItems] = useState([]);
    const {token} = useAuth();
    const router = useRouter();


    const handleAdd = (e) =>{
        let desc = document.getElementById('desc').value;
        let qty = parseInt(document.getElementById('qty').value);
        let rate = parseInt(document.getElementById('amount').value);
        let amount = qty*rate;
        if(desc != '' && qty != NaN && rate != NaN){
            setItems([...items,{desc,qty,rate,amount: parseFloat(amount).toFixed(2)}]);
            clearField();
        }
    }

    const openNotification = (status,msg) => {
        notification.open({
          message: status,
          description: msg,
          icon: status == 'success' ? <CheckCircleOutlined style={{ color: '#00ff00' }} /> : <CloseCircleOutlined style={{ color: '#ff0000' }} />,
        });
    };

    const save = async _ => {
        const date = moment(new Date(), "DD-MM-YYYY").format('DD-MM-YYYY');
        const amount = getTotal();
        const ref = parseInt(new Date().getTime().toString().slice(6,12));

        const {msg, status} = await setData('budget/create',{date,items,ref,amount},token);

        openNotification(status,msg);

        if( status == 'success'){
            router.push('/budget');
        }
        
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