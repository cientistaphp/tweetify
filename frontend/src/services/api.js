import axios from 'axios';

const api = axios.create({
      baseURL: 'http://https://tweetify-production.up.railway.app' 
});

export default api;
