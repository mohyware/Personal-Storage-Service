import React from "react"
import { Breadcrumb } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import axios from 'axios';
import { useEffect, useState } from "react"

export default function FolderBreadcrumbs({ currentFolder }) {
    const [path, setPath] = useState(currentFolder === ROOT_FOLDER ? [ROOT_FOLDER] : []);

    const getFullPath = async (current) => {
        const fullPath = [];

        while (current && current.id !== null) {
            fullPath.push(current);
            if (current.parentFolderId == null)
                break;
            let res = await axios.get(`/api/v1/folder/${current.parentFolderId}`);
            current = res.data.folder;
        }
        fullPath.push(ROOT_FOLDER);
        return fullPath.reverse();
    }

    useEffect(() => {
        const fetchPath = async () => {
            const fullPath = await getFullPath(currentFolder);
            fullPath.pop();
            setPath(fullPath);
        }
        fetchPath();
    }, [currentFolder])

    return (
        <Breadcrumb
            className="flex-grow-1"
            listProps={{ className: " pl-0 m-0" }}
        >
            {path.map((folder) => (
                <Breadcrumb.Item
                    key={folder.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: folder.id ? `/folder/${folder.id}` : "/",
                        },
                    }}
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "150px" }}
                >
                    {folder.name}
                </Breadcrumb.Item>
            ))}
            {currentFolder && (
                <Breadcrumb.Item
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "200px" }}
                    active
                >
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}