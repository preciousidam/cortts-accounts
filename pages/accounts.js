import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {mutate} from 'swr';

import AccountsTable from '../components/table/account';
import MainLayout from "../layouts/mainLayout";
import {StyledInput, SelectInput} from "../components/textinput/styledTextInput";
import {ProtectRoute} from '../utility/route';
import { Breadcrumb } from 'antd';
import CustomScroll from 'react-custom-scroll';
import { Paper } from '@material-ui/core';
import { setData } from '../utility/fetcher';
import { openNotification } from '../components/notification';


const renderBreadcrumb = _ => (<Breadcrumb>
    <Breadcrumb.Item><Link href="/"><a>Dashboard</a></Link></Breadcrumb.Item>
    <Breadcrumb.Item>Accounts</Breadcrumb.Item>
</Breadcrumb>);


export function Accounts() {

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


    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({});

    const onChange = e => {
        
        let value = e.target.value;
        let name = e.target.name;
        
        setDetails(prev => ({...prev, [name]: value}))
    }

    const add = async (e) => {
        e.preventDefault();
        const {data, status} = await setData('accounts/others/', details)
        if (status === 200 || status === 201){
            openNotification("Success", 'Record saved successfully', 'success')
            mutate('accounts/others/');
            setDetails({});
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item])
        return;
    }

    return (
        <MainLayout title="Accounts">
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
                            <h4>Account Details</h4>
                        </header>
                        <AccountsTable />
                    </Paper>
                </CustomScroll>

                {open && <div className="new-cont-overlay">
                    <div className="new-form">
                        <header>
                            <h5>Add Accounts</h5>
                            <IconButton className="close" onClick={_ => setOpen(false)}><CloseOutlined /></IconButton>
                        </header>
                        <div>
                            <StyledInput placeholder="Acct Name" id="name" type="text" name="name" value={details?.name} onChange={onChange} />
                            <StyledInput placeholder="Acct Number" id="number" type="text" name="number" value={details?.number} onChange={onChange} />
                            <StyledInput placeholder="Bank" id="bank" type="text" name="bank" value={details?.bank} onChange={onChange} />
                            <StyledInput placeholder="Sort Code" id="sc" type="text" name="sort_code" value={details?.sort_code} onChange={onChange} />
                            <button className="btn btn-success add" onClick={add}>Save Account</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Accounts);