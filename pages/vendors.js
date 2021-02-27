import React, {useState, Suspense} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CustomScroll from 'react-custom-scroll';
import { Breadcrumb, DatePicker, Button as Btn } from 'antd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {mutate} from 'swr';

import {VendorDetailsTable} from '../components/table/details';
import MainLayout from "../layouts/mainLayout";
import {StyledInput} from "../components/textinput/styledTextInput";
import {ProtectRoute} from '../utility/route';
import {setData} from '../utility/fetcher';

import {openNotification} from '../components/notification';


const Table = VendorDetailsTable;

export function Clients() {
   
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
    const [newdata, setNewData] = useState({});

    const renderBreadcrumb = _ => (<Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Landlords</Breadcrumb.Item>
    </Breadcrumb>);

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setNewData(prev => ({...prev, [name]: value}))
    }

    const add = async (e) => {
        e.preventDefault();
        const {data, status} = await setData('contacts/vendors/', newdata)
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            mutate('contacts/vendors/');
            clear();
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    const clear = () => {
        setNewData({});
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
                            <h4>All Vendors</h4>
                        </header>
                        <Table />
                    </Paper>
                </CustomScroll>

                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Client</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Name" id="name" type="text" name="name" value={newdata?.name} onChange={onChange} />
                            <StyledInput placeholder="Address" id="address" type="text" name="address" value={newdata?.address} onChange={onChange} />
                            <StyledInput placeholder="Email" id="email" type="email" name="email" value={newdata?.email} onChange={onChange} />
                            <StyledInput placeholder="Phone" id="phone" type="tel" name="phone" value={newdata?.phone} onChange={onChange} />
                            
                            <button className="btn btn-success add" onClick={add}>Save Detail</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Clients);