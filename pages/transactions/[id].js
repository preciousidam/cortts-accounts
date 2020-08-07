import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import Link from 'next/link';
import CustomScroll from 'react-custom-scroll';


import MainLayout from "../../layouts/mainLayout";
import {ProtectRoute} from '../../utility/route';
import {CommaFormatted} from '../../utility';
import {getAllAcct, getAcctDetails} from '../../lib/accounts';



const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
      border: 0,
      borderRadius: 20,
      boxShadow: '0 3 5 2 rgba(#85c226, .3)',
      color: 'white',
      padding: '10px 30px',
      margin: '0 10px',
    },
    pdf: {
        background: '#ffffff',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(#85c226, .3)',
        color: '#000000',
        padding: '10px 30px',
        margin: '0 10px',
      },
});


export function Transactions(){

    const [active, setActive] = useState(0);
    const classes = useStyles();
    const {TabPane} = Tabs;

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({style}) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );

    return (
        <MainLayout title="Accounts">
            <div className="body">

            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Transactions);

export async function getStaticPaths(){
    const paths = getAllAcct();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const AcctDetails = getAcctDetails(params.id);
    
    return {
        props: {AcctDetails}
    }
}