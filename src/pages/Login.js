import { useRef, useState, useEffect } from 'react';
import './style.css'
import { Link } from 'react-router-dom';

import axios from 'axios';
const LOGIN_URL = 'api/v1/auth/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
                setErrMsg('Oops! Your email and password don’t match.');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
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
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
                            <button>Sign In</button>
                        </form>
                        <p>
                            Need an Account?<br />
                            <span className="line">
                                <Link to="/register">Sign Up</Link>
                            </span>
                        </p>
                    </section>
                )}
            </div>
        </>
    )
}

export default Login