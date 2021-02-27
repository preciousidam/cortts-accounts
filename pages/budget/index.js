import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { Select, Space, DatePicker, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import CustomScroll from 'react-custom-scroll';
import {useRouter} from 'next/router';
import moment from 'moment';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {mutate} from 'swr';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {BudgetTable} from '../../components/table/budget';
import {delData} from '../../utility/fetcher';
import { openNotification } from '../../components/notification';


export function Budget() {

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
        debit: {
          background: 'linear-gradient(45deg, #ED213A 30%, #93291E 90%)',
          border: 0,
          borderRadius: 20,
          boxShadow: '0 3 5 2 rgba(#ED213A, .3)',
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

    
    const {RangePicker} = DatePicker;

    
    const classes = useStyles();
    const [filter, setFilter] = useState({date: [moment('01-01-2020', 'DD-MM-YYYY'), moment(new Date('09-12-2021'), 'DD-MM-YYYY')],transType: 'all'});
    const router = useRouter();


    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    const del = async id => {
        const {status, data} = delData(`budgets/${id}/`)
        if(status === 204) {
            openNotification('Item', "Deleted successfully", 'success');
            mutate('budgets/')
            return;
        }
        for (let item in data)
            openNotification(item.toUpperCase(), data[item]);
        
    }
      

    const handle = _ => router.push('/budget/new');
   

    return (
        <MainLayout title="budget">
                <div className="body">
                    <div id='top'>
                        <h4>Overview</h4>
                        <Button onClick={_ => handle()} className={classes.credit}  >New Account <Add /></Button>
                    </div>
                    <CustomScroll heightRelativeToParent="calc(100% - 90px)">
                        <Paper id="transactions">
                            <header id="header">
                                <h4>All Budgets</h4>
                                <RangePicker
                                    className="date-sort"
                                    format="DD-MM-YYYY"
                                    onChange={onChange}
                                    
                                    id="date"
                                    defaultValue={filter.date}
                                />
            
                                <Button className="elevated" onClick={_ => setOpen(!open)} className={classes.pdf} >Export as PDF 
                                    <FontAwesomeIcon icon="file-pdf" color="#ED213A" />
                                </Button>
                            </header>
                            <BudgetTable filter={filter} actions={{del}}/>
                        </Paper>
                    </CustomScroll>
                </div>
        </MainLayout>
    );
}

export default ProtectRoute(Budget);