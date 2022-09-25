import { FC } from "react";
import { styles } from "../../build/SearchStyles";

interface TitleProps {
    name: string
}

const Title: FC<TitleProps> = ( { name } ) => {

    return (
        <div className={ styles.display_community_title }>
            <div className="icon"/>
            <div>{ name }</div>
        </div>
    )
}

export default Title