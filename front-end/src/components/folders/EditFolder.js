import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios'; import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertErr from '../AlertErr';
import { getErrorMessage } from '../../utils/errorHandler';

function EditFolder(props) {
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [folder, setFolder] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.patch(`/api/v1/folder/${props.FolderId}`,
                JSON.stringify({ name: folder, parentFolderId: props.ParentFolderId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            await props.refetchFolderData();
            setFolder('')
        } catch (err) {
            handleClose();
            const errorMessage = getErrorMessage(err);
            setErrMsg(errorMessage);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    }
    return (
        <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
            <Button variant="success" onClick={handleShow} >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="text-truncate" style={{ maxWidth: '400px' }}>Are you sure you want to update {props.FolderName}?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please Don't Name it hfifdsoafodaso"
                                autoFocus
                                onChange={(e) => setFolder(e.target.value)}
                                value={folder}
                                onKeyDown={handleKeyDown}
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
                                Renaming...
                            </>
                        ) : (
                            'Rename'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditFolder;