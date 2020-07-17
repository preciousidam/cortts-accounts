import React from 'react';
 
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css';
import 'antd/dist/antd.css';
config.autoAddCss = false;
 
import { faBars, faSpinner, faCheck, faEnvelope, faListAlt,
        faHome, faHandshake, faCarAlt, faBed, faToilet, faBath, 
        faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons'
 
library.add(faBars,faSpinner, faCheck, faEnvelope, faListAlt, faHome, faHandshake,
           faCarAlt, faBed, faToilet, faBath, faMapMarkedAlt);
 
const MyApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);
 
export default MyApp;