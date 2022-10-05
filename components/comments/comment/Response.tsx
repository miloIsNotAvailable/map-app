import { FC } from "react";
import { Comments } from "../../../db/orm/dbinterfaces";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";

interface ResponseProps {
    // arr: (Comments & { responses?: Comments[] | null })[]
    arr: any[]
}

const Response: FC<ResponseProps> = ( { arr } ) => {

    if ( !arr.length ) return <></>

    return (
        <div className={ styles.nested_response }>
            {
                arr && arr.map( ( { responses, content } ) => (
                    <div 
                        className={ styles.response }
                        style={ { height: `calc( ${ responses?.length } * 3rem + 3rem )` } }
                    >
                        <div className={ styles.response_branch }/>
                        <div className={ styles.response_wrap }>
                            <CommentLayout content={ content }/>
                            <div className={ styles.response_wrap }>
                                {responses && <Response arr={ responses }/>}
                            </div>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
}

export default Response