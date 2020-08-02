import React, {createContext, useState, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';


import {backend} from '../constants/url';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserFromCookies = async () => {
        const token = Cookies.get('token')
        if (token) {
            const user = JwtDecode(token);
            if (user) setUser(user);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadUserFromCookies();
    }, []);

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

        const {token} = await json;

        if (token) {
            
            Cookies.set('token', token, { expires: 7 })
            const user = JwtDecode(token);
            setUser(user)
            return true;
        }

        return false;
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        return true;
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};
