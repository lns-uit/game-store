import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const genreApi = Endpoint.mainApi + 'api/genre'

const getGenre = async () => {
  try {
    const res = await callApi('get', genreApi);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const adminApi = {
    getGenre
};

export default adminApi;
