import React, {useState} from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import FlatsTable from '../../components/table/flats';
import MainLayout from "../../layouts/mainLayout";
import Nav from "../../components/innerNav/innerNav";
import {flats} from '../../constants/data';
import CreateForm from '../../components/forms/flatForm';


export default function Apartments() {
    const breadcrumb = (<Breadcrumbs aria-label="breadcrumb">
                            <Link href="/"><a>Dashboard</a></Link>
                            <Typography color="textPrimary">Apartments</Typography>
                        </Breadcrumbs>);

    const options = [{text: 'Modd Family', value: 'modd'},{text: 'Olympic Tower', value: 'Apapa'},{text: 'Idam Ebube', value: 'idam'}]

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(flats)
    const router = useRouter();

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

    const del = (id) => {
        const filter = data.filter( x => x.flat != id);

        setData(filter);
    }

    const view = (flat) => {
        router.push(router.pathname+`/${flat}`)
    }

    const edit = (id) => {

    }

    return (
        <MainLayout title="Apartments">
            <div className="body">
                <Nav title="Apartments" breadcrumb={breadcrumb} action={_ => setOpen(true)} />
                <div className="container-fluid land-list">
                    <FlatsTable data={data} actions={{del, view, edit}}/>
                </div>

                {open && <div className="new-cont-overlay">
                    <div className="new-form-flat">
                        <header>
                            <h5>Add Tenants</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        {<CreateForm close={_ => setOpen(!open)} />}
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}
