import { useReducer, useEffect } from "react"
import axios from 'axios';

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
    SET_CHILD_FILES: "set-child-files",
}

export const ROOT_FOLDER = { name: "Root", id: null, path: [], subFolders: [], files: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    })

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folderId, folder])

    useEffect(() => {
        const fetchFolderData = async () => {
            if (folderId === null) {
                const response1 = await axios.get('/api/v1/folder/');
                const response2 = await axios.get('/api/v1/file/');

                const updatedRootFolder = {
                    ...ROOT_FOLDER,
                    subFolders: response1.data.folders,
                    files: response2.data.files
                };

                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: updatedRootFolder }
                });
            } else {
                await axios.get(`/api/v1/folder/${folderId}`)
                    .then(function (res) {
                        dispatch({
                            type: ACTIONS.UPDATE_FOLDER,
                            payload: { folder: res.data.folder },
                        })
                    }
                    )
                    .catch(function () {
                        dispatch({
                            type: ACTIONS.UPDATE_FOLDER,
                            payload: { folder: ROOT_FOLDER },
                        })
                    })
            }
        }
        fetchFolderData();
    }, [folderId])

    return state
}