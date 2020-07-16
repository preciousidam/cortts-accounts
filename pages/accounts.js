import React, {useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import AccountsTable from '../components/table/account';
import MainLayout from "../layouts/mainLayout";
import Nav from "../components/innerNav/innerNav";
import {accounts} from '../constants/data';
import {StyledInput, SelectInput} from "../components/textinput/styledTextInput";


export default function Accounts() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Accounts</Typography>
                        </Breadcrumbs>);

    const options = [{text: 'Modd Family', value: 'modd'},{text: 'Olympic Tower', value: 'Apapa'},{text: 'Idam Ebube', value: 'idam'}]

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(accounts)

    const add = (e) => {
        const name = document.getElementById('name').value;
        const number = document.getElementById('number').value;
        const owner = document.getElementById('owner').value;
        const bank = document.getElementById('bank').value;
        const sc = document.getElementById('sc').value;

        setData([...data,{name,number,owner,bank,sc}]);
        clear();
    }

    const clear = () => {
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('owner').value = "";
        document.getElementById('bank').value = "";
        document.getElementById('sc').value = "";
    }

    return (
        <MainLayout title="Accounts">
            <div className="body">
                <Nav title="Accounts" breadcrumb={breadcrumb} action={_ => setOpen(true)} />
                <Paper className="container land-list">
                    <AccountsTable data={data} />
                </Paper>

                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Accounts</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Acct Name" id="name" type="text" />
                            <StyledInput placeholder="Acct Number" id="number" type="text" />
                            <SelectInput placeholder="owner" id="owner" type="text" options={options} defaultChoice="Select Owner" />
                            <StyledInput placeholder="Bank" id="bank" type="text" />
                            <StyledInput placeholder="Sort Code" id="sc" type="text" />
                            <button className="btn btn-success add" onClick={add}>Save Detail</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}
