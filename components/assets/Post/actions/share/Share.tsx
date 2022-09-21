import { FC } from 'react'
import Icon from '../../../Icon'
import { styles } from '../../build/PostStyles'
import { default as ShareIcon } from '../../../../../graphics/icons/link.svg'

const Share: FC = () => {

    return (
        <div className={ styles.action_item_wrap }>
            <Icon 
            style={ {
                width: 'calc(var(--icon-size) - .5rem)',
                height: 'calc(var(--icon-size) - .5rem)'
            } } 
            iconPath={ ShareIcon }/>
        </div>
    )
}

export default Share