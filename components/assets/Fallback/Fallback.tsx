import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { styles } from "./FallbackStyles";

const Fallback: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>["style"]> = ( style ) => {
    
    return (
        <div 
            className={ styles.loading }
            style={ style }
        />
    )
}

export default Fallback