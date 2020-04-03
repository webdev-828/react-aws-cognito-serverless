import axios from 'axios';
import { Auth } from 'aws-amplify';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

client.interceptors.request.use(async (config) => {
  const auth = `Bearer ${(await Auth.currentSession())
    .getIdToken()
    .getJwtToken()}`;
  config.headers.Authorization = auth;
  return config;
});

client.interceptors.response.use((response) =>
  // Do something with response data
  response.data, (error) => {
  // Do something with response error
  if (error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
});

export default client;
