import { FC } from "react";
import { Link } from "react-router-dom";
import PostInput from "../../assets/PostInput";
import Navbar from "../../mainscreen/navbar";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import Posts from "../posts/Posts";
import { styles } from "./PopularStyles";

const Popular:FC = () => {

    return (
        <div className={ styles.popular_wrap }>
            <NavbarTop/>
            <Link to="/new-post">
                <PostInput/>
            </Link>
            <Posts/>
            <Navbar/>
        </div>
    )
}

export default Popular