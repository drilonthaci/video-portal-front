import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../../Screens/NotFound";
import { CategoryManagement } from "../../Screens/Dashboard/Admin/Category/CategoryManagement";
import CategoryList from "../../Screens/Category/CategoryList";
import CategoryDetails from "../../Screens/Category/CategoryDetails";
import VideoPostDetails from "../../Screens/VideoPost/VideoPostDetails";
import VideoPostsList from "../../Screens/Dashboard/Admin/VideoPost/VideoPostsList";
import Login from "../../Screens/Auth/Login/Login";
import Register from "../../Screens/Auth/Register/Register";
import authService from "../../Screens/Auth/Login/AuthService"; // Import authService for authentication checks
import LikesPage from "../../Screens/Likes/LikesPage";
import HomePage from "../../Screens/Homepage";

function RoutesContainer() {
  const isLoggedIn = authService.isLoggedIn();
  const user = authService.getUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/category/:categoryId" element={<CategoryDetails />} />

      {isLoggedIn && user && (
        <>
          <Route path="/video/:videoPostId" element={<VideoPostDetails />} />
          <Route path="/likes" element={<LikesPage />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesContainer;