import axios from 'axios';

const httpClient = axios.create({
    //baseURL: 'https://api-faisca.online/Gintec'
    //baseURL: 'http://192.168.0.25:5019'
    baseURL: 'http://172.20.10.3:5019'

});
httpClient.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
    }
);  


httpClient.interceptors.response.use(async (response) => {
    return response
}, async (error) => {
})
export default httpClient;