import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from './axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        if (token && userId) {
            setCurrentUser({ token, user_id: userId });
        }
    }, []);

    const login = async (user_name, password) => {
        try {
            const response = await makeRequest.post('/auth/login', {
                user_name,
                password,
            });
            const { token, user_id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id);
            setCurrentUser({ token, user_id });
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};