import callApi from '../utils/callApi';
import { Endpoint } from './endpoint';

const getGameSuggestionApi = async (
  title: string,
  count: number,
  start: number
) => {
  try {
    const request = await callApi(
      'get',
      `${Endpoint.mainApi}api/suggestion/get-game/${title}/${count}/${start}`
    );
    const { data } = request || {};
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getGameSuggestionApi };
