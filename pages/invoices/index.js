import React, {useState, useEffect} from 'react';
import { Breadcrumb, DatePicker, Button as Btn } from 'antd';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomScroll from 'react-custom-scroll';
import moment from 'moment';
import {useRouter} from 'next/router';

import MainLayout from "../../layouts/mainLayout";
import Table from "../../components/table/invoice";
import {invoice} from '../../constants/data';
import {ProtectRoute} from '../../utility/route';


export function Invoice() {

    const useStyles = makeStyles({
        credit: {
          background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
          border: 0,
          borderRadius: 20,
          boxShadow: '0 3 5 2 rgba(#85c226, .3)',
          color: 'white',
          padding: '5px 30px',
          margin: '0 10px',
        },
        pdf: {
            background: '#ffffff',
            border: 1,
            borderRadius: 5,
            borderColor: '#c6c6c6',
            borderStyle: 'solid',
            color: '#000000',
            padding: '5px 30px',
          },
    });

    const renderBreadcrumb = _ => (<Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Invoices</Breadcrumb.Item>
    </Breadcrumb>)

    const router = useRouter();
    const classes = useStyles();
    const action = () => router.push(router.pathname+"/new");
    
    return (
        <MainLayout title="Invoice">
            <div className="body">
                <div id='top'>
                    {renderBreadcrumb()}
                    <Button className="elevated" onClick={action} className={classes.credit} >
                        New Invoice 
                        <FontAwesomeIcon icon="plus" color="#ffffff" style={{margin: 5}} />
                    </Button>
                </div>
                <CustomScroll heightRelativeToParent="calc(100% - 68px)">
                    <Paper id="transactions">
                        <header id="header">
                            <h4>All Invoices</h4>
                            
                            {/*<Button className="elevated" onClick={_ => router.push('/expenses/summary')} className={classes.pdf} >View Report 
                                <FontAwesomeIcon icon="file-pdf" color="#ED213A" style={{margin: 5}} />
                            </Button>*/}
                        </header>
                        <Table data={invoice} />
                    </Paper>
                </CustomScroll>
            </div>
        </MainLayout>
    );
}

export default ProtectRoute(Invoice);