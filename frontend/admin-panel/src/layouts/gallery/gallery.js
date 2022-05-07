import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom"
import "./gallery.css"
const Gallery = () => {
    const navigate = useNavigate()
    const imagesView = () => {
        navigate("gallery/images/");
    }
    const videosView = () => {
        navigate("gallery/videos/");
    }
    return(
     <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <div className="galleryOptions">
            <button onClick={() => imagesView}>Images</button>
            <button onClick={() => videosView}>Video</button>
        </div>
    </DashboardLayout>
    )
}
export default Gallery