import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditFolder from "./EditFolder";
import DeleteFolder from "./DeleteFolder";
import ViewFolder from "./ViewFolder";
import Button from 'react-bootstrap/Button';

function FolderDashboard() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    let FolderId = useParams().FolderId;
    const getFolders = async () => {
        await axios.get(`/api/v1/folder/${FolderId}`)
            .then(function (response) {
                setFolders(response.data.folder.subFolders);
                console.log(response.data.folder.subFolders)
            })
            .catch(function (error) {
                console.log(error)
                navigate('/Login');

            });
    }
    const handleClick = (NewFolderId) => {
        FolderId = NewFolderId;
        console.log('fuck')
    }
    useEffect(() => {
        getFolders();
    }, []);
    return (
        <div>
            /root/{FolderId}
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
                    {folders && Array.isArray(folders) && folders.length > 0 ?
                        folders.map((folder) => {
                            return (
                                <tr key={folder.id}>
                                    <td>{folder.id}</td>
                                    <td>  <FontAwesomeIcon icon={faFolder} /></td>
                                    <td>{folder.name}</td>
                                    <td style={{ width: '10%' }}><div style={{ display: 'flex', gap: '10px' }}>
                                        <Button variant="info" onClick={() => handleClick(folder.id)}>VIew</Button>
                                        <ViewFolder FolderId={folder.id} />
                                        <EditFolder FolderId={folder.id} FolderName={folder.name} ParentFolderId={folder.ParentFolderId} />
                                        <DeleteFolder FolderId={folder.id} />
                                    </div></td>
                                    <td>{folder.createdAt}</td>
                                </tr>
                            )
                        }) : (
                            <div>No folders available.</div>
                        )}
                </tbody>
            </Table>
        </div>
    );
}

export default FolderDashboard;