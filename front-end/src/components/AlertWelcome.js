import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from 'react'

function AlertWelcome({ showAlert, setAlert }) {
    const [msgVisible, setMsgVisible] = useState(false);
    useEffect(() => {
        if (showAlert) {
            setMsgVisible(true);
            const timer = setTimeout(() => {
                setMsgVisible(false);
                setAlert('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert, setAlert])
    return (
        <Alert className={`successAlert ${msgVisible ? "active" : "hide"}`} variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>
                Your account has been created successfully!<br></br>
                You can now log in.
            </p>
        </Alert>
    );
}

export default AlertWelcome;