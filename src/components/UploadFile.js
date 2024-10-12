import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function UploadFile() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            console.log("Selected file:", file.name);
            // Add your file upload logic here
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
                <Button variant="primary" type="submit" className="mt-3">
                    Upload
                </Button>
            </Form>
        </Container>
    );
}


export default UploadFile