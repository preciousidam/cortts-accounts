import Head from "next/head";

import '../styles/styles.scss';

export default function AuthLayout({children, title}){
    return (
        <div className="main">
            <Head>
                <title>Cortts Account | {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            </Head>
            <main className="container-fluid" id="authContainer">
                {children}
            </main>
        </div>
    );
}