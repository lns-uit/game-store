import callApi from '../utils/callApi';
import { AxiosError } from 'axios';
import { Endpoint } from './endpoint';

const loginApi = async formLogin => {
  try {
    console.log(formLogin);

    const request = await callApi(
      'post',
      'https://localhost:5001/api/user/login',
      formLogin
    );
    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    return error.response.data;
  }
};

const loginToken = async accessToken => {
  console.log(accessToken);
  try {
    const emptyUser = {
      email: '',
      password: '',
    };
    const request = await callApi(
      'post',
      Endpoint.mainApi + 'api/user/login',
      emptyUser,
      {
        headers: {
          token: accessToken,
        },
      }
    );
    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    return error.response.data;
  }
};

const userApi = {
  loginApi,
  loginToken,
};
export default userApi;
