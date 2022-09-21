import { FC } from "react";
import Icon from "../../../Icon";
import { default as DownvoteIcon } from '../../../../../graphics/icons/downvote.svg'

const Downvote: FC = () => {

    return (
        <Icon 
        style={ {
            width: 'calc(var(--icon-size) - .5rem)',
            height: 'calc(var(--icon-size) - .5rem)'
        } } 
        iconPath={ DownvoteIcon }/>
    )
}

export default Downvote