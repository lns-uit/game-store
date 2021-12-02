import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const endpoint = 'https://localhost:5001/api/game';
const urlGameDetail = '/api/gameversion/{idgame}/{version}';

const getGamesApi = async () => {
  try {
    const res = await callApi('get', endpoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getGameDetail = async slug => {
  try {
    const res = await callApi(
      'get',
      `https://localhost:5001/api/gameversion/by-game/${slug.idGame}/${slug.version}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createNewBillGame = async newBill => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    const request = await callApi(
      'post',
      `${Endpoint.mainApi}api/bill/create`,
      newBill,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken || '',
        },
      }
    );
    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    const { data } = error.response || {};
    return data;
  }
};

const gamesApi = {
  getGamesApi,
  getGameDetail,
  createNewBillGame,
};

export default gamesApi;
