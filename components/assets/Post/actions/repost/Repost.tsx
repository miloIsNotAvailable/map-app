import { FC } from "react";
import Icon from "../../../Icon";
import { styles } from "../../build/PostStyles";
import { default as RepostIcon } from '../../../../../graphics/icons/repost.svg'

const Repost: FC = () => {

    return (
        <div className={ styles.action_item_wrap }>
            <Icon 
            style={ {
                width: 'calc(var(--icon-size) - .5rem)',
                height: 'calc(var(--icon-size) - .5rem)'
            } } 
            iconPath={ RepostIcon }/>
        </div>
    )
}

export default Repost