import React, { useEffect, useState, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const AlertErr = ({ errMsg, setErrMsg }) => {
    const [errVisible, setErrVisible] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (errMsg) {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setErrVisible(true);

            // Store the timeout reference
            timeoutRef.current = setTimeout(() => {
                setErrVisible(false);
                setTimeout(() => {
                    setErrMsg('');
                }, 100);
            }, 5000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [errMsg, setErrMsg]);

    return (
        <>
            {errMsg && (
                <div className={`errmsg ${errVisible ? "active" : ""}`}>
                    <Alert key="warning" variant="danger">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span> </span>
                        {errMsg}
                    </Alert>
                </div>
            )}
        </>
    );
};

export default AlertErr;