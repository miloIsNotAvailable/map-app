import { FC } from "react";
import Icon from "../../../Icon";
import { default as UpvoteIcon } from '../../../../../graphics/icons/upvote.svg'

const Upvote: FC = () => {

    return (
        <Icon 
        // style={ {
        //     width: 'calc(var(--icon-size) - .5rem)',
        //     height: 'calc(var(--icon-size) - .5rem)'
        // } } 
        iconPath={ UpvoteIcon }/>
    )
}

export default Upvote