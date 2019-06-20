import axios from 'axios';

const request = axios.create({
  baseURL: 'http://192.168.0.16:3000'
});



export default request;