import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewFile(props) {
    const handleSubmit = async () => {
        try {
            const res = await axios.get(`/api/v1/file/cloud/download/${props.fileId}`);
            if (res.data.link) {
                window.open(res.data.link, '_blank');
            } else {
                console.log("Download link not found");
            }
        } catch (err) {
            console.log(err.response)
        }
    }
    return (
        <>
            <Button variant="info" onClick={handleSubmit}><FontAwesomeIcon icon={faEye} /></Button>
        </>
    );
}

export default ViewFile;