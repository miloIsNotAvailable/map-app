import { FC } from "react";
import { Link } from "react-router-dom";
import Post from "../../assets/Post";
import PostInput from "../../assets/PostInput";
import Navbar from "../navbar/build/Navbar";
import NavbarTop from "../navbar/NavbarTop";
import { styles } from "./MainscreenStyles";

const Mainscreen: FC = () => {

    return (
        <div className={ styles.mainscreen_wrap }>
            <NavbarTop/>
            <Link to="/new-post">
                <PostInput/>
            </Link>
            <Post/>
            <Navbar/>
        </div>
    )
}

export default Mainscreen