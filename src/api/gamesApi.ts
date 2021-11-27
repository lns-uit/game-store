import callApi from '../utils/callApi';

const endpoint = 'https://localhost:5001/api/game';
const urlGameDetail = '/api/gameversion/{idgame}/{version}'

const getGamesApi = async () => {
  try {
    const res = await callApi('get', endpoint);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getGameDetail = async (slug) =>{
  try{
    const res = await callApi('get', `https://localhost:5001/api/gameversion/by-game/${slug.idGame}/${slug.version}`);
    return res.data;
  }catch(err){
    console.log(err);
  }
}

const gamesApi = {
  getGamesApi,
  getGameDetail
};

export default gamesApi;
