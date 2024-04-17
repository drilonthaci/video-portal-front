
import React, { Component } from "react";
import { variables } from '../../../Variables';
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Create a Modal component for editing category
class EditCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: props.category.name,
            newShortDescription: props.category.shortDescription,
            newImageUrl: props.category.imageUrl
        };
    }

    handleNameChange = (e) => {
        this.setState({ newName: e.target.value });
    }

    handleShortDescriptionChange = (e) => {
        this.setState({ newShortDescription: e.target.value });
    }

    handleImageUrlChange = (e) => {
        this.setState({ newImageUrl: e.target.value });
    }

    handleSubmit = () => {
        const { newName, newShortDescription, newImageUrl } = this.state;
        this.props.onEdit(newName, newShortDescription, newImageUrl);
        this.setState({ newName: "", newShortDescription: "", newImageUrl: "" });
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <input type="text" value={this.state.newName} onChange={this.handleNameChange} />
                    <input type="text" value={this.state.newShortDescription} onChange={this.handleShortDescriptionChange} />
                    <input type="text" value={this.state.newImageUrl} onChange={this.handleImageUrlChange} />
                    <button onClick={this.handleSubmit}>Save</button>
                </div>
            </div>
        );
    }
}

// Create a Modal component for adding category
class AddCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            shortDescription: "",
            imageUrl: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, shortDescription, imageUrl } = this.state;

        fetch(`${variables.API_URL}/Categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, shortDescription, imageUrl }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add category');
                }
                return response.json();
            })
            .then(data => {
                this.props.onCategoryAdded(data);
                this.setState({ name: "", shortDescription: "", imageUrl: "" });
            })
            .catch(error => console.error("Error adding category:", error));
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Category Name"
                    />
                    <input
                        type="text"
                        name="shortDescription"
                        value={this.state.shortDescription}
                        onChange={this.handleChange}
                        placeholder="Short Description"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                        placeholder="Image URL"
                    />
                    <button onClick={this.handleSubmit}>Add</button>
                </div>
            </div>
        );
    }
}

export class CategoryManagement extends Component {
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
        fetch(`${variables.API_URL}/Categories/${categoryId}`, {
            method: 'DELETE',
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

    render() {
        const { categories, editingCategory, addingCategory } = this.state;

        return (
            <div className="container mx-auto mt-8">
                <div className="mb-4 flex justify-between">
                    <Link to="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.setState({ addingCategory: true })}>
                        Add Category
                    </Link>
                </div>
                {addingCategory && <AddCategoryModal onCategoryAdded={this.handleCategoryAdded} />}
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
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className="border px-2 py-2">{category.name}</td>
                                <td className="border px-2 py-2">{category.shortDescription}</td>
                                <td className="border px-2 py-2">
                                    <img src={category.imageUrl} alt={category.name} style={{ width: "100px", height: "auto" }} />
                                </td>
                                <td className="border px-2 py-2">
                                    <Tooltip content="Edit Category">
                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => this.handleEditCategory(category)}>
                                            Edit
                                        </button>
                                    </Tooltip>
                                </td>
                                <td className="border px-2 py-2">
                                    <Tooltip content="Delete Category">
                                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => this.handleDeleteCategory(category.id)}>
                                            Delete
                                        </button>
                                    </Tooltip>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingCategory && <EditCategoryModal category={editingCategory} onEdit={this.handleSaveCategory} />}
            </div>
        );
    }
}
