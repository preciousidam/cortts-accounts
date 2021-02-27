import axios from 'axios';
import {apiConfig} from './config';

const client = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        Accept: 'application/json',
    },
    data: {
        // client_id: apiConfig.clientId,
        // client_secret: apiConfig.clientSecret,
        id: 'password',
        scope: '*',
    },
});

export default client;

function getUrl(config) {
    if (config.baseURL) {return config.url.replace(config.baseURL, '');}
    return config.url;
}


// Intercept all request
client.interceptors.request.use(
    config => {
        
        return config;
    },error => Promise.reject(error),
);

// Intercept all responses
client.interceptors.response.use(
    async response => {
        
        return response;
    },
    error => {
        //return Promise.reject(error);
        return {data: error?.response?.data, status: error?.response?.status}
    },
)