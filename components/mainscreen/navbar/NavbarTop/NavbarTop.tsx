import { FC, lazy, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import { styles } from "../build/NavbarStyles";
// import MapNavbar from "./MapNavbar";
const MapNavbar = lazy( () => import( "./MapNavbar" ) )

const NavbarTop: FC = () => {

    const routes = [ "home", "new-post", "popular", "search" ]
    const location = useLocation()
    const [ currentRoute, setNewRoute ] = useState<string>( location.pathname.replace( "/", "" ) )

    return (
        <div className={ styles.nav_top }>   
            { routes.map( ( link ) => (
                <Suspense 
                    key={ "/" + link }
                    fallback={ 
                        <div 
                            key={ "/" + link } 
                            className={ styles.loading }
                        />
                    }>
                    <MapNavbar
                        link={ link }
                        onClick={ () => setNewRoute( link ) }
                        currentRoute={ currentRoute }
                        // key={ link }
                    />
                </Suspense>
            ) ) }
        </div>
    )
}

export default NavbarTop