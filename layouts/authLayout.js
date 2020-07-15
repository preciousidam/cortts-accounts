import Head from "next/head";

import '../styles/styles.scss';

export default function AuthLayout({children, title}){
    return (
        <div className="main">
            <Head>
                <title>Cortts Account | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container-fluid" id="authContainer">
                {children}
            </main>
        </div>
    );
}