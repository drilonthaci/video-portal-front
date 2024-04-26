import axios from 'axios';

class CommentService {
    async addComment(videoPostId, userEmail, commentText) {
        try {
            const token = this.getToken(); // Retrieve token from cookies
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(
                `http://localhost:5180/api/VideoPostComments/comment/${videoPostId}?userEmail=${userEmail}&commentText=${commentText}`,
                {},
                config
            );

            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw new Error('Failed to add comment');
        }
    }
}

const commentService = new CommentService();
export default commentService;
