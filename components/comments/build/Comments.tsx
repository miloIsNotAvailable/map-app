import { FC } from "react";
import { useParams, useRoutes } from "react-router-dom";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import Navbar from "../../mainscreen/navbar";
import { styles } from "./CommentStyles";
import CommentLayout from "../comment/CommentLayout";

const Comments: FC = () => {

    const { id } = useParams()

    return (
        <div className={ styles.comments_wrap }>
            <NavbarTop/>
            <div></div>
            <div className={ styles.comment_layout_wrap }>
                <div className={ styles.decor }/>
                <CommentLayout/>
                <CommentLayout/>
                <CommentLayout/>
            </div>
            <Navbar/>
        </div>
    )
}

export default Comments