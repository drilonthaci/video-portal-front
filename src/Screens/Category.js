
import React, { Component } from "react";
import { variables } from '../Variables';
import { Link } from "react-router-dom";

export class Category extends Component {
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

    render() {
        const { categories } = this.state;

        return (
            <div className="container mx-auto mt-8">

                <table className="border-collapse border w-auto">
                    <thead>
                        <tr>
                            <th className="border px-2 py-2">Name</th>
                            <th className="border px-2 py-2">Short Description</th>
                            <th className="border px-2 py-2">Image</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
