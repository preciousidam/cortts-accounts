import axios from 'axios';
import Cookies from 'js-cookie';
import {apiConfig} from './config';


const getAccessToken = async () => {
    try {
        const retrievedItem = Cookies.get('tokenData');
        if (retrievedItem !== null) {
            const item = JSON.parse(retrievedItem);
            
            const authorization = `Bearer ${item.access_token}`;
            // We have data!!
            return authorization;
        } 
        
        return null;
    } catch (error) {
    // Error retrieving data
        console.log('From getAccessToken',error);
    }
};

const loginClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        Accept: 'application/json',
    },
});

const getLoginClient = async () => {
    loginClient.defaults.headers.common.Authorization = await getAccessToken();
    return loginClient;
};


export default getLoginClient;

function getUrl(config) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    }
    return config.url;
}

// Intercept all requests
loginClient.interceptors.request.use(
    config => {
       
        return config;
    },error => Promise.reject(error),
);

// Intercept all responses
loginClient.interceptors.response.use(
    async response => {
        
        return response;
    },
    async error => {
        console.log(error)
        if (error?.response?.status === 429) {
            alert('Too many requests. Please try again later.');
        } 
       
        return {data: error?.response?.data, status: error?.response?.status}
    },
);