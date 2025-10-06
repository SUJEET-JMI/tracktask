import API from './api';

export const signup = async (data) => {
  const resp = await API.post('/api/auth/signup', data);
  return resp.data;
};

export const login = async (data) => {
  const resp = await API.post('/api/auth/login', data);
  return resp.data;
};
