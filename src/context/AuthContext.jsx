import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally decode token to set user
    }
  }, [token]);

  const signIn = async (email, password) => {
    const res = await axios.post('https://portfolio-assignment-backend-d9zp.onrender.com/auth/signin', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = '';
  };

  const signUp = async (name, email, password) => {
    await axios.post('https://portfolio-assignment-backend-d9zp.onrender.com/auth/signup', { name, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};