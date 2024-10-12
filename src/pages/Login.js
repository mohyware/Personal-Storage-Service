import { useRef, useState, useEffect } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';
const LOGIN_URL = 'api/v1/auth/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [errVisible, setErrVisible] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Oops! Your email and password don’t match')
            } else if (err.response?.status === 429) {
                setErrMsg('Too many login attempts');
            } else {
                setErrMsg(`Something went wrong on our end. Please try again later`);
            }
            setErrVisible(true);
            const timer = setTimeout(() => {
                setErrVisible(false);
            }, 2000);
            return () => clearTimeout(timer);

        }
    }

    return (
        <>
            <div id='form'>
                {success ? (
                    <section>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <Link to="/Home">Go to Home</Link>
                        </p>
                    </section>
                ) : (
                    <section>
                        <div ref={errRef} className={`errmsg ${errVisible ? "active" : "hide"}`} >
                            <Alert key="warning" variant="danger">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span> </span>
                                {errMsg}
                            </Alert>
                        </div>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <br />
                            <button className="btn-success" >Sign In</button>
                        </form>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Button variant="primary">Sign Up</Button>
                                </Link>
                            </span>
                        </p>
                    </section>
                )}
            </div>
        </>
    )
}

export default Login