import React, { Component } from "react";
import AuthService from "../../../Screens/Auth/Login/AuthService";
import { variables } from "../../../Variables";

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
        const token = AuthService.getToken();

        fetch(`${variables.API_URL}/Categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

export default AddCategoryModal;
