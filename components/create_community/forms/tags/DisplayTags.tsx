import { FC } from "react";
import { useRedux } from "../../../../hooks/useRedux";
import { createCommunityState } from "../../../../interfaces/reduxInterfaces";
import { styles } from "../../build/CreateStyes";
import { motion } from "framer-motion";
import { removeTags } from "../../../../redux/inputs/createCommunitySlice";

const DisplayTags: FC = () => {

    const [ { createCommunity: comm }, dispatch ] = useRedux<createCommunityState>()

    return (
        <div className={ styles.categories_wrap }>
            {
                comm?.tags && comm.tags.map( ( category ) => (
                    <motion.div
                        initial={ { transform: 'translate( 0, -100% )', opacity: 0 } } 
                        animate={ { transform: 'translate( 0, 0% )', opacity: 1 } } 
                        exit={ { transform: 'translate( 0, -100% )', opacity: 0 } } 
                        key={ category }
                        className={ styles.category }
                    >
                        { category }
                        <button 
                            className={ styles.remove }
                            onClick={ () => {
                                dispatch( removeTags( {
                                    newTag: category
                                } ) )
                            } }
                        >
                            ✖
                        </button>
                    </motion.div>
                ) )
            }
        </div>
    )
}

export default DisplayTags