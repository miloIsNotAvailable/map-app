import { FC } from "react";
import { styles } from "../../build/SearchStyles";

interface DescProps {
    desc: string
}

const Desc: FC<DescProps> = ( { desc } ) => {
    
    return (
        <div className={ styles.display_community_desc }>
            { desc }
        </div>
    )
}

export default Desc