import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserHomePage from "./pages/UserHome";
import UserSignupPage from "./pages/UserSignup";
import UsersLoginPage from "./pages/UsersLogin";
import UserRouter from "./utils/UserRouter";
import UserLoggedout from "./utils/UserLoggedout";
import UserProfilePage from "./pages/UserProfile";
import PeoplePage from "./pages/People";
import ChatPage from "./pages/Chat";
import SavedPostsPage from "./pages/SavedPosts";
import AdminLoginPage from "./pages/AdminLogin";
import AdminDashBoardPage from "./pages/AdminDashBoard";
import AdminLogginRouter from "./utils/AdminLogginRouter";
import AdminLogoutRouter from "./utils/AdminLogoutRouter";


function App() {


  return (
    <div className="App">
      {/* <Route element={<TemporaryDrawer />} path='/test' /> */}
      <BrowserRouter>
        <Routes>
          
          <Route element={<AdminLogginRouter/>}>
          <Route element={<AdminDashBoardPage/>} path='/admin/dash' />
          </Route>

          <Route element={<AdminLogoutRouter/>}>
          <Route element={<AdminLoginPage/>} path='/admin/login' />
          </Route>

          <Route element={<UserRouter />}>
            <Route element={<UserHomePage />} path="/" />
            <Route element={<UserProfilePage />} path="/profile/:id" />
            <Route element={<PeoplePage />} path="/people" />
            <Route element={<ChatPage />} path="/chat" />
            <Route element={<SavedPostsPage/>} path='/posts/saved' />
          </Route>

          <Route element={<UserLoggedout />}>
            <Route element={<UsersLoginPage />} path="/login" />
            <Route element={<UserSignupPage />} path="/signup" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
