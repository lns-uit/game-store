import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const getPolicy = async (name:string) => {
    try{
        const request = await callApi(
            'get',
            `${Endpoint.mainApi}api/storepolicy/${name}`,
            
        );
        const {data} = request || {};
        return data;
    } catch (error) {

    }
}

const updatePolicy = async (body : any) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const request = await callApi(
            'put',
            `${Endpoint.mainApi}api/storepolicy/update`,
            body,
            {
                headers: {
                  Authorization: 'Bearer ' + accessToken || '',
                },
            }
        );
        const {data} = request || {};
        return data; 
    } catch {

    }
}

const storePolicyApi = {
    getPolicy,
    updatePolicy,
};
export default storePolicyApi;