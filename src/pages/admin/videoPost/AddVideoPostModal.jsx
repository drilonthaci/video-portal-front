import React, { Component } from "react";

class AddVideoPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            shortDescription: "",
            content: "",
            imageUrl: "",
            videoUrl: "",
            publishedDate: "",
            publisher: "",
            selectedCategories: [],
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleCategoryChange = (e) => {
        const { value } = e.target;
        let { selectedCategories } = this.state;

        if (selectedCategories.includes(value)) {
            selectedCategories = selectedCategories.filter(catId => catId !== value);
        } else {
            selectedCategories = [...selectedCategories, value];
        }

        this.setState({ selectedCategories });
    };

    handleSubmit = () => {
        const { onCreate } = this.props;
        const { title, shortDescription, content, imageUrl, videoUrl, publishedDate, publisher, selectedCategories } = this.state;

        const newVideoPostData = {
            title,
            shortDescription,
            content,
            imageUrl,
            videoUrl,
            publishedDate,
            publisher,
            categories: selectedCategories,
        };

        onCreate(newVideoPostData);
    };

    render() {
        const { categories, onClose } = this.props;

        return (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex">
                <div className="relative p-8 bg-white w-full max-w-md m-auto rounded shadow-lg">
                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="text" name="title" placeholder="Title" onChange={this.handleInputChange} />
                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="text" name="shortDescription" placeholder="Short Description" onChange={this.handleInputChange} />
                    <textarea className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" name="content" placeholder="Content" onChange={this.handleInputChange} />

                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="text" name="imageUrl" placeholder="Image URL" onChange={this.handleInputChange} />
                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="text" name="videoUrl" placeholder="Video URL" onChange={this.handleInputChange} />
                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="date" name="publishedDate" onChange={this.handleInputChange} />
                    <input className="mb-4 px-3 py-2 border border-gray-300 rounded w-full" type="text" name="publisher" placeholder="Publisher" onChange={this.handleInputChange} />

                    <div className="mb-4">
                        <p>Select Categories:</p>
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={category.id}
                                    onChange={this.handleCategoryChange}
                                    className="mr-2"
                                /> {category.name}
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={this.handleSubmit}>Save</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVideoPostModal;