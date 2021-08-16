import axios, {AxiosRequestConfig} from 'axios';
import fetch from 'node-fetch';
import HttpException from '../exceptions/HttpException';

export const postRestCall = async (url: string, reqBody: any): Promise<any> => {
    const headers = { 
        'Content-Type': 'application/json',
        'client-id': process.env.CLIENT_ID,
        'client-secret': process.env.CLIENT_SECRET
    };
    var options: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        headers: headers,
        data: reqBody
    };
    
    return axios.request(options).then((res) => {
        const resData = res.data; // axios sends response json in 'data' property in response
        if (resData.success) {
            return resData.data;
        }
        throw new HttpException(resData.errorCode, resData.message);
    });
};

export const getRestCall = async (url: string): Promise<any> => {
    const headers = { 
        'Content-Type': 'application/json',
        'client-id': process.env.CLIENT_ID,
        'client-secret': process.env.CLIENT_SECRET
    };
    return axios
        .get(url, { headers })
        .then((res) => {
            const resData = res.data; // axios sends response json in 'data' property in response
            if (resData.success) {
                return resData.data;
            }
            throw new HttpException(resData.errorCode, resData.message);
        })
        .catch((err) => {
            return err;
        });
};

const getQueryString = (queryParams: any): string => {
    return Object.keys(queryParams)
        .map((key) => key + '=' + queryParams[key])
        .join('&');
};


