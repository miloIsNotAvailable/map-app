import { FC } from "react";
import { styles } from "./IconStyles";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface IconProps extends Props {
    iconPath: string, 
}

const Icon: FC<IconProps> = ( {iconPath, ...args} ) => {

    return (
        <div 
            className={ styles.icon } 
            { ...args }
        >
            <img 
                src={ iconPath } 
            />
        </div>
    )
}

export default Icon