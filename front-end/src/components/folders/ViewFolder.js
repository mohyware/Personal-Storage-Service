import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ViewFolder(props) {
    return (
        <>
            <Link to={`/Home/${props.FolderId}`} style={{ textDecoration: 'none' }}>
                <Button variant="info">VIew</Button>
            </Link>
        </>
    );
}

export default ViewFolder;