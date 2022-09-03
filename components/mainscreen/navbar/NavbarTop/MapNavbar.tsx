import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
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

    const { data } = useAuth()
    console.log( data )

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