import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CenteredContainer from "../components/CenteredContainer"
import { Spinner } from 'react-bootstrap';
import AlertWelcome from "../components/AlertWelcome";
import './style.css'
import axios from '../api/axios';
import { getErrorMessage } from '../../src/utils/errorHandler';
import AlertErr from "../components/AlertErr";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const REGISTER_URL = '/api/v1/auth/register';

const Register = () => {
    const userRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [errAlert, setErrAlert] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios.post(REGISTER_URL,
                JSON.stringify({ userName: user, password: pwd, email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess('show');
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setEmail('');
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setErrAlert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <AlertErr errMsg={errAlert} setErrMsg={setErrAlert} />
            <AlertWelcome showAlert={success} setAlert={setSuccess} />
            <CenteredContainer>
                <div id='form'>
                    <section>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                            </label>

                            <input className="mb-3"
                                aria-label="Username"
                                aria-describedby="uidnote"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <div id="uidnote" className={`uidnote ${userFocus && user && !validName ? "active" : "offscreen"}`}>
                                <Alert key="warning" variant="warning">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <span> </span>
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </Alert>
                            </div>

                            <label htmlFor="email">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>


                            <input className="mb-3"
                                aria-label="email"
                                aria-describedby="emailNote"
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <div id="emailNote" className={`emailNote ${emailFocus && email && !validEmail ? "active" : "offscreen"}`}>
                                <Alert key="warning" variant="warning">
                                    <FontAwesomeIcon icon={faInfoCircle} /><span> </span>
                                    Please enter a valid email
                                </Alert>
                            </div>

                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <div id="pwdnote" className={`pwdnote ${pwdFocus && !validPwd ? "active" : "offscreen"}`}>
                                <Alert key="warning" variant="warning">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <span> </span>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters,<br />
                                    a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </Alert>
                            </div>
                            <br />
                            <button className="btn-success" disabled={isLoading || !validName || !validPwd || !validEmail ? true : false}>
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
                                        Creating Account...
                                    </>
                                ) : (
                                    'Sign Up'
                                )}</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button variant="primary">Sign In</Button>
                                </Link>
                            </span>
                        </p>
                    </section>
                </div>

            </CenteredContainer>
        </>
    )
}

export default Register