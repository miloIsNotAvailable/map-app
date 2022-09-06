import { FC, useEffect } from "react";
import PostInput from "../../assets/PostInput";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import Navbar from "../../mainscreen/navbar";
import { styles } from "./PostStyles";
import MediaInput from "../input-types/MediaInput";
import GetInput from "../input-types/GetInput";
import PostNavbar from "../navbar/PostNavbar";

const NewPost: FC = () => {

    useEffect( () => {
        const input = document.getElementById( "post_input" )
        if( !input ) return
        input.focus()
    }, [] )

    return (
        <div className={ styles.new_post_wrap }>
            <NavbarTop/>
            <PostInput/>
            <div className={ styles.new_post_body }>
                <GetInput/>
                <PostNavbar/>
            </div>
            <Navbar/>
        </div>
    )
}

export default NewPost