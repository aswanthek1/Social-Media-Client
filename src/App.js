import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserHomePage from './pages/UserHome';
import UserSignupPage from './pages/UserSignup';
import UsersLoginPage from './pages/UsersLogin';
import userRouter from './utils/userRouter';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          {/* <Route element={<userRouter />}> */}
            <Route element={<UserHomePage />} path='/' />
          {/* </Route> */}
           
          <Route element={<UsersLoginPage />} path='/login' />
          <Route element={<UserSignupPage />} path='/signup' />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
