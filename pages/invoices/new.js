import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';

import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';
import {ProtectRoute} from '../../utility/route';



export function New() {


    return (
        <MainLayout title="budget" actionFooter={true}>
            <div className="body">
                
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(New);