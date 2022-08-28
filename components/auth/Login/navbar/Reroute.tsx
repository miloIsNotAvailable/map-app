import { FC } from "react";
import { Link } from "react-router-dom";
import { Loose } from '../../../../interfaces/custom'

type strings = 'signup' | 'login'
type links = `/${ strings }`

interface Props {
    link: Loose<links, string>
    children: JSX.Element | JSX.Element[] | Loose<strings, string>
}

const Reroute: FC<Props> = ( { link, children } ) => {

    return (
        <Link to={ link as string }>
            { children }
        </Link>
    )
}

export default Reroute