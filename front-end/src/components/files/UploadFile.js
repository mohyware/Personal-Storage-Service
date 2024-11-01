import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

function UploadFile({ currentFolder }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('folderId', currentFolder.id);

            setIsLoading(true);
            try {
                await axios.post(`/api/v1/file/cloud/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });
                window.location.reload();
            } catch (err) {
                console.log(err.response);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("No file selected");
        }
    };

    return (
        <Container style={{ margin: "0", maxWidth: "360px" }}>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formFile" >
                    <br></br>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    disabled={!file || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Uploading...
                        </>
                    ) : (
                        'Upload'
                    )}
                </Button>
            </Form>
        </Container>
    );
}

export default UploadFile;