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

    const tenant = {};
    const items = [];


    return (
        <div id="inv-cont-inner">
            <CustomScroll heightRelativeToParent="100%">
                <div id="padded">
                    <Paper id="form-cont" className="container">
                        <h4>Enter New Tenant Details</h4>
                        <span>Note that the details entered will be saved to database.</span>
                        <div className="row">
                            
                            <div className="col-md-6">
                                <StyledInput label="Name" type="text" placeholder="Name" id="name" />
                            </div>
                            <div className="col-md-6">
                                <StyledInput label="Email" type="email" placeholder="Email" id="email" />
                            </div>
                            <div className="col-md-12">
                                <StyledInput label="Address" type="text" placeholder="Block 24 plot something, lagos" id="addr" />
                            </div>
                            <div className="col-md-6">
                                <StyledInput label="Contact Person" type="text" placeholder="Tokunbo Olamide" id="cp" />
                            </div>
                            <div className="col-md-6">
                                <StyledInput label="Phone" type="tel" placeholder="08000000000" id="email" />
                            </div>
                        </div>
                    </Paper>

                    <div id="item-cont">
                        <Paper id="form-cont" className="container">
                            <h4>Enter New Tenant Details</h4>
                            <span>Note that the details entered will be saved to database.</span>
                            <div className="row">
                                
                                <div className="col-md-6">
                                    <StyledInput label="Name" type="text" placeholder="Name" id="name" />
                                </div>
                                <div className="col-md-6">
                                    <StyledInput label="Email" type="email" placeholder="Email" id="email" />
                                </div>
                                <div className="col-md-12">
                                    <StyledInput label="Address" type="text" placeholder="Block 24 plot something, lagos" id="addr" />
                                </div>
                                <div className="col-md-6">
                                    <StyledInput label="Contact Person" type="text" placeholder="Tokunbo Olamide" id="cp" />
                                </div>
                                <div className="col-md-6">
                                    <StyledInput label="Phone" type="tel" placeholder="08000000000" id="email" />
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </CustomScroll>
        </div>
    );
}

export default ProtectRoute(New);