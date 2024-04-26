import React from "react";
import CategoryRow from "./CategoryRow";

const CategoryList = ({ categories, handleEditCategory, handleDeleteCategory }) => {
    return (
        <tbody>
            {categories.map(category => (
                <CategoryRow
                    key={category.id}
                    category={category}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            ))}
        </tbody>
    );
}

export default CategoryList;
