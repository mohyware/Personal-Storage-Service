import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import AlertErr from '../AlertErr';
import { getErrorMessage } from '../../utils/errorHandler';

function AddFolder({ currentFolder, refetchFolderData }) {
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [folder, setFolder] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/api/v1/folder',
                JSON.stringify({ name: folder, parentFolderId: currentFolder.id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            await refetchFolderData();
            setFolder('');
        } catch (err) {
            handleClose();
            const errorMessage = getErrorMessage(err);
            setErrMsg(errorMessage);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    }
    return (
        <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
            <Button variant="success" onClick={handleShow} style={{ marginLeft: "19px", width: "90%" }}>
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
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}
                        disabled={isLoading}
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
                                Creating...
                            </>
                        ) : (
                            'Create'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFolder;