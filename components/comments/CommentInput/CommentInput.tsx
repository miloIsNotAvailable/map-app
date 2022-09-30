import { FC } from "react";
import Form from "../../assets/Form";
import { default as SendIcon } from '../../../graphics/icons/submitComment.svg'
import Icon from "../../assets/Icon";
import { styles } from "../build/CommentStyles";

const CommentInput: FC = () => {

    return (
        <div className={ styles.comment_input }>
            <Form placeholder="leave a comment"/>
            <Icon iconPath={ SendIcon } />
        </div>
    )
}

export default CommentInput