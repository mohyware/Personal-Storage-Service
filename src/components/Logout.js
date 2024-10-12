import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await axios.delete('/api/v1/auth/logout')
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
            <Button variant="outline-danger" onClick={handleShow}>
                Logout
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Do not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={logout}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Logout;