import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../api/axios'; import { useNavigate } from 'react-router-dom';


const DeleteAccount = () => {
    const navigate = useNavigate();

    const deleteAccount = async () => {
        await axios.delete('/api/v1/user/')
            .then(function (response) {
                navigate('/Login');
            })
            .catch(function (error) {
            });
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete Account
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure You Want to Delete Your Account?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteAccount}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteAccount;