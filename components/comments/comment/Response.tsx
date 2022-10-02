import { FC } from "react";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";

interface ResponseProps {
    arr: ({ content: string, responses: any[] })[]
}

const Response: FC<ResponseProps> = ( { arr } ) => {

    return (
        <div className={ styles.nested_response }>
            {
                arr && arr.map( ( { responses } ) => (
                    <div 
                        className={ styles.response }
                        style={ { height: `calc( ${ responses?.length } * 3rem + 3rem )` } }
                    >
                        <div className={ styles.response_branch }/>
                        <div 
                            className={ styles.response_wrap }
                            style={ { height: `fit-content` } }
                        >
                            <CommentLayout/>
                            <Response arr={ responses }/>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
}

export default Response