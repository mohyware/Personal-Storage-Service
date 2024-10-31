import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditFolder from "../components/folders/EditFolder";
import DeleteFolder from "../components/folders/DeleteFolder";
import ViewFolder from "../components/folders/ViewFolder";

function Dashboard({ currentFolder }) {
    if (!currentFolder)
        return;

    if (currentFolder.subFolders.length < 1)
        return (<p>This Folder is Empty</p>)

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
                    {currentFolder.subFolders.map((folder) => {
                        return (
                            <tr key={folder.id}>
                                <td>{folder.id}</td>
                                <td>  <FontAwesomeIcon icon={faFolder} /></td>
                                <td>{folder.name}</td>
                                <td style={{ width: '10%' }}><div style={{ display: 'flex', gap: '10px' }}>
                                    <ViewFolder FolderId={folder.id} />
                                    <EditFolder FolderId={folder.id} FolderName={folder.name} ParentFolderId={folder.parentFolderId} />
                                    <DeleteFolder FolderId={folder.id} />
                                </div></td>
                                <td>{folder.createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;