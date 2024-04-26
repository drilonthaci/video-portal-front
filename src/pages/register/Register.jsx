import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../../components/register/RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5180/api/Auth/register', {
        email: formData.email,
        password: formData.password
      });

      console.log('User registered successfully:', response.data);
      setError(''); // Clear any previous error messages
      setSuccessMessage('Registration successful! Please proceed to login.');
      // Reset form fields upon successful registration
      setFormData({ email: '', password: '', passwordConfirmation: '' });
      setPasswordError(''); // Clear password error
    } catch (error) {
      if (error.response) {
        console.error('Registration failed with status:', error.response.status);

        if (error.response.status === 409) {
          setError('Email already in use. Please use a different email.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        console.error('Request failed:', error.message);
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Register</h2>
            {successMessage && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error}
              passwordError={passwordError}
            />
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
