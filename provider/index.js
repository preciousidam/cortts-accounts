import React, {createContext, useState, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';

import {backend} from '../constants/url';
import {refreshToken, delData, setData, setAcct} from '../utility/fetcher';
import {getViewData} from '../lib/hooks';
import Loader from '../components/loader';
import {openNotification} from '../components/notification';
import {} from 'swr'


const AuthContext = createContext({});
const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const loadUserFromCookies = async () => {
        const refresh_token = Cookies.get('refresh_token');
        const newToken =  await refreshToken(refresh_token);
    
        
        Cookies.set('token', newToken);
        
        if (newToken) {
            setToken(newToken);
            const claim = await JwtDecode(newToken);
            
            if (claim) {
                setUser(claim.identity);  
            }
            
        }
        setLoading(false);
        
    }

    useEffect(() => {
        if (token != null)
            return
        loadUserFromCookies();
    }, [token]);

    const login = async (email, password) => {
        
        const res = await fetch(`${backend}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password}),
        });

        const json = await res.json();

        const {token, refreshToken, status, msg} = await json;

        if (token && refreshToken) {
            
            Cookies.set('token', token, { expires: 7 });
            Cookies.set('refresh_token', refreshToken);
            setToken(token);
            const claim = JwtDecode(token);
            if(claim) {
                setUser(claim.identity);
            }
            
            return true;
        }

        return {status, msg};
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('refresh_token')
        setUser(null);
        setToken(null);
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

    const [accounts, setAccounts] = useState([]);
    const [selectedAcct, setSelectedAcct] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const {token} = useAuth();
    const {data, isLoading, isError, mutate} = getViewData('accounts/');

    const loadAccounts = async () => {
        setAccounts(data);
    }

    useEffect(() => {
        if (!data)
            return
        loadAccounts();
    }, [data]);

    useEffect(()=> {
        if(selectedAcct != null) return;
        setSelectedAcct(accounts[0]);
    }, [accounts, selectedAcct]);

    useEffect(() => {
        if(selectedAcct == null) return;
        setTransactions(selectedAcct.transactions);
    }, [selectedAcct]);

    const setSelected = aid => setSelectedAcct(accounts.find(({id}) => aid === id));

    const del = async rid => {
        delData
        const {msg, status, data} = await delData('accounts/delete',rid,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
        setSelectedAcct(accounts[0]);
    }
    
    const add = async body => {
        console.log(body)
        const {msg, status, data} = await setData('accounts/create',body,token);
        if( status == 'success')
            mutate(data);
        openNotification(status,msg);
        return status == 'success' || false;
    }

    const addTransaction = async body => {

        const {msg, status, data} = await setData('transactions/create', body, token);
        if( status == 'success'){
            mutate([...accounts, {...selectedAcct,transactions: data}]);
        }
        openNotification(status,msg);

        return status == 'success' || false;
    }


    return (
        <AccountContext.Provider 
            value={{ 
                selectedAcct, 
                accounts, 
                setSelected, 
                done: !isLoading, 
                add, 
                del, 
                transactions,
                addTransaction
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
