import { FC } from "react";
import Icon from "../../../Icon";
import { default as CommentsIcon } from '../../../../../graphics/icons/comment.svg'
import { styles } from "../../build/PostStyles";
import { Link } from "react-router-dom";

interface CommentsProps {
    post_id: string
}

const Comments: FC<CommentsProps> = ( { post_id } ) => {

    return (
        <Link to={ "/comments/" + post_id } className={ styles.action_item_wrap }>
            <Icon 
            // style={ {
            //     width: 'calc(var(--icon-size) - .5rem)',
            //     height: 'calc(var(--icon-size) - .5rem)'
            // } } 
            iconPath={ CommentsIcon }/>       
        </Link>
    )
}

export default Comments