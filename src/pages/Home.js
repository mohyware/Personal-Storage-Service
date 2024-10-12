import NavbarComponent from "../components/NavbarComponent";
import AddFolder from "../components/AddFolder";
import UploadFile from "../components/UploadFile";
import Dashboard from "../components/Dashboard";
import './style.css'
const Home = () => {
    return (
        <div>
            <NavbarComponent />
            <div className="grid-container">
                <div className="item1">
                    <AddFolder />
                    <UploadFile />
                </div>
                <div className="item1">
                    /root/
                    <Dashboard />
                </div>
            </div>
        </div>
    )

}
export default Home;