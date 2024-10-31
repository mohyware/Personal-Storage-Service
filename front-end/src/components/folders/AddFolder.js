import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddFolder({ currentFolder }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [folder, setFolder] = useState('');
    if (currentFolder === null)
        return;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/folder',
                JSON.stringify({ name: folder, parentFolderId: currentFolder.id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch (err) {
            console.log(err.response)
        }
        handleClose();
        window.location.reload();
    }
    return (
        <>
            <Button variant="success" onClick={handleShow} style={{ marginLeft: "19px", width: "85%" }}>
                + Add New Folder
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Don't Name it hfifdsoafodaso"
                                autoFocus
                                onChange={(e) => setFolder(e.target.value)}
                                value={folder}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFolder;