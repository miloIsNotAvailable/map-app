import { FC } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Form from "../Form";
import { styles } from "./PostInputStyles";

const PostInputForm: FC = () => {

    const { isLoading, data } = useAuth()

    if( isLoading ) return <div 
        className={ styles.loading }
        style={ { width: '100%', height: '3rem' } }
    />

    return (
        <Form
            id="post_input"
            type={ "text" }
            placeholder={ "post title..." }
        />
    )
}

export default PostInputForm