import { useRef, useState, useEffect } from 'react';
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CenteredContainer from "../components/CenteredContainer"
import { getErrorMessage } from '../utils/errorHandler';
import AlertErr from '../components/AlertErr';

import axios from '../api/axios';
const LOGIN_URL = '/api/v1/auth/login';

const Login = () => {
    const userRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

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
            navigate(from, { replace: true });
        } catch (err) {
            const customMessages = {
                400: 'Missing Username or Password',
                401: 'Oops! Your email and password don’t match',
                429: 'Too many login attempts. Please try again later'
            };
            const errorMessage = getErrorMessage(err, customMessages);
            setErrMsg(errorMessage);
        }
    }

    return (
        <CenteredContainer>
            <AlertErr errMsg={errMsg} setErrMsg={setErrMsg} />
            <section>
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
        </CenteredContainer>

    )
}

export default Login