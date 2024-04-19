import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { variables } from '../../Variables';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    fetch(`${variables.API_URL}/Categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then((data) => this.setState({ categories: data }))
      .catch((error) => console.error('Error fetching categories:', error));
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {categories.map((category) => (
            <div key={category.id}>
              <Link to={`/category/${encodeURIComponent(category.id)}`} className="block relative transition-transform duration-300 transform hover:scale-95">
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 pb-2 text-center">
                  <h2 className="text-lg font-semibold text-white">{category.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategoryList;
