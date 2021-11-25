import callApi from '../utils/callApi';
import { AxiosError } from 'axios';

const loginApi = async (formLogin) => {
  try {
    const request = await callApi(
      'post',
      'https://localhost:44303/api/user/login',
      formLogin
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
};
export default userApi;
