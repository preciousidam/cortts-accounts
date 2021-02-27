import getLoginClient from '../axios/loggedInClient';


export const getData = async (...args) => {
    const client = await getLoginClient();
    const {data, status} = await client.get(...args);
    
    return {data, status};
}


export const delData = async (url) => {
    const client = await getLoginClient();
    const {data, status} = await client.delete(url);
    return {data, status};
}



export const setData = async (url,body) => {
    const client = await getLoginClient();
    const {data, status} = await client.post(url, body);
    return {data, status};
}


export const editData = async (url,body) => {
    const client = await getLoginClient();
    const {data, status} = await client.put(url, body);
    return {data, status};
}
