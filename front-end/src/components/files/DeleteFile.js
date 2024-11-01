import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function DeleteFile(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/v1/file/${props.fileId}`);
        } catch (err) {
            console.log(err.response)
        }
        props.refetchFolderData();
        handleClose();
    }
    return (
        <>
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