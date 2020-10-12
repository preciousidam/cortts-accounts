import React, {useState, Suspense} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import {CloseOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CustomScroll from 'react-custom-scroll';
import { Breadcrumb, DatePicker, Button as Btn } from 'antd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import FlatsTable from '../../components/table/flats';
import MainLayout from "../../layouts/mainLayout";
import CreateForm from '../../components/forms/flatForm';
import {ProtectRoute} from '../../utility/route';
import {hoc} from '../../utility/hoc';
import useAuth from '../../provider';

const Table = hoc(FlatsTable, `flats/`);
const Form = hoc(CreateForm, `flats/create`);

export function Apartments() {
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
        <Breadcrumb.Item>Apartments</Breadcrumb.Item>
    </Breadcrumb>);


    return (
        <MainLayout title="Apartments">
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
                        {!open && <header id="header">
                            <h4> All Apartments </h4>
                        </header>}
                        {!open ? <Table newData={newData} />: <Form close={_ => setOpen(false)} />}
                    </Paper>
                </CustomScroll>
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Apartments);