import callApi from '../utils/callApi';

const endpoint = 'https://localhost:44303/api/game';

const getGamesApi = async () => {
  try {
    const res = await callApi('get', endpoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const gamesApi = {
  getGamesApi,
};

export default gamesApi;
