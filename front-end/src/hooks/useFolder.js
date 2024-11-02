import { useReducer, useEffect, useCallback } from "react"
import axios from 'axios';

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
}

export const ROOT_FOLDER = { name: "Root", id: null, subFolders: [], files: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
    })

    // New method to refetch folder data
    const refetchFolderData = useCallback(async () => {
        try {
            if (folderId === null) {
                const response1 = await axios.get('/api/v1/folder/');
                const response2 = await axios.get('/api/v1/file/');
                const folders = response1.data.folders;
                const files = response2.data.files;
                const updatedRootFolder = {
                    ...ROOT_FOLDER,
                    subFolders: folders.filter(folder => folder.parentFolderId === null),
                    files: files.filter(file => file.folderId === null)
                };
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: updatedRootFolder }
                });
            } else {
                const res = await axios.get(`/api/v1/folder/${folderId}`);
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: res.data.folder },
                });
            }
        } catch (error) {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            });
        }
    }, [folderId]);

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folderId, folder])

    useEffect(() => {
        refetchFolderData();
    }, [folderId, refetchFolderData])

    // Return the refetch method along with the state
    return {
        ...state,
        refetchFolderData
    }
}