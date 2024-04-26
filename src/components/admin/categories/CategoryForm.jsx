import React, { useState } from "react";
import { variables } from "../../../Variables";
import AuthService from "../../../services/AuthService";

const CategoryForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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
                onSubmit(data);
                setName("");
                setShortDescription("");
                setImageUrl("");
            })
            .catch(error => console.error("Error adding category:", error));
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category Name"
                />
                <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Short Description"
                />
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
                <button onClick={handleSubmit}>Add</button>
            </div>
        </div>
    );
}

export default CategoryForm;
