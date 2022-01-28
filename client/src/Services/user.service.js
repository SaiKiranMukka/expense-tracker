import axios from "axios";
import * as RestService from './Helper/request';
import * as CONSTANTS from "../Constants";

const login = async (credentials) => {
  const response = await axios
    .post(CONSTANTS.API_URL + CONSTANTS.USER_API_ENDPOINT.LOGIN , credentials)
    // .then((res) => {
    //   console.log(res);
    //   return res;
    // })
    // .catch((er) => {
    //   const { message } = er?.response?.data;
    //   toast.error(message);
    //   //return er;
    // });
  // if (response?.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }
  return response.data;
}

const logout = async () => {
  return await RestService.postCall(CONSTANTS.API_URL + CONSTANTS.USER_API_ENDPOINT.LOGOUT);
}

export const UserService = {
  login,
  logout
};
