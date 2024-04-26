import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VideoPostDetails from "./pages/videoPost/VideoPostDetails";
import HomePage from "./pages/home/HomePage";
import CategoryDetailsPage from './pages/category/CategoryDetailsPage';
import CategoryListPage from './pages/category/CategoryListPage';
import ReactionsManagement from './pages/videoPost/ReactionsManagement';
import CategoryManagement from "./pages/admin/category/CategoryManagement";
import VideoPostsList from "./pages/admin/videoPost/VideoPostsList";
import authService from "./services/AuthService";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function RoutesContainer() {
  const isLoggedIn = authService.isLoggedIn();
  const user = authService.getUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/category/:categoryId" element={<CategoryDetailsPage />} />
      

      {isLoggedIn && user && (
        <>
          <Route path="/video/:videoPostId" element={<VideoPostDetails />} />
          <Route path="/reactions" element={<ReactionsManagement />} />
          {/* <Route path="/comments" element={<CommentsList />} /> */}
        </>
      )}

      {/* Protected Admin Routes */}
      {isLoggedIn && user && user.roles.includes('Creator') && (
        <>
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/video-posts" element={<VideoPostsList />} />
        </>
      )}
      {/* 404 Not Found Route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default RoutesContainer;