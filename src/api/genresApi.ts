import callApi from '../utils/callApi';

const endpoint = 'https://localhost:44303/api/genre';

const getGenresApi = async () => {
  try {
    const res = await callApi('get', endpoint);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const genresApi = {
  getGenresApi,
};

export default genresApi;
