import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditFolder from "../components/folders/EditFolder";
import DeleteFolder from "../components/folders/DeleteFolder";

function Dashboard() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const getFolders = async () => {
        await axios.get('/api/v1/folder/')
            .then(function (response) {
                setFolders(response.data.folders);
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                navigate('/Login');

            });
    }
    useEffect(() => {
        getFolders();
        axios.get('/api/v1/file/')
            .then(function (response) {
                setFiles(response.data.files);
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
                navigate('/Login');

            });
    }, []);
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Actions</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody>
                {folders.map((folder) => {
                    return (
                        <tr key={folder.id}>
                            <td>{folder.id}</td>
                            <td>  <FontAwesomeIcon icon={faFolder} /></td>
                            <td>{folder.name}</td>
                            <td style={{ width: '10%' }}><div style={{ display: 'flex', gap: '10px' }}>
                                <EditFolder />
                                <EditFolder FolderId={folder.id} FolderName={folder.name} ParentFolderId={folder.ParentFolderId} />
                                <DeleteFolder FolderId={folder.id} />
                            </div></td>
                            <td>{folder.createdAt}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Dashboard;