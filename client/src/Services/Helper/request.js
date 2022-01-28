import axios from "axios";
import { toast } from "react-toastify";

const getUserToken = () => {
  const userToken = localStorage.getItem('user') !== undefined ? JSON.parse( localStorage.getItem('user')) :  undefined;
  return userToken?.token;
}

const getCall = async (url, headers, params) => {
  headers = Object.assign({}, headers, { Authorization: `Bearer ${getUserToken()}` });
  return await axios
    .get(url, {
      headers,
      params
    })
    .then(res => {
      return { status: res?.status, data: res?.data };
    })
    .catch(err => {
      errorHandler(err);
    });
}

const postCall = async (url, requestBody, headers, params) => {
  headers = Object.assign({}, headers, { Authorization: `Bearer ${getUserToken()}` });
  return await axios
    .post(url, requestBody, {
      headers,
      params
    })
    .then(res => {
      return { status: res?.status, data: res?.data };
    })
    .catch(err => {
      errorHandler(err);
    });
}

const putCall = async (url, requestBody, headers, params) => {
  headers = Object.assign({}, headers, { Authorization: `Bearer ${getUserToken()}` });
  return await axios
    .put(url, requestBody, {
      headers,
      params
    })
    .then(res => {
      return { status: res?.status, data: res?.data };
    })
    .catch(err => {
      errorHandler(err);
    });
}

const deletCall = async (url, headers, params) => {
  headers = Object.assign({}, headers, { Authorization: `Bearer ${getUserToken()}` });
  return await axios
    .delete(url, {
      headers,
      params
    })
    .catch(err => {
      errorHandler(err);
    });
}

const errorHandler = (err ) => {
  const { status } = err?.response;
  const { code, message } = err?.response?.data;

  if (status === 403 && code === 'TOKEN_EXPIRED'){
    toast.error(message);
    localStorage.removeItem('user');
    setTimeout(() => window.location.reload(true), 3000);
  }
}

export {
  getCall,
  postCall,
  putCall,
  deletCall
}
