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
            categories: [...prevState.categories, newCategory],
            addingCategory: false // Close the modal after adding
        }));
    }

    handleCancelAddCategory = () => {
        this.setState({ addingCategory: false }); // Close the modal
    }

    render() {
        const { categories, editingCategory, addingCategory } = this.state;

        return (
            <div>
                {/* Background overlay */}
                {addingCategory && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        {/* Modal content */}
                        <div className="bg-white w-full max-w-md p-8 rounded shadow-lg">
                            {/* Category Form */}
                            <CategoryForm onSubmit={this.handleCategoryAdded} onCancel={this.handleCancelAddCategory} />
                        </div>
                    </div>
                )}

                <div className="container mx-auto mt-8">
                    <div className="mb-4 flex justify-between">
                        <AddCategoryButton onClick={() => this.setState({ addingCategory: true })} />
                    </div>
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
            </div>
        );
    }
}

export default CategoryManagement;
