import { FC, lazy, Suspense } from "react";
// import { Icon } from "../icons";
const Icon = lazy( () => import( "../../../assets/Icon" ) )
import { styles } from "./NavbarStyles";
import { default as Home } from '../../../../graphics/icons/home.svg' 
import { default as Settings } from '../../../../graphics/icons/settings.svg' 
import { default as CreateCommunity } from '../../../../graphics/icons/create_community.svg' 
import { useNavigate } from "react-router-dom";
import Fallback from "../../../assets/Fallback";

const MapIcons: FC = () => {

    const icons = [ 
        { name: Home, title: "home" }, 
        { name: Settings, title: "settings" }, 
        { name: CreateCommunity, title: "create community" } 
    ]

    const navigate = useNavigate()
    // const url = title.replace( /\s/, "-" )

    return (
        <>
            <div className={ styles.profile_icon } tabIndex={ 0 }>
                <div className={ styles.profile_menu }/>
            </div>
            <div className={ styles.map_icons }>
                {
                    icons.map( ( { title, name } ) => (
                        <Suspense 
                            key={ title } 
                            fallback={
                                <Fallback
                                    width={ 'calc(var(--font-size) + .5rem)' }
                                />
                            }
                        >
                            <Icon 
                                placeholder={ title }
                                iconPath={ name }
                                key={ title }
                                onClick={ () => {
                                    const url = title.replace( /\s/, "-" )
                                    navigate( "/" + url )
                                } }
                            />
                        </Suspense>
                    ) )
                }
            </div>
        </>
    )
}

export default MapIcons