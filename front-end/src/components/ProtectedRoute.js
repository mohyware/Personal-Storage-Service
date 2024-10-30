import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios('api/v1/auth/status', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                setIsAuthenticated(response.data.isAuthenticated ?? false);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default ProtectedRoute;
