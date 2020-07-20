import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import 'react-custom-scroll/dist/customScroll.css';


config.autoAddCss = false;
 
import { faBars, faSpinner, faCheck, faEnvelope, faListAlt,
        faHome, faHandshake, faCarAlt, faBed, faToilet, faBath, 
        faMapMarkedAlt, faCouch, faMoneyBillWaveAlt, faCoins,
        faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
 
library.add(faBars,faSpinner, faCheck, faEnvelope, faListAlt, faHome, faHandshake, faCalendarAlt,
           faCarAlt, faBed, faToilet, faBath, faMapMarkedAlt, faCouch, faMoneyBillWaveAlt, faCoins);

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
 
const MyApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);
 
export default MyApp;