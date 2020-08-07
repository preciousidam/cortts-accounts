import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import AuthLayout from "../layouts/authLayout";
import {StyledInput} from "../components/textinput/styledTextInput";
import {RoundedButton} from "../components/button/buttons";
import useAuth from '../provider';


export default function Login() {

   
    const [loading, setLoading] = useState('');
    const router = useRouter();

    const {login, isAuthenticated} = useAuth();

    useEffect(
        () => {
            if( isAuthenticated){
                router.push('/dashboard');
            }
            router.prefetch('/dashboard');
        }
    );

    const handleClick = async (e) => {
        setLoading('loading')
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await login(email,password);
        
        if (res == true){
            setLoading('success');
            router.push('/dashboard');
        }
    }

    return (
        <AuthLayout title="Login">
            <div className="auth-div">
                <header className="auth-header">
                    <img src="/images/logo.png" id="logo" />
                </header>
                <h3 className="auth-title">Sign in</h3>
                <p className="auth-desc">Please sign in with your cortts email address</p>
                <form className="auth-form">
                    <StyledInput label="Email" id="email" placeholder="Enter your email" type="email" />
                    <StyledInput label="Password" id="password" placeholder="Enter your password" type="password" />
                    <div className="forgot"><Link href="/reset-password"><a>forgot password?</a></Link></div>
                    <RoundedButton type="login" text="SIGN IN" onClick={handleClick} state={loading} />
                </form>
            </div>
        </AuthLayout>
    );
}
