import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosClient = axios.create({
  baseURL: 'https://erp-proyecto-back-end.onrender.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
