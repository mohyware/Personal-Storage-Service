import Button from 'react-bootstrap/Button';
import axios from '../../api/axios'; import { faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import AlertErr from '../AlertErr';
import { getErrorMessage } from '../../utils/errorHandler';

function ViewFile(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/v1/file/cloud/download/${props.fileId}`);
            if (res.data.link) {
                window.open(res.data.link, '_blank');
            } else {
                console.log("Download link not found");
            }
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setErrMsg(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
            <Button variant="info" onClick={handleSubmit} disabled={isLoading}            >
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                    <FontAwesomeIcon icon={faEye} />
                )}
            </Button>
        </>
    );
}

export default ViewFile;