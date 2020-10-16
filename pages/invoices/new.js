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



export function New() {


    return (
        <MainLayout title="budget">
            <div className="body">
                <div id='top'>
                    <div id="left">
                        <div className="float-left">
                            <SelectInput options={[]} defaultChoice="Choose tenant" id="recipient" />
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
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(New);