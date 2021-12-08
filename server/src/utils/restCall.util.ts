import axios, {AxiosRequestConfig} from 'axios';

export const postRestCall = async (url: string, reqBody: any): Promise<any> => {
    const headers = { 
        'Content-Type': 'application/json'
    };
    var options: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        headers: headers,
        data: reqBody
    };
    
    return axios.request(options).then((res) => {
        return res.data; // axios sends response json in 'data' property in response
    });
};

export const getRestCall = async (url: string): Promise<any> => {
    const headers = { 
        'Content-Type': 'application/json'
    };
    return axios
        .get(url, { headers })
        .then((res) => {
            return res.data; // axios sends response json in 'data' property in response
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


