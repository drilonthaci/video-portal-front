import React from "react";
import { Routes, Route } from "react-router-dom";
// import AboutUs from "../../Screens/AboutUs";
import { Category } from "../../Screens/Category";
import NotFound from "../../Screens/NotFound";
// import { CategoryManagement } from "../../Screens/Dashboard/Admin/CategoryManagement";
import { CategoryManagement } from "../../Screens/Dashboard/Admin/CategoryManagement";

function RoutesContainer() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomeScreen />} /> */}
        <Route path="/categories" element={<Category />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesContainer; 