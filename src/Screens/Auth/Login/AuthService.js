import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5180/api/Auth/login', {
        email,
        password
      });

      const { token } = response.data;

      // Set Authorization cookie with Bearer token
      cookies.set('Authorization', `Bearer ${token}`, {
        path: '/',
        secure: true, // HTTPS only
        sameSite: 'strict', // Same-site cookies
      });

      return { success: true };
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },

  // logout: () => {
  //   cookies.remove('Authorization', { path: '/' });
  // },

  getToken: () => {
    // Retrieve the token from the Authorization cookie
    const authCookie = cookies.get('Authorization');
    if (authCookie) {
      const token = authCookie.replace('Bearer ', '');
      return token;
    }
    return null;
  },

  isLoggedIn: () => {
    // Check if a valid Authorization cookie exists
    return !!cookies.get('Authorization');
  }
};

export default AuthService;
