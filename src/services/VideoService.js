import axios from 'axios';

class VideoService {

    async likeVideoPost(videoPostId, userEmail) {
        try {
          const token = this.getToken(); // Retrieve token from cookies
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
    
          const response = await axios.post(
            `http://localhost:5180/api/VideoPostLike/like/${videoPostId}?userEmail=${userEmail}`,
            {},
            config
          );
          // Store the liked status in localStorage
          localStorage.setItem(`liked-${videoPostId}`, 'true');
    
          return response.data; // You can return any response data if needed
        } catch (error) {
          console.error('Error liking video post:', error);
          throw new Error('Failed to like video post');
        }
      }

  
  async unlikeVideoPost(videoPostId, userEmail) {
    try {
      const token = this.getToken(); // Retrieve token from cookies
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.delete(
        `http://localhost:5180/api/VideoPostLike/unlike/${videoPostId}?userEmail=${userEmail}`,
        config
      );
      // Remove the liked status from localStorage
      localStorage.removeItem(`liked-${videoPostId}`);

      return response.data; // You can return any response data if needed
    } catch (error) {
      console.error('Error unliking video post:', error);
      throw new Error('Failed to unlike video post');
    }
  }
}

const videoService = new VideoService();
export default videoService;
