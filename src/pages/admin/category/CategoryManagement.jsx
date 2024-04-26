import React, { Component } from "react";
import EditCategoryModal from "./EditCategoryModal";
import { variables } from "../../../Variables";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import CategoryList from "../../../components/admin/categories/CategoryList";
import AddCategoryButton from "../../../components/admin/categories/AddCategoryButton";
import AuthService from "../../../services/AuthService";

class CategoryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            editingCategory: null,
            addingCategory: false
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        fetch(`${variables.API_URL}/Categories`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            })
            .then(data => this.setState({ categories: data }))
            .catch(error => console.error("Error fetching categories:", error));
    }

    handleDeleteCategory = (categoryId) => {
        const token = AuthService.getToken();
        fetch(`${variables.API_URL}/Categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }
                // Remove the deleted category from state
                this.setState(prevState => ({
                    categories: prevState.categories.filter(category => category.id !== categoryId)
                }));
            })
            .catch(error => console.error("Error deleting category:", error));
    }

    handleEditCategory = (category) => {
        this.setState({ editingCategory: category });
    }

    handleSaveCategory = (newName, newShortDescription, newImageUrl) => {
        const token = AuthService.getToken();
        const { editingCategory } = this.state;
        // Update category details in state
        editingCategory.name = newName;
        editingCategory.shortDescription = newShortDescription;
        editingCategory.imageUrl = newImageUrl;
        // Send the update to the server
        fetch(`${variables.API_URL}/Categories/${editingCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newName, shortDescription: newShortDescription, imageUrl: newImageUrl }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update category');
                }
                // Reset editing state
                this.setState({ editingCategory: null });
            })
            .catch(error => console.error("Error updating category:", error));
    }

    handleCategoryAdded = (newCategory) => {
        this.setState(prevState => ({
            categories: [...prevState.categories, newCategory]
        }));
    }

//     render() {
//         const { categories, editingCategory, addingCategory } = this.state;

//         return (
//             <div className="container mx-auto mt-8">
//                 <div className="mb-4 flex justify-between">
//                     <Link to="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.setState({ addingCategory: true })}>
//                         Add Category
//                     </Link>
//                 </div>
//                 {addingCategory && <AddCategoryModal onCategoryAdded={this.handleCategoryAdded} />}
//                 <table className="border-collapse border w-auto">
//                     <thead>
//                         <tr>
//                             <th className="border px-2 py-2">Name</th>
//                             <th className="border px-2 py-2">Short Description</th>
//                             <th className="border px-2 py-2">Image</th>
//                             <th className="border px-2 py-2">Edit</th>
//                             <th className="border px-2 py-2">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {categories.map(category => (
//                             <tr key={category.id}>
//                                 <td className="border px-2 py-2">{category.name}</td>
//                                 <td className="border px-2 py-2">{category.shortDescription}</td>
//                                 <td className="border px-2 py-2">
//                                     <img src={category.imageUrl} alt={category.name} style={{ width: "100px", height: "auto" }} />
//                                 </td>
//                                 <td className="border px-2 py-2">
//                                     <Tooltip content="Edit Category">
//                                         <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => this.handleEditCategory(category)}>
//                                             Edit
//                                         </button>
//                                     </Tooltip>
//                                 </td>
//                                 <td className="border px-2 py-2">
//                                     <Tooltip content="Delete Category">
//                                         <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => this.handleDeleteCategory(category.id)}>
//                                             Delete
//                                         </button>
//                                     </Tooltip>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {editingCategory && <EditCategoryModal category={editingCategory} onEdit={this.handleSaveCategory} />}
//             </div>
//         );
//     }
// }

// export default CategoryManagement;




    render() {
        const { categories, editingCategory, addingCategory } = this.state;

        return (
            <div className="container mx-auto mt-8">
                <div className="mb-4 flex justify-between">
                    <AddCategoryButton onClick={() => this.setState({ addingCategory: true })} />
                </div>
                {addingCategory && <CategoryForm onSubmit={this.handleCategoryAdded} />}
                <table className="border-collapse border w-auto">
                    <thead>
                        <tr>
                            <th className="border px-2 py-2">Name</th>
                            <th className="border px-2 py-2">Short Description</th>
                            <th className="border px-2 py-2">Image</th>
                            <th className="border px-2 py-2">Edit</th>
                            <th className="border px-2 py-2">Delete</th>
                        </tr>
                    </thead>
                    <CategoryList
                        categories={categories}
                        handleEditCategory={this.handleEditCategory}
                        handleDeleteCategory={this.handleDeleteCategory}
                    />
                </table>
                {editingCategory && <EditCategoryModal category={editingCategory} onEdit={this.handleSaveCategory} />}
            </div>
        );
    }
}

export default CategoryManagement;