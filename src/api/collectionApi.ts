import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const getCollectionByUserApi = async idUSer => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const request = await callApi(
      'get',
      `${Endpoint.mainApi}api/collection/${idUSer}`,
      null,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken || '',
        },
      }
    );
    return request.data;
  } catch (e) {
    const err: any = e;
    const { response } = err || {};
    console.log(response);
  }
};

export default getCollectionByUserApi;
