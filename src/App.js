import React,{useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserHomePage from './pages/UserHome';
import UserSignupPage from './pages/UserSignup';
import UsersLoginPage from './pages/UsersLogin';
import UserRouter from './utils/UserRouter';
import UserLoggedout from './utils/UserLoggedout';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route element={<UserRouter />}>
            <Route element={<UserHomePage />} path='/' />
          </Route>
           
    <Route element={<UserLoggedout/>}>

          <Route element={<UsersLoginPage />} path='/login' />

          <Route element={<UserSignupPage />} path='/signup' />
    </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
