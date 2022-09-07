import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    name: string
    title: string
}

const Icon: FC<Props> = ( { name, title } ) => {

    const navigate = useNavigate()
    const url = title.replace( /\s/, "-" )

    return (
        <div 
            placeholder={ title }
            onClick={ () => navigate( "/" + url ) }
        >
            <img src={ name }/>
            {/* <div>{ title.replace( /_/g, " " ) }</div> */}
        </div>
    )
}

export default Icon