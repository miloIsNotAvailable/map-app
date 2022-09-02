import { FC } from "react";
import { Icon } from "../icons";
import { styles } from "./NavbarStyles";

const MapIcons: FC = () => {

    const icons = [ "home", "settings", "create_community" ]

    return (
        <div className={ styles.map_icons }>
            {
                icons.map( ( icon ) => (
                    <Icon 
                        name={ `../../../../assets/icons/${ icon }.svg` }
                        title={ icon }
                        key={ icon }
                    />
                ) )
            }
        </div>
    )
}

export default MapIcons