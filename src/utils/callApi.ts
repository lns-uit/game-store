import axios, { AxiosRequestConfig, Method } from 'axios';

const callApi = (
  method: Method,
  endpoint: string,
  data?: any,
  configs?: AxiosRequestConfig
) => {
  return axios({
    ...configs,
    method,
    url: endpoint,
    data,
  });
};

export default callApi;
