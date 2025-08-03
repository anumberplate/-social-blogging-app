// src/api/userApi.js
import axios from 'axios';

export const getUser = async () => {
  const res = await axios.get('/api/users/me');
  return res.data;
};
