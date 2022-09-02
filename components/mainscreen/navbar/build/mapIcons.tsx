import { FC } from "react";
import { Icon } from "../icons";
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
                icons.map( ( icon ) => (
                    <Icon 
                        { ...icon }
                        key={ icon?.title }
                    />
                ) )
            }
        </div>
    )
}

export default MapIcons