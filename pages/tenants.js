import React, {useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import DetailsTable from '../components/table/details';
import MainLayout from "../layouts/mainLayout";
import Nav from "../components/innerNav/innerNav";
import {tenants} from '../constants/data';
import {StyledInput} from "../components/textinput/styledTextInput";
import {ProtectRoute} from '../utility/route';


export function Tenants() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Tenants</Typography>
                        </Breadcrumbs>);

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(tenants)

    const add = (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const cp = document.getElementById('cp').value;

        setData([...data,{name,email,address,phone,cp}]);
        clear();
    }

    const clear = () => {
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('address').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('cp').value = "";
    }

    return (
        <MainLayout title="Tenants">
            <div className="body">
                <Nav title="Tenants" breadcrumb={breadcrumb} action={_ => setOpen(true)} />
                <div className="container-fluid land-list">
                    <DetailsTable data={data} />
                </div>

                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Tenants</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Name" id="name" type="text" />
                            <StyledInput placeholder="Address" id="address" type="text" />
                            <StyledInput placeholder="Email" id="email" type="email" />
                            <StyledInput placeholder="Contact person" id="cp" type="text" />
                            <StyledInput placeholder="Phone" id="phone" type="tel" />
                            <button className="btn btn-success add" onClick={add}>Save Detail</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}


export default ProtectRoute(Tenants);