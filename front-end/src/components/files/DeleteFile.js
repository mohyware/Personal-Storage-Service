import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios'; import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertErr from '../AlertErr';
import { getErrorMessage } from '../../utils/errorHandler';

function DeleteFile(props) {
    const [show, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/v1/file/${props.fileId}`);
        } catch (err) {
            handleClose();
            const errorMessage = getErrorMessage(err);
            setErrMsg(errorMessage);
        }
        props.refetchFolderData();
        handleClose();
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
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteFile;