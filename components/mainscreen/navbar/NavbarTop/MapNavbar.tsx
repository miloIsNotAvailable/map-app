import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../build/NavbarStyles";

interface Props {
    link: string
    onClick: () => any
    currentRoute: string
}

const MapNavbar: FC<Props> = ( { 
    link, 
    onClick,
    currentRoute
} ) => {

    return (
        <Link 
        className={ styles.nav_link }
        to={ "/" + link }
        onClick={ onClick }
    >
        { link.replace( /-/g, " " ) }
        <div 
            className={ styles.underline }
            style={ {
                width: `${ currentRoute === link ? "100%" : "var(--width, 0%)" }`
            } }
        />
    </Link>
    )
}

export default MapNavbar