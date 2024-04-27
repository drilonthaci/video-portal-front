import axios from 'axios';
import Cookies from 'universal-cookie';
import ObservableState from '../helpers/ObservableState';


const cookies = new Cookies();

class AuthService {
  constructor() {
    this.$user = new ObservableState(undefined);
  }


  async login(email, password) {
    try {
      const response = await axios.post('http://localhost:5180/api/Auth/login', {
        email,
        password
      });

      // Check if the response contains the expected fields
      if (!response.data || !response.data.userId || !response.data.email || !response.data.roles) {
        throw new Error('Unexpected response from server');
      }

      const { userId: likerId, email: userEmail, roles } = response.data;

      cookies.set('Authorization', `Bearer ${response.data.token}`, {
        path: '/',
        secure: true,
        sameSite: 'strict'
      });

      const user = { userId: likerId, email: userEmail, roles };
      this.setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid email or password');
      } else {
        throw new Error('An error occurred during login');
      }
    }
  }




  setUser(user) {
    this.$user.next(user);
    localStorage.setItem('user-id', user.userId);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }


  getUser() {
    const userId = localStorage.getItem('user-id');
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (userId && email && roles) { // Change userId to likerId
      const user = {
        userId,
        email,
        roles: roles.split(',')
      };
      return user;
    }

    return undefined;
  }

  isLoggedIn() {
    // const userId = localStorage.getItem('user-id');
    const userEmail = localStorage.getItem('user-email');
    return !!userEmail;
  }

  getToken() {
    const authCookie = cookies.get('Authorization');
    if (authCookie) {
      const token = authCookie.replace('Bearer ', '');
      return token;
    }
    return null;
  }


  async likeVideoPost(videoPostId, userId) {
    try {
      const token = this.getToken(); // Retrieve token from cookies
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(
        `http://localhost:5180/api/VideoPostLike/like/${videoPostId}?userId=${userId}`,
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

  async unlikeVideoPost(videoPostId, userId) {
    try {
      const token = this.getToken(); // Retrieve token from cookies
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.delete(
        `http://localhost:5180/api/VideoPostLike/unlike/${videoPostId}?userId=${userId}`,
        config
      );
      // Remove the liked status from localStorage
      localStorage.removeItem(`liked-${videoPostId}`);

      return response.data; 
    } catch (error) {
      console.error('Error unliking video post:', error);
      throw new Error('Failed to unlike video post');
    }
  }



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

  logout() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-roles');
    cookies.remove('Authorization', {
      path: '/'
    });
    this.$user.next(undefined);
  }
}

const authService = new AuthService();
export default authService;
