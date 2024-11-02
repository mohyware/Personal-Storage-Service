import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:4000',
    withCredentials: true,
});

// Export the instance
export default axiosInstance;
