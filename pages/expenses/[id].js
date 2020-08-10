import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Select, Space, DatePicker, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {CommaFormatted} from '../../utility';
import {getAllAcct, getAcctDetails} from '../../lib/accounts';
import {TransTable} from '../../components/table/transactions';
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {accounts} from '../../constants/data';

export function Id({AcctDetails}){
    return (
        <div>
            <p>New</p>
        </div>
    );
}

export default ProtectRoute(Id);

export async function getStaticPaths(){
    const paths = getAllAcct();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const AcctDetails = getAcctDetails(params.id);
    
    return {
        props: {AcctDetails}
    }
}
