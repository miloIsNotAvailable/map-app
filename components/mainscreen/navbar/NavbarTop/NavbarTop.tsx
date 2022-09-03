import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../build/NavbarStyles";
import { motion } from "framer-motion";

const NavbarTop: FC = () => {

    const routes = [ "home", "new-post", "popular", "search" ]
    const [ currentRoute, setNewRoute ] = useState<string>( routes[0] )

    const location = useLocation()

    return (
        <div className={ styles.nav_top }>   
            { routes.map( ( link ) => (
                <Link 
                    className={ styles.nav_link }
                    to={ "/" + link }
                    onClick={ () => setNewRoute( link ) }
                >
                    { link.replace( /-/g, " " ) }
                    <div 
                        className={ styles.underline }
                        style={ {
                            width: `${ currentRoute === link ? "100%" : "var(--width, 0%)" }`
                        } }
                    />
                </Link>
            ) ) }
        </div>
    )
}

export default NavbarTop