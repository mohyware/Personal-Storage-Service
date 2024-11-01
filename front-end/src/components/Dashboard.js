import Table from 'react-bootstrap/Table';
import React from 'react';
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditFolder from "../components/folders/EditFolder";
import DeleteFolder from "../components/folders/DeleteFolder";
import ViewFolder from "../components/folders/ViewFolder";

import EditFile from "../components/files/EditFile";
import DeleteFile from "../components/files/DeleteFile";
import ViewFile from "../components/files/ViewFile";

function Dashboard({ currentFolder, refetchFolderData }) {
    if (!currentFolder)
        return;

    return (
        <div>
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
                    {currentFolder.subFolders.length > 0 && currentFolder.subFolders.map((folder) => {
                        return (
                            <tr key={folder.id}>
                                <td>{folder.id}</td>
                                <td>  <FontAwesomeIcon icon={faFolder} /></td>
                                <td className="text-truncate" style={{ maxWidth: '160px' }}>{folder.name}</td>
                                <td style={{ width: '10%' }}><div style={{ display: 'flex', gap: '10px' }}>
                                    <ViewFolder FolderId={folder.id} />
                                    <EditFolder FolderId={folder.id} FolderName={folder.name} ParentFolderId={folder.parentFolderId} refetchFolderData={refetchFolderData} />
                                    <DeleteFolder FolderId={folder.id} refetchFolderData={refetchFolderData} />
                                </div></td>
                                <td>{folder.createdAt}</td>
                            </tr>
                        )
                    })}
                    {currentFolder.files.length > 0 && currentFolder.files.map((file) => {
                        return (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>  <FontAwesomeIcon icon={faFile} /></td>
                                <td className="text-truncate" style={{ maxWidth: '160px' }} >{file.name}</td>
                                <td style={{ width: '10%' }}><div style={{ display: 'flex', gap: '10px' }}>
                                    <ViewFile fileId={file.id} />
                                    <EditFile fileId={file.id} fileName={file.name} folderId={file.folderId} refetchFolderData={refetchFolderData} />
                                    <DeleteFile fileId={file.id} refetchFolderData={refetchFolderData} />
                                </div></td>
                                <td>{file.createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;