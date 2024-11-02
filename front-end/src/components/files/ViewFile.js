import Button from 'react-bootstrap/Button';
import axios from '../../api/axios'; import { faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';

function ViewFile(props) {
    const [isLoading, setIsLoading] = useState(false);

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
            console.log(err.response)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
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