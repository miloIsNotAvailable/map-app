import { FC } from "react";

interface Props {
    name: string
    title: string
}

const Icon: FC<Props> = ( { name, title } ) => {

    return (
        <div>
            <img src={ name }/>
            {/* <div>{ title.replace( /_/g, " " ) }</div> */}
        </div>
    )
}

export default Icon