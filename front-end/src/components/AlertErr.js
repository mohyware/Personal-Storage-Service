import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const AlertErr = ({ errMsg, setErrMsg }) => {
    const [errVisible, setErrVisible] = useState(false);
    useEffect(() => {
        if (errMsg) {
            setErrVisible(true);
            const timer = setTimeout(() => {
                setErrVisible(false);
                setErrMsg('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errMsg, setErrMsg])
    return (
        <div className={`errmsg ${errVisible ? "active" : "hide"}`} >
            <Alert key="warning" variant="danger">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span> </span>
                {errMsg}
            </Alert>
        </div>
    )
}

export default AlertErr;
