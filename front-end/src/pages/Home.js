import NavbarComponent from "../components/NavbarComponent";
import AddFolder from "../components/folders/AddFolder";
import FolderDashboard from "../components/folders/FolderDashboard";

import UploadFile from "../components/files/UploadFile";
import Dashboard from "../components/Dashboard";
import './style.css'
import React from 'react';
const Home = () => {
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