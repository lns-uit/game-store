import callApi from '../utils/callApi';

const genreApi = 'https://localhost:5001/api/genre'

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
