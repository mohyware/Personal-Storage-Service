import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        axios('api/v1/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                setIsAuthenticated(response.data.hasOwnProperty('user'));
                setAuth(response.data.user)
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
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />;
};

export default ProtectedRoute;
