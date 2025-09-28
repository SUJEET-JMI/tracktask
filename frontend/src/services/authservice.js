import API from './api';

export const signup = async (data) => {
  const resp = await API.post('/auth/signup', data);
  return resp.data;
};

export const login = async (data) => {
  const resp = await API.post('/auth/login', data);
  return resp.data;
};
