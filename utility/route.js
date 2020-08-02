import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

import useAuth from '../provider';

export function ProtectRoute(Component) {
    return () => {
        const { user, isAuthenticated, loading } = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated && !loading) router.push('/index')
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}