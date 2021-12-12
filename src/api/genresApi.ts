import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const getGenresApi = async () => {
  try {
    const res = await callApi('get', Endpoint.mainApi + 'api/genre');
    const { data } = res || {};
    return data;
  } catch (error) {
    console.log(error);
  }
};

const genresApi = {
  getGenresApi,
};

export default genresApi;
