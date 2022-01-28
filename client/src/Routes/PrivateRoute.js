import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuthToken from '../Hooks/useAuthToken';

export default function PrivateRoute({ children }) {

  const { token } = useAuthToken();
  const location = useLocation();
  
  return (
    token ? (
      children
    ) : (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: location }
        }}
        replace={true}
      />
    )
  )
}
