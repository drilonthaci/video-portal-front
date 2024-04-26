import React, { Component } from "react";


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

export default EditCategoryModal;
