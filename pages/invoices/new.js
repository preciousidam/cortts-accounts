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
import { company as cp} from '../../constants/data';
import {FooterWithButton} from '../../components/footer';
import {getViewData} from '../../lib/hooks';
import {setData} from '../../utility/fetcher';
import useAuth from '../../provider';
import {openNotification} from '../../components/notification';
import Loader from '../../components/loader';
import Money from '../../components/money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const row = [
    {
        desc: "Rent of 1 unit of 2 bedroom apartment with maid's unit (unit 2D) in Bluewater view on the 4th floor",
        amount: 15000000.00,
        unit: 2,
    },
    {
        desc: "Service charge deposit for 2 bedroom apartment at Bluewater - Sapphire Towers",
        amount: 600000.00,
        unit: 2,
    },
    {
        desc: "Caution fees payable for 2 bedroom apartment at apartment",
        amount: 600000.00,
        unit: 2,
    }
]

const Client = DataSelectInput('contacts/clients/');

export const New = () => {
    const [client, setClient] = useState();
    const {data: clientDetail, isLoading: clientLoaded} = getViewData(`contacts/clients/${client}`);
    const [accounts, setAccounts] = useState([]);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({});
    const date = moment(new Date()).format('Do MMMM, YYYY');


    const onChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        setNewItem(prev => ({...prev, [name]: value}))
    }

    const addToList = _ => {
        if(!newItem.desc || !newItem.amount || !newItem.qty)
            return
        setItems(prev => [...prev, newItem]);
        setNewItem({});
        clearFields();
    }

    const calcTotal = list => {
        let total = 0;
        for (let item of list){
            total += parseFloat(item?.amount*item?.qty)
        }

        return total.toFixed(2) || '0.00';
    }


    const clearFields = _ => {
        let inputElements = document.getElementsByTagName('input')

        for (var i=0; i < inputElements.length; i++) {
            if (inputElements[i].type == 'text') {
                inputElements[i].value = '';
            }
        }
    }
    
    const cancel = _ => {
        setNewItem({});
        clearFields();
    }

    return (
        <MainLayout title="budget">
            <div className="body" id="body">
                <CustomScroll heightRelativeToParent="calc(100%)" flex={1}>
                    <div id="invoice">
                        <div id="actor">
                            <header>
                                <h5>Invoice Details</h5>
                                <Popover placement="bottomRight" title="Select Item" >
                                    <IconButton>
                                        <FontAwesomeIcon icon="plus" size="lg" />
                                    </IconButton>
                                </Popover>
                            </header>
                            <section>
                                <header className="section-head">
                                    <h6>Client</h6>
                                </header>
                                <div id="client">
                                    <Client name="client" onChange={e => setClient(e)} />
                                </div>
                            </section>
                            <section>
                                <header className="section-head">
                                    <h6>ITEMS</h6>
                                </header>
                                <div className="list">
                                    <div className="header">
                                        <div className="h-desc"><p>Description</p></div>
                                        <div className="h-amt"><p>Amount</p></div>
                                        <div className="h-qty"><p>Qty</p></div>
                                        <div className="h-act"><p>Total (&#8358;)</p></div>
                                    </div>
                                    {items.length > 0 && items.map(({desc, amount, qty}) => (<div className="list-item">
                                        <div className="desc">
                                            <p>{desc}</p>
                                        </div>
                                        <div className="amount">
                                            <p>{amount}</p>
                                        </div>
                                        <div className="qty">
                                            <p>{qty}</p>
                                        </div>
                                        <div className="total">
                                            <Money 
                                                amount={
                                                    CommaFormatted(
                                                        parseFloat(amount*qty).toFixed(2)
                                                    )|| '0.00'
                                                } 
                                            />
                                        </div>
                                    </div>))}
                                    <div className="list-item">
                                        <div className="desc">
                                            <StyledInput name='desc' value={newItem?.desc} onChange={onChange}  />
                                        </div>
                                        <div className="amount">
                                            <StyledInput name='amount' value={newItem?.amount} onChange={onChange} />
                                        </div>
                                        <div className="qty">
                                            <StyledInput name='qty' value={newItem?.qty} onChange={onChange} />
                                        </div>
                                        <div className="total">
                                            <Money 
                                                amount={
                                                    CommaFormatted(
                                                        parseFloat(newItem.amount*newItem.qty).toFixed(2)
                                                    )|| '0.00'
                                                } 
                                            />
                                        </div>
                                    </div>
                                    <div className="action">
                                        <button className='add' onClick={addToList}>Add Row</button>
                                        <button className='cancel' onClick={cancel}>Cancel</button>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <header className="section-head">
                                    <h6>Accounts</h6>
                                </header>
                                <div className="list">
                                    <div className="header">
                                        <div className="h-desc"><p>Description</p></div>
                                        <div className="h-amt"><p>Account No.</p></div>
                                        <div className="h-qty"><p>Bank</p></div>
                                    </div>
                                    {accounts.length > 0 && accounts.map(({desc, account, bank}) => (<div className="list-item">
                                        <div className="desc">
                                            <p>{desc}</p>
                                        </div>
                                        <div className="account">
                                            <p>{account}</p>
                                        </div>
                                        <div className="bank">
                                            <p>{bank}</p>
                                        </div>
                                    </div>))}
                                    <div className="list-item">
                                        <div className="desc">
                                            <StyledInput name='desc' value={newItem?.desc} onChange={onChange}  />
                                        </div>
                                        <div className="amount">
                                            <StyledInput name='amount' value={newItem?.amount} onChange={onChange} />
                                        </div>
                                        <div className="qty">
                                            <StyledInput name='qty' value={newItem?.qty} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="action">
                                        <button className='add' onClick={addToList}>Add Account</button>
                                        <button className='cancel' onClick={cancel}>Cancel</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    
                        <div id="preview">
                            <div id="logo"><img src="/images/logo-inv.png" alt="logo" /></div>
                            <div id="con-num">
                                {!clientLoaded && <div id="client">
                                    <h6>Bill To</h6>
                                    <h5>{clientDetail?.name}</h5>
                                    <p>{clientDetail?.address}</p>
                                </div>}
                                <div id="inv-num">
                                    <h1>INVOICE</h1>
                                    <div id="date">
                                        <div>
                                            <span>Invoice Number</span>
                                            <p>123456789</p>
                                        </div>
                                        <div>
                                            <span>Date</span>
                                            <p>{date}</p>
                                        </div>
                                        <div>
                                            <span>RC Number</span>
                                            <p>123456</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>DESCRIPTION</th>
                                        <th>UNIT PRICE</th>
                                        <th>QTY</th>
                                        <th>TOTAL (&#8358;)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items?.map(({desc,amount,qty}, i) => (
                                        <tr>
                                            <td className="five">{i+1}</td>
                                            <td className="seventy">{desc}</td>
                                            <td className="ten"><Money amount={CommaFormatted(parseFloat(amount).toFixed(2))} /></td>
                                            <td className="five">{qty}</td>
                                            <td className="ten"><Money amount={CommaFormatted(parseFloat(amount*qty).toFixed(2))} /></td>
                                        </tr>
                                    ))}
                                    <tr id="total">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total</td>
                                        <td><Money amount={CommaFormatted(calcTotal(items))} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <footer>
                                <div id="sign">
                                    <p>Aminat Adetoro</p>
                                </div>
                                <div id="contact">
                                    <p>Block 101, Plot 7 Furo Ezimora Street,</p>
                                    <p>Lekki Phase 1, Lagos.</p>
                                    <p>www.cortts.com</p>
                                    <p>T: 01-2770177-9, 08099934602</p>
                                </div>
                            </footer>
                        </div>
                    </div>
                </CustomScroll>
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(New);