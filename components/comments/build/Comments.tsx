import { FC } from "react";
import { useParams, useRoutes } from "react-router-dom";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import Navbar from "../../mainscreen/navbar";
import { styles } from "./CommentStyles";
import CommentLayout from "../comment/CommentLayout";
import CommentAndResponses from "../comment/CommentAndResponses";
import Form from "../../assets/Form";
import CommentInput from "../CommentInput/CommentInput";

const Comments: FC = () => {

    const { id } = useParams()

    return (
        <div className={ styles.comments_wrap }>
            <NavbarTop/>
            <div></div>
            <div className={ styles.comment_layout_wrap }>
                <div className={ styles.comment_section }>
                    <div className={ styles.decor }/>
                    <CommentAndResponses post_id={ id! }/>
                    {/* <CommentLayout/> */}
                    {/* <CommentLayout/> */}
                </div>
                <CommentInput id={ id! }/>
            </div>
            <Navbar/>
        </div>
    )
}

export default Comments