import axios from 'axios';

 const apiURL = 'https://casino-api.instantbet.me/';
// const apiURL = 'http://localhost:5002/';

const setConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      authorization: 'Bearer ' + token,
    },
  };
};

export const post = async (route, data) => {
  const config = setConfig();
  return await axios.post(apiURL + route, data, config);
};

export const get = async (route) => {
  const config = setConfig();
  return await axios.get(apiURL + route, config);
};
