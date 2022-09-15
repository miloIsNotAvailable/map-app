import { FC } from "react";
import { styles } from './PostInputStyles'

const AddCommunity: FC = () => {

    return (
        <div className={ styles.wrap_community_input }>
            <div className={ styles.icon }/>
            <input
                placeholder={ "+" }
                className={ styles.add_community_input }
            />
        </div>
    )
}

export default AddCommunity