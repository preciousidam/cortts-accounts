import React from 'react';
import App, { Container } from 'next/app';
 
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
 
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
 
export default MyApp;