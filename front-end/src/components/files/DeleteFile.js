import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios'; import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertErr from '../AlertErr';
import { getErrorMessage } from '../../utils/errorHandler';
import { Button, Spinner } from 'react-bootstrap';

function DeleteFile(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.delete(`/api/v1/file/${props.fileId}`);
            await props.refetchFolderData();
        } catch (err) {
            handleClose();
            const errorMessage = getErrorMessage(err);
            setErrMsg(errorMessage);
        }
        finally {
            setIsLoading(false);
            handleClose();
        }
    }
    return (
        <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />

            <Button variant="danger" onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} />

            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm File Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this File?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}
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
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteFile;