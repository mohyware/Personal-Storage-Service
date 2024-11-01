import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ViewFolder(props) {
    return (
        <>
            <Link to={`/folder/${props.FolderId}`} style={{ textDecoration: 'none' }}>
                <Button variant="info">
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </Link>
        </>
    );
}

export default ViewFolder;