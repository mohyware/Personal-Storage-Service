import NavbarComponent from "../components/NavbarComponent";
import AddFolder from "../components/folders/AddFolder";
import FolderDashboard from "../components/folders/FolderDashboard";

import UploadFile from "../components/files/UploadFile";
import Dashboard from "../components/Dashboard";
import axios from 'axios';
import './style.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
const Home = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const getUser = async () => {
        await axios.get('/api/v1/user/')
            .then(function (response) {
                setUser(response.data);
                console.log(response.data.user)
            })
            .catch(function (error) {
                console.log(error)
                navigate('/Login');

            });
    }
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <NavbarComponent />
            <div className="grid-container">
                <div className="item1">
                    <AddFolder />
                    <UploadFile />
                </div>
                <div className="item1">
                    <Dashboard />
                </div>
            </div>
        </div>
    )

}
export default Home;