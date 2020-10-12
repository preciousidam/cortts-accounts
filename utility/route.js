import React, {Component,useEffect} from 'react';
import {useRouter} from 'next/router';

import useAuth from '../provider';

export function ProtectRoute(Component) {
    
    return (props) => {
       
        const { isAuthenticated, loading } = useAuth();
        const router = useRouter();
        if (!isAuthenticated && !loading) router.push('/index');
        
        return (<Component {...arguments} {...props} />);
        
    }
}

