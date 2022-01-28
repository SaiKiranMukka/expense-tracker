import { useState } from "react";

export default function useAuthToken() {

  const getToken = () => {
    const tokenString = localStorage.getItem('user');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('user', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    localStorage.removeItem('user');
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }
}