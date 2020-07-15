import Head from "next/head";

import Sidebar from '../components/sidebar/sidebar';
import Header from '../components/header/header';
import {FooterWithButton} from '../components/footer';
import '../styles/styles.scss';

export default function MainLayout({children, title, actionFooter}){
    return (
        <div className="main">
            <Head>
                <title>Cortts Account | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="mainContainer" className="container-fluid">
                
                <div className="row" id="mainContent">
                    <Sidebar />
                    <div className="col-lg-10">
                        <Header />
                        {children}
                        {actionFooter && <FooterWithButton />}
                    </div>
                </div>
            </main>
        </div>
    );
}