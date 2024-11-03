import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../api/axios'; import { useNavigate } from 'react-router-dom';
import AlertErr from '../../src/components/AlertErr';
import { getErrorMessage } from '../../src/utils/errorHandler';
import { Spinner } from 'react-bootstrap';


const Logout = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        await axios.delete('/api/v1/auth/logout')
            .then(function (response) {
                navigate('/Login');
            })
            .catch(function (err) {
                handleClose();
                const errorMessage = getErrorMessage(err);
                setErrMsg(errorMessage);
            }).finally(function () {
                setIsLoading(false);
            }
            )
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
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
                    <Modal.Title>Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure You Want to Log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={logout}
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
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Logout;