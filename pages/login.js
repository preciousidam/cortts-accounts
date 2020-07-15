import Link from 'next/link';
import AuthLayout from "../layouts/authLayout";
import {StyledInput} from "../components/textinput/styledTextInput";
import {RoundedButton} from "../components/button/buttons";


export default function Login() {
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
                    <RoundedButton type="login" text="SIGN IN" href="/" />
                </form>
            </div>
        </AuthLayout>
    );
}
