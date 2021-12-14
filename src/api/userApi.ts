import callApi from '../utils/callApi';
import { AxiosError } from 'axios';
import { Endpoint } from './endpoint';
import { FormRegisterType } from '../interfaces/rootInterface';

const loginApi = async formLogin => {
  try {
    console.log(formLogin);

    const request = await callApi(
      'post',
      Endpoint.mainApi + 'api/user/login',
      formLogin
    );

    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    console.log(error.response);

    return error.response?.data;
  }
};

const loginWithSMA = async info => {
  try {
    const request = await callApi(
      'post',
      Endpoint.mainApi + 'api/user/login-sma',
      info
    )
    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    console.log(error.response);

    return error.response?.data;
  }
};

const loginToken = async accessToken => {
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
    return error.response?.data;
  }
};

const registerUserApi = async (newUser: FormRegisterType) => {
  try {
    const request = await callApi(
      'post',
      Endpoint.mainApi + 'api/user/register',
      newUser
    );
    const { data } = request;
    return data;
  } catch (e) {
    const error: any = e;
    return error.response?.data;
  }
};

const userApi = {
  loginApi,
  loginToken,
  registerUserApi,
  loginWithSMA,
};
export default userApi;
