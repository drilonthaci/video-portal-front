import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../../Screens/NotFound";
import { CategoryManagement } from "../../Screens/Dashboard/Admin/CategoryManagement";
import CategoryList from "../../Screens/Category/CategoryList";
import CategoryDetails from "../../Screens/Category/CategoryDetails";

function RoutesContainer() {
  return (
    <Routes>
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/category/:categoryId" element={<CategoryDetails />} />      
      <Route path="/admin/categories" element={<CategoryManagement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesContainer; 