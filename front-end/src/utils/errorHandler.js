export const getErrorMessage = (err, customMessages = {}) => {
    if (err.response) {
        const status = err.response.status;

        if (customMessages[status]) {
            return customMessages[status];
        }

        if (status === 404) {
            return 'The requested resource was not found. Please check the URL and try again.';
        }
        if (status === 429) {
            return 'Too many requests. Please try again later.';
        }
        if (status === 500) {
            return 'Internal Server Error: Something went wrong on our Server. Please try again later.';
        }
        return `Error ${status}: ${err.response.data?.msg || 'An error occurred.'}`;
    } else if (err.request) {
        return 'No response received from the server. Please check your network connection.';
    } else if (err.message) {
        if (err.message.includes('ERR_FAILED')) {
            return 'Network error: The request failed. Please check your connection or try again later.';
        }
        return `Error: ${err.message}`;
    } else {
        return 'An unexpected error occurred. Please try again.';
    }
};
