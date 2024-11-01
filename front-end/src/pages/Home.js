import NavbarComponent from "../components/NavbarComponent";
import AddFolder from "../components/folders/AddFolder";
import UploadFile from "../components/files/UploadFile";
import Dashboard from "../components/Dashboard";
import { useFolder } from "../hooks/useFolder";
import FolderBreadcrumbs from "../components/folders/FolderBreadcrumbs"
import './style.css'
import React from 'react';
import { useParams } from "react-router-dom";
const Home = () => {
    const { folderId } = useParams();
    const { folder } = useFolder(folderId);
    return (
        <div>
            <NavbarComponent />
            <div className="grid-container">
                <div className="item1">
                    <AddFolder currentFolder={folder} />
                    <UploadFile currentFolder={folder} />
                </div>
                <div className="item1">
                    <FolderBreadcrumbs currentFolder={folder} />
                    <br></br>
                    <Dashboard currentFolder={folder} />
                </div>
            </div>
        </div>
    )

}
export default Home;