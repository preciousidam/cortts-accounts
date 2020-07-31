import React, {useState} from 'react';
import Head from "next/head";

import Sidebar, {MinSideBar} from '../components/sidebar/sidebar';
import Header from '../components/header/header';
import {FooterWithButton} from '../components/footer';
import '../styles/styles.scss';

export default function MainLayout({children, title, actionFooter}){

    const [min, setMin] = useState(false);
    const className = min ? 'col-lg-11 max' : 'col-lg-10';

    const handleToogle = e => {
        e.preventDefault();
        setMin(!min);
    }

    return (
        <div className="main">
            <Head>
                <title>Cortts Account | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="mainContainer" className="container-fluid">
                
                <div className="row" id="mainContent">
                    {min? <MinSideBar min={min} /> :<Sidebar min={min} />}
                    <div className={`${className} content-area`}>
                        <Header toogle={handleToogle} />
                        {children}
                        {actionFooter && <FooterWithButton />}
                    </div>
                </div>
            </main>
        </div>
    );
}