import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const endpoint = Endpoint.mainApi+'api/game';
const urlGameDetail = '/api/gameversion/{idgame}/{version}';

const getGamesApi = async () => {
  try {
    const res = await callApi('get', endpoint);
    return res.data;
  } catch (error) {
  }
};

const getGameDetail = async slug => {
  try {
    const res = await callApi(
      'get',
      Endpoint.mainApi + `api/gameversion/by-game/lastest-version/${slug.idGame}`
    );
    return res.data;
  } catch (err) {
  }
};

const createNewBillGame = async newBill => {
  try {
    const accessToken = localStorage.getItem('accessToken');
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

const getGameByGenre = async (body: any) => {
  try {
    const request = await callApi(
      'post',
      `${Endpoint.mainApi}api/game/lazy-load/browse`,
      body
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
  getGameByGenre,
};

export default gamesApi;
