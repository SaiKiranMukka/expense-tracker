import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import Navbar from '../Components/Navbar';
import Dashboard from '../Components/Dashboard';
import Expenses from '../Components/Expenses';
import AddExpense from '../Components/Expenses/addExpense';
import useAuthToken from '../Hooks/useAuthToken';

export default function Routes() {
  const { token, setToken } = useAuthToken()
  return (
    <BrowserRouter>
      { token ? <Navbar /> : <div></div> }
      <ReactRoutes>
        <Route path='/login' element={<PublicRoute> <Login setToken={setToken} /> </PublicRoute>} />
        <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} />
        
        <Route exact path='/' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path='/expenses' element={<PrivateRoute> <Expenses /> </PrivateRoute >} />
        <Route path='/addExpense' element={<PrivateRoute> <AddExpense /> </PrivateRoute>} />
        <Route path='*' element={<h1>Error 404: Not found</h1>} />
      </ReactRoutes>
    </BrowserRouter>
  )
}
