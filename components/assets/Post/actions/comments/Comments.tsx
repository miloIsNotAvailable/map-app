import { FC } from "react";
import Icon from "../../../Icon";
import { default as CommentsIcon } from '../../../../../graphics/icons/comment.svg'
import { styles } from "../../build/PostStyles";

const Comments: FC = () => {

    return (
        <div className={ styles.action_item_wrap }>
            <Icon 
            // style={ {
            //     width: 'calc(var(--icon-size) - .5rem)',
            //     height: 'calc(var(--icon-size) - .5rem)'
            // } } 
            iconPath={ CommentsIcon }/>       
        </div>
    )
}

export default Comments