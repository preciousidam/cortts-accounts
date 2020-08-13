import {backend} from '../constants/url';


export const getAccts = async (...args) => {
    
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
        headers: {
            'Authorization': `bearer ${token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({balance, bank, name, number, sc})
    });
    const json = await res.json();
    
    return json;
}

export const delAcct = async (id,token) => {
    
    const res = await fetch(`${backend}/api/accounts/delete`,{
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({id})
    });
    const json = await res.json();

    return json;
}


export const setTran = async (body,token) => {
    console.log(body)
    const res = await fetch(`${backend}/api/transactions/create`,{
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}