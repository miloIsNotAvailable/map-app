import { FC, useEffect } from "react";
import PostInput from "../../assets/PostInput";
import NavbarTop from "../../mainscreen/navbar/NavbarTop";
import Navbar from "../../mainscreen/navbar";
import { styles } from "./PostStyles";
import MediaInput from "../input-types/MediaInput";
import GetInput from "../input-types/GetInput";
import PostNavbar from "../navbar/PostNavbar";
import SubmitNavbar from "../../assets/SubmitNavbar";
import { useRedux } from "../../../hooks/useRedux";
import { postInputTypeState } from "../../../interfaces/reduxInterfaces";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NewPost: FC = () => {

    useEffect( () => {
        const input = document.getElementById( "post_input" )
        if( !input ) return
        input.focus()
    }, [] )

    const { data, isLoading } = useAuthContext()
    const navigate = useNavigate()

    useEffect( () => {
        if( !isLoading && data && !data?.user?.id ) navigate( -1 )
    }, [ data, isLoading ] )

    const [ { postInputType }, dispatch ] = useRedux<postInputTypeState>()

    return (
        <div className={ styles.new_post_wrap }>
            <NavbarTop/>
            <PostInput/>
            <div className={ styles.new_post_body }>
                <GetInput/>
                <SubmitNavbar
                    isLoading={ false }
                    onSubmit={ () => console.log( { ...postInputType, user_id: data?.user?.id } ) }
                    onCancel={ () => {} }
                />
            </div>
            <Navbar/>
        </div>
    )
}

export default NewPost