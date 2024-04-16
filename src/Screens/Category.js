
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
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Categories</h1>
                    <BsCollectionFill className="text-2xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 overflow-hidden">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            className="block relative transition-transform duration-300 transform hover:scale-95"
                            onClick={() => this.toggleDescription(category.id)}
                        >
                            <div className="absolute inset-0 bg-gray-900 opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {expandedCategory === category.id && (
                                    <p className="mt-2 mb-4 w-48 text-white">{category.shortDescription}</p>
                                )}
                            </div>
                            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 pb-2 text-center">
                                <h2 className="text-lg font-semibold text-white">{category.name}</h2>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );
    }
    }