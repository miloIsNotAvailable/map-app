import { FC, lazy, Suspense } from "react";
// import { Icon } from "../icons";
const Icon = lazy( () => import( "../icons" ) )
import { styles } from "./NavbarStyles";
import { default as Home } from '../../../../graphics/icons/home.svg' 
import { default as Settings } from '../../../../graphics/icons/settings.svg' 
import { default as CreateCommunity } from '../../../../graphics/icons/create_community.svg' 

const MapIcons: FC = () => {

    const icons = [ 
        { name: Home, title: "home" }, 
        { name: Settings, title: "settings" }, 
        { name: CreateCommunity, title: "create community" } 
    ]

    return (
        <div className={ styles.map_icons }>
            {
                icons.map( ( { title, name } ) => (
                    <Suspense fallback={ 
                        <div 
                            className={ styles.loading }
                            style={ { width: 'calc(var(--font-size) + .5rem)' } }
                        /> 
                    }>
                        <Icon 
                            title={ title }
                            name={ name }
                            key={ title }
                        />
                    </Suspense>
                ) )
            }
        </div>
    )
}

export default MapIcons