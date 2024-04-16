
import React, { Component } from "react";
import { variables } from '../Variables';
import { Link } from "react-router-dom";
import { BsCollectionFill } from "react-icons/bs";
import Titles from "./Dashboard/Titles";

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

    toggleDescription = (categoryId) => {
        this.setState(prevState => ({
            expandedCategory: prevState.expandedCategory === categoryId ? null : categoryId
        }));
    }

    render() {
        const { categories, expandedCategory } = this.state;

        return (
             <div className="container mx-auto mt-8">
                <Titles title="Categories" Icon={BsCollectionFill} />
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map(category => (
                        <a 
                            key={category.id} 
                            href={`#${category.id}`} // Set URL hash for each category
                            className="border p-4 block transition-transform duration-300 transform hover:scale-95" // Apply transition and hover effect
                            onClick={() => this.toggleDescription(category.id)} // Toggle description on click
                        >
                            <h2 className="text-lg font-semibold">{category.name}</h2>
                            {expandedCategory === category.id && (
                                <p className="mt-2">{category.shortDescription}</p>
                            )}
                            <img src={category.imageUrl} alt={category.name} className="mt-4 w-full h-auto" />
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}