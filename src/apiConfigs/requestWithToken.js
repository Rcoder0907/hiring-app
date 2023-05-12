import axios from "axios";

const requestWithToken = (options) => {

  const header = {
    'Content-Type': 'application/json',
    "Accept": "application/json",
  }

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: header
  })

  const onSuccess = (response) => {
    return response.data;
  }

  const onError = async (error) => {
    if (error.response) {
        return Promise.reject(!!error.response.data ? error.response.data : error.response || error.message);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }

  return instance(options).then(onSuccess).catch(onError);
}

export default requestWithToken;