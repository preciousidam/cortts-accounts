import {backend} from '../constants/url';


const headers = {
    'content-type': 'application/json',
    'Accept': 'application/json',
}

export const getData = async (...args) => {
    
    const res = await fetch(...args,{
        method: 'GET',
    });
    const json = await res.json();
    const {data} = await json;
    
    return data;
}

export const setAcct = async (balance, name, number, sc, bank,token) => {
  
    const res = await fetch(`${backend}/api/accounts/create`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify({balance, bank, name, number, sc})
    });
    const json = await res.json();
    
    return json;
}

export const delData = async (url,id,token) => {
    
    const res = await fetch(`${backend}/api/${url}`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify({id})
    });
    const json = await res.json();

    return json;
}

export const setTran = async (body,token) => {
    const res = await fetch(`${backend}/api/transactions/create`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}


export const setData = async (id,body,token) => {
    const res = await fetch(`${backend}/api/${id}`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}

export const refreshToken = async (refresh_token) => {
    
    const res = await fetch(`${backend}/api/auth/refresh`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${refresh_token}`},
        body: JSON.stringify({token})
    });
    const json = await res.json();
    const {token} = await json;
    
    return token;
}