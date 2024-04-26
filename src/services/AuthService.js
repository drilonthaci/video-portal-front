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

      const { token, email: userEmail, roles } = response.data;

      cookies.set('Authorization', `Bearer ${token}`, {
        path: '/',
        secure: true,
        sameSite: 'strict'
      });

      const user = { email: userEmail, roles };
      this.setUser(user);
      return { success: true };
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }

  setUser(user) {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  getUser() {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user = {
        email,
        roles: roles.split(',')
      };
      return user;
    }

    return undefined;
  }

  isLoggedIn() {
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