import React, { Component } from "react";
import { variables } from "../../../Variables";
import AddVideoPostModal from "./AddVideoPostModal";
import VideoPostItem from "../../../components/admin/videoPosts/VideoPostItem";
import AuthService from "../../../services/AuthService";

class VideoPostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoPosts: [],
            isAddModalOpen: false,
            categories: []
        };
    }

    componentDidMount() {
        this.fetchVideoPosts();
        this.fetchCategories();
    }

    fetchVideoPosts() {
        fetch(`${variables.API_URL}/VideoPosts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch video posts');
                }
                return response.json();
            })
            .then(data => this.setState({ videoPosts: data }))
            .catch(error => console.error("Error fetching video posts:", error));
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

    handleOpenAddModal = () => {
        this.setState({ isAddModalOpen: true });
    }

    handleCloseAddModal = () => {
        this.setState({ isAddModalOpen: false });
    }

    handleCreateVideoPost = (newVideoPostData) => {
        const token = AuthService.getToken();
        fetch(`${variables.API_URL}/VideoPosts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newVideoPostData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create video post');
                }
                return response.json();
            })
            .then(createdVideoPost => {
                console.log('Video post created successfully:', createdVideoPost);

                // Update component state with the newly created video post
                this.setState(prevState => ({
                    videoPosts: [...prevState.videoPosts, createdVideoPost],
                    isAddModalOpen: false // Close the modal after successful creation
                }));
            })
            .catch(error => {
                console.error('Error creating video post:', error);
            });
    }

    handleDeleteVideoPost = (postId) => {
        const token = AuthService.getToken();
        fetch(`${variables.API_URL}/VideoPosts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete video post');
                }
                this.setState(prevState => ({
                    videoPosts: prevState.videoPosts.filter(post => post.id !== postId)
                }));
            })
            .catch(error => {
                console.error("Error deleting video post:", error);
            });
    }

    // truncateContent(content, maxLength) {
    //     if (content.length <= maxLength) return content;
    //     return content.substring(0, maxLength) + '...';
    // }

    render() {
        const { videoPosts, isAddModalOpen, categories } = this.state;
        const maxLength = 50;

        return (
            <div className="container mx-auto mt-8">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded mb-4"
                    onClick={this.handleOpenAddModal}>Add Video Post</button>

                {isAddModalOpen && (
                    <AddVideoPostModal
                        onCreate={this.handleCreateVideoPost}
                        onClose={this.handleCloseAddModal}
                        categories={categories} // Pass categories to the modal
                    />
                )}

                <table className="border-collapse border w-auto">
                    <thead>
                        <tr>
                            <th className="border px-2 py-2">Title</th>
                            <th className="border px-2 py-2">Description</th>
                            <th className="border px-2 py-2">Image</th>
                            <th className="border px-2 py-2">Video</th>
                            <th className="border px-2 py-2">Published Date</th>
                            <th className="border px-2 py-2">Publisher</th>
                            <th className="border px-2 py-2">Categories</th>
                            <th className="border px-2 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoPosts.map(videoPost => (
                            <VideoPostItem
                                key={videoPost.id}
                                videoPost={videoPost}
                                maxLength={maxLength}
                                onDelete={this.handleDeleteVideoPost} // Pass onDelete function to the VideoPostItem component
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default VideoPostsList;