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
            publisher:"",
            isVisible: true, 
            selectedCategories: [], // Array to hold selected category IDs
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleCategoryChange = (e) => {
        const { value } = e.target;
        let { selectedCategories } = this.state;

        // Toggle category selection
        if (selectedCategories.includes(value)) {
            selectedCategories = selectedCategories.filter(catId => catId !== value);
        } else {
            selectedCategories = [...selectedCategories, value];
        }

        this.setState({ selectedCategories });
    }

    handleVisibilityChange = (e) => {
        const { checked } = e.target;
        this.setState({ isVisible: checked }); // Update isVisible state based on checkbox
    }

    handleSubmit = () => {
        const { onCreate } = this.props;
        const { title, shortDescription, content, imageUrl, videoUrl, publishedDate, publisher,isVisible, selectedCategories } = this.state;

        const newVideoPostData = {
            title,
            shortDescription,
            content,
            imageUrl,
            videoUrl,
            publishedDate,
            publisher,
            isVisible,
            categories: selectedCategories, // Include selected category IDs in the payload
        };

        // Call onCreate function with new video post data
        onCreate(newVideoPostData);
    }

    render() {
        const { categories, onClose } = this.props;
        const { isVisible } = this.state; 

        return (
            <div className="modal">
                <div className="modal-content">

                    <input type="text" name="title" placeholder="Title" onChange={this.handleInputChange} />
                    <input type="text" name="shortDescription" placeholder="Short Description" onChange={this.handleInputChange} />
                    <input type="text" name="content" placeholder="Content" onChange={this.handleInputChange} />
                    <input type="text" name="imageUrl" placeholder="Image URL" onChange={this.handleInputChange} />
                    <input type="text" name="videoUrl" placeholder="Video URL" onChange={this.handleInputChange} />
                    <input type="date" name="publishedDate" onChange={this.handleInputChange} />
                    <input type="text" name="publisher" placeholder="Publisher" onChange={this.handleInputChange} />
                    
                    {/* Render category checkboxes or multi-select dropdown */}
                    <div>
                        <p>Select Categories:</p>
                        {categories.map(category => (
                            <label key={category.id}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={category.id}
                                    onChange={this.handleCategoryChange}
                                /> {category.name}
                            </label>
                        ))}
                    </div>
                    
                    {/* Checkbox for visibility */}
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isVisible"
                                checked={isVisible}
                                onChange={this.handleVisibilityChange}
                            /> Visible
                        </label>
                    </div>
                    
                    <button onClick={this.handleSubmit}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default AddVideoPostModal;
