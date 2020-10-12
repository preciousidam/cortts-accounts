import React, {useState, Suspense} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CustomScroll from 'react-custom-scroll';
import { Breadcrumb, DatePicker, Button as Btn } from 'antd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import DetailsTable from '../components/table/details';
import MainLayout from "../layouts/mainLayout";
import {StyledInput} from "../components/textinput/styledTextInput";
import {ProtectRoute} from '../utility/route';
import {hoc} from '../utility/hoc';
import {setData} from '../utility/fetcher';
import useAuth from '../provider';
import {openNotification} from '../components/notification';


const Table = hoc(DetailsTable, `landlords/`);

export function Landlords() {
   
    const useStyles = makeStyles({
        pdf: {
            background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
            border: 1,
            borderRadius: 5,
            borderColor: '#85c226',
            borderStyle: 'solid',
            color: '#ffffff',
            padding: '5px 30px',
          },
    });

    const classes = useStyles();                        
    
    const [open, setOpen] = useState(false)
    const [newData, setNewData] = useState(null);
    const {token} = useAuth();

    const renderBreadcrumb = _ => (<Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Landlords</Breadcrumb.Item>
    </Breadcrumb>);

    const add = async (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const cp = document.getElementById('cp').value;

        const {data, status, msg} = await setData('landlords/create', {name,email,address,phone,contactPerson: cp}, token)
        openNotification(status, msg)
        if (status === 'success'){
            setNewData(data);
            clear()
        }
    }

    const clear = () => {
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('address').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('cp').value = "";
    }

    return (
        <MainLayout title="Landlords">
            <div className="body">
                <div id='top'>
                    {renderBreadcrumb()}
                    
                    <Button className="elevated" onClick={_ => setOpen(true)} className={classes.pdf} >
                        Add New 
                        <FontAwesomeIcon icon="plus" color="#ffffff" style={{margin: 5}} />
                    </Button>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 60px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All flat owners</h4>
                        </header>
                        <Table newData={newData} />
                    </Paper>
                </CustomScroll>

                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Client</h5>
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

export default ProtectRoute(Landlords);