import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from '../api/axios'; import useAuth from "../hooks/useAuth";
import Spinner from 'react-bootstrap/Spinner';
import AlertErr from '../../src/components/AlertErr';
import { getErrorMessage } from '../../src/utils/errorHandler';
const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setAuth } = useAuth();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        axios('/api/v1/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                setIsAuthenticated(response.data.hasOwnProperty('user'));
                setAuth(response.data.user)
                setLoading(false);
            })
            .catch((err) => {
                const errorMessage = getErrorMessage(err);
                setErrMsg(errorMessage);
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="grow" />
        </div>;
    }

    if (!isAuthenticated) {
        return <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
            <Navigate to="/login" state={{ from: location }} replace />
        </>
    }

    return <Outlet />;
};

export default ProtectedRoute;
