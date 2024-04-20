import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../../Screens/NotFound";
import { CategoryManagement } from "../../Screens/Dashboard/Admin/Category/CategoryManagement";
import CategoryList from "../../Screens/Category/CategoryList";
import CategoryDetails from "../../Screens/Category/CategoryDetails";
import VideoPostDetails from "../../Screens/VideoPost/VideoPostDetails";
import VideoPostsList from "../../Screens/Dashboard/Admin/VideoPost/VideoPostsList";
function RoutesContainer() {
  return (
    <Routes>
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/category/:categoryId" element={<CategoryDetails />} />
      <Route path="/video/:videoPostId" element={<VideoPostDetails />} />
      
      {/* admin */}
      <Route path="/admin/categories" element={<CategoryManagement />} />
      <Route path="/admin/video-posts" element={<VideoPostsList />} />
     {/* <Route path="/edit-video/:id" element={<EditVideoPost />} />  */}
      <Route path="*" element={<NotFound />} />
    </Routes >
  );
}

export default RoutesContainer; 