import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosClient = axios.create({
  baseURL: 'http://Localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

if (token) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}