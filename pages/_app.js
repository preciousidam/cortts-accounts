import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import 'react-custom-scroll/dist/customScroll.css';

import {AuthProvider, AccountProvider} from '../provider';


config.autoAddCss = false;
 
import { faBars, faSpinner, faCheck, faEnvelope, faListAlt, faPlus,
        faHome, faHandshake, faCarAlt, faBed, faToilet, faBath, 
        faMapMarkedAlt, faCouch, faMoneyBillWaveAlt, faCoins,
        faCalendarAlt, faMoneyCheckAlt, faFilePdf, faExchangeAlt, 
        faCreditCard, faMoneyBillAlt, faEllipsisH, faCaretDown,
        faArrowUp, faArrowDown, faChartPie} from '@fortawesome/free-solid-svg-icons';

import {fab,faEtsy} from '@fortawesome/free-brands-svg-icons';
 
library.add(faBars,faSpinner, faCheck, faEnvelope, faListAlt, faHome, faHandshake, faCalendarAlt,
           faCarAlt, faBed, faToilet, faBath, faMapMarkedAlt, faCouch, faMoneyBillWaveAlt, faCoins, 
           faMoneyCheckAlt, faFilePdf, faExchangeAlt, faCreditCard, faMoneyBillAlt, faEllipsisH,
           faCaretDown, faArrowUp, faArrowDown, faEtsy, faPlus, faChartPie);

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
 
const MyApp = ({ Component, pageProps }) => (
    <AuthProvider>
        <AccountProvider>
            <Component {...pageProps} />
        </AccountProvider>
    </AuthProvider>
);
 
export default MyApp;