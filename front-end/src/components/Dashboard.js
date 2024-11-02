import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateFile from "./files/UpdateFile";
import DeleteFile from "../components/files/DeleteFile";
import ViewFile from "../components/files/ViewFile";

import EditFolder from "../components/folders/EditFolder";
import DeleteFolder from "../components/folders/DeleteFolder";
import ViewFolder from "../components/folders/ViewFolder";


function Dashboard({ currentFolder, refetchFolderData }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if currentFolder is loaded
        if (currentFolder) {
            setIsLoading(false);
        }
    }, [currentFolder]);

    if (!currentFolder) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function timeSince(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }

        return "just now";
    }

    return (
        <div>
            <Table responsive style={{ "--bs-table-bg": "#e1f3fc" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Actions</th>
                        <th>Created Date</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFolder.subFolders.length > 0 && currentFolder.subFolders.map((folder, index) => (
                        <tr key={folder.id}>
                            <td>{index + 1}</td>
                            <td><FontAwesomeIcon icon={faFolder} /></td>
                            <td className="text-truncate" style={{ maxWidth: '160px' }}>{folder.name}</td>
                            <td style={{ width: '10%' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <ViewFolder FolderId={folder.id} />
                                    <EditFolder
                                        FolderId={folder.id}
                                        FolderName={folder.name}
                                        ParentFolderId={folder.parentFolderId}
                                        refetchFolderData={refetchFolderData}
                                    />
                                    <DeleteFolder
                                        FolderId={folder.id}
                                        refetchFolderData={refetchFolderData}
                                    />
                                </div>
                            </td>
                            <td>{timeSince(folder.createdAt)}</td>
                            <td>{timeSince(folder.updatedAt)}</td>
                        </tr>
                    ))}
                    {currentFolder.files.length > 0 && currentFolder.files.map((file, index) => (
                        <tr key={file.id}>
                            <td>{index + 1}</td>
                            <td><FontAwesomeIcon icon={faFile} /></td>
                            <td className="text-truncate" style={{ maxWidth: '160px' }}>{file.name}</td>
                            <td style={{ width: '10%' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <ViewFile fileId={file.id} />
                                    <UpdateFile
                                        fileId={file.id}
                                        fileName={file.name}
                                        folderId={file.folderId}
                                        refetchFolderData={refetchFolderData}
                                    />
                                    <DeleteFile
                                        fileId={file.id}
                                        refetchFolderData={refetchFolderData}
                                    />
                                </div>
                            </td>
                            <td>{timeSince(file.createdAt)}</td>
                            <td>{timeSince(file.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;