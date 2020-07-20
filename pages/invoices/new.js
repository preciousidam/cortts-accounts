import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {DeleteOutline} from '@material-ui/icons';

import MainLayout from "../../layouts/mainLayout";
import {StyledInput, SelectInput} from '../../components/textinput/styledTextInput';



export default function New() {

    const [old, setOld] = useState(undefined);

    const view = _ => {
        switch(old){
            case true:
                return <p>old selected</p>
            case false:
                return <NewTenancy />
            default:
                return (<ModalOption choice={choice => setOld(choice)} />);
        }
    }

    return (
        <MainLayout title="budget" actionFooter={true}>
            <div className="body">
                <div className="container-fluid" id="inv">
                    {view()}
                </div>
            </div>
        </MainLayout>
    );
}


export const ModalOption = ({choice}) => {
    return (
        <div id="modal">
            <Paper id="modal-cont">
                <p>Select an option below to generate an Invoice</p>
                <hr />
                <button className="btn btn-success" id="newTen" onClick={e => choice(false)}>New Tenant</button>
                <button className="btn btn-success" id="oldTen" onClick={e => choice(true)}>Old Tenancy</button>

            </Paper>
        </div>
    );
}

export const NewTenancy = ({}) => {
    return (
        <div id="inv-cont-inner">
            <div id="form-cont" className="container">
                <div className="row">
                    <div className="col-md-6">
                        <StyledInput />
                    </div>
                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        </div>
    )
}