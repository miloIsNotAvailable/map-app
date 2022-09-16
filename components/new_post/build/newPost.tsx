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
import { getUserId } from "../../../redux/inputs/postInputSlice";
import { useCreatePostMutation } from "../../../redux/api/fetchApi";

const NEW_POST = `
mutation newPost ( $user_id: String, $community: String, $type: String, $title: String, $content: String ){
    createNewPost(
      user_id:$ user_id,
      community: $community,
      type: $type,
      title: $title,
      content: $content
    ){
      user_id
      community
      type
      title
      content
    }
  }
`

const NewPost: FC = () => {

    useEffect( () => {
        const input = document.getElementById( "post_input" )
        if( !input ) return
        input.focus()
    }, [] )

    const { data, isLoading } = useAuthContext()
    const navigate = useNavigate()

    const [ { postInputType }, dispatch ] = useRedux<postInputTypeState>()
    const [ createNewPost, { data: postData, isLoading: postLoading, isError } ] = useCreatePostMutation()

    useEffect( () => {
        
        if( !isLoading && data && !data?.user?.id ) {
            navigate( -1 )
            return
        }

        dispatch( getUserId( {
            user_id: data?.user?.id
        } ) )

    }, [ data, isLoading ] )


    return (
        <div className={ styles.new_post_wrap }>
            <NavbarTop/>
            <PostInput/>
            <div className={ styles.new_post_body }>
                <GetInput/>
                <SubmitNavbar
                    isLoading={ postLoading }
                    onSubmit={ async() => {
                        
                        // console.log( postInputType )

                        createNewPost( {
                            body: NEW_POST,
                            variables: postInputType
                        } )
                    } }
                    onCancel={ () => {} }
                />
            </div>
            <Navbar/>
        </div>
    )
}

export default NewPost