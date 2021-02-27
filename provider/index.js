import React, {createContext, useState, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';

import {delData, setData} from '../utility/fetcher';
import {getViewData} from '../lib/hooks';
import Loader from '../components/loader';
import {openNotification} from '../components/notification';
import client from '../axios/tokenClient';
import { useRouter } from 'next/router';


const AuthContext = createContext({});
const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const router = useRouter();

    const loadUserFromCookies = async () => {

        const token = JSON.parse(Cookies.get('tokenData'));

        const isValid = (await verifyToken(token.access_token));
        if (isValid){
            const user = JSON.parse(Cookies.get('user'));
            
            setUser(user);
            setToken(token.access_token);
        }
        else{
            setLoading(false);
            router.push('/');
        }
    }

    useEffect(() => {
        if (token != null)
            return
        loadUserFromCookies();
    }, [token]);

    const login = async (email, password) => {
        
        const {data, status} = await client.post(`auth/login/`, {username: email, password});

        if (status === 201 || status === 200){
            Cookies.set('tokenData', 
                        JSON.stringify({access_token: data.access_token, refresh_token: data.refresh_token}), 
                        {expires: 2});
            setToken(data.access_token);
            Cookies.set('user', JSON.stringify(data.user));
            setUser(data.user);
            return {status: true};
        }


        //const {token, refreshToken, status, msg} = await json;

        return {status: false, msg: data};
    }

    const verifyToken = async token => {
        const {data, status} = await client.post('auth/token/verify/', {token});
        
        if(status === 200 || status === 201){
            return true;
        }
        else if (status === 401) {
            alert(data?.detail);
            return false;
        }
        
    }

    const logout = () => {
        Cookies.remove('tokenData');
        setUser(null);
        setToken(null);
        router.push('/')
        return true;
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, token, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};


export const AccountProvider = ({ children }) => {

    const [selectedAcct, setSelectedAcct] = useState(null);
    
    const {data, isLoading, isError, mutate} = getViewData('accounts/cortts/');

    useEffect(()=> {
        if(selectedAcct != null) return;
        if(data)
            setSelectedAcct(data[0]);
    }, [data]);


    const setSelected = aid => setSelectedAcct(data?.find(({id}) => aid === id));
    
    const add = async body => {
        const {status, data} = await setData('accounts/cortts/', body);
        console.log(data)
        if( status == 200 || status === 201){
            mutate(data);
            openNotification("Success","Transaction has been saved", 'success');
            return true;
        }
        for (let m in data) openNotification(m.toUpperCase(),data[m]);
        return false;
    }

    return (
        <AccountContext.Provider 
            value={{ 
                selectedAcct, 
                accounts: data, 
                setSelected, 
                done: !isLoading, 
                add, 
            }}
        >
            {!isLoading ? children : isError ? (<p>something bad happened please refresh the page</p>) : (<Loader />)}
        </AccountContext.Provider>
    );
}


export function useAccounts() {
    const context = useContext(AccountContext)

    return context
};
