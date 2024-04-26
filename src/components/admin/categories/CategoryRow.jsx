import React from "react";
import { Tooltip } from "@material-tailwind/react";

const CategoryRow = ({ category, handleEditCategory, handleDeleteCategory }) => {
    return (
        <tr>
            <td className="border px-2 py-2">{category.name}</td>
            <td className="border px-2 py-2">{category.shortDescription}</td>
            <td className="border px-2 py-2">
                <img src={category.imageUrl} alt={category.name} style={{ width: "100px", height: "auto" }} />
            </td>
            <td className="border px-2 py-2">
                <Tooltip content="Edit Category">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => handleEditCategory(category)}>
                        Edit
                    </button>
                </Tooltip>
            </td>
            <td className="border px-2 py-2">
                <Tooltip content="Delete Category">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => handleDeleteCategory(category.id)}>
                        Delete
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
}

export default CategoryRow;
