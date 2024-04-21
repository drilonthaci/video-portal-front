import axios from 'axios';
import Cookies from 'universal-cookie';
import ObservableState from './ObservableState';

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

      // Store JWT token in a cookie
      cookies.set('Authorization', `Bearer ${token}`, {
        path: '/', // Cookie path
        secure: true, // HTTPS only
        sameSite: 'strict' // Same-site policy
      });

      // Set user data obtained from API response
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
    return !!userEmail; // Check if user is logged in based on presence of email
  }

  getToken() {
    // Retrieve the token from the Authorization cookie
    const authCookie = cookies.get('Authorization');
    if (authCookie) {
      const token = authCookie.replace('Bearer ', '');
      return token;
    }
    return null;
  }

  logout() {
    try {
      // Clear user-related data from localStorage
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-roles');

      // Remove JWT token cookie
      cookies.remove('Authorization', {
        path: '/' // Cookie path
      });
      this.$user.next(undefined);
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  }
}

const authService = new AuthService();
export default authService;
