import { FC } from "react";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";

const CommentAndResponses: FC = () => {

    const arr = [
        { content: 'lorem ipsum' },
        { content: 'lorem ipsum' },
        // { content: 'lorem ipsum' },
        // { content: 'lorem ipsum' },
    ]

    return (
        <div>
            <CommentLayout/>
            <div>
                {
                    arr.map( ( { content } ) => (
                        <div className={ styles.response }>
                            <div className={ styles.response_branch }/>
                            <div>
                                <CommentLayout/>
                                {/* {
                                    arr.map( ( { content } ) => (
                                        <div className={ styles.response }>
                                            <div className={ styles.response_branch }/>
                                            <CommentLayout/>
                                        </div>
                                    ) )
                                } */}
                            </div>
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}

export default CommentAndResponses