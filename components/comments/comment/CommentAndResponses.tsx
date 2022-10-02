import { FC } from "react";
import { styles } from "../build/CommentStyles";
import CommentLayout from "./CommentLayout";
import Response from "./Response";

const CommentAndResponses: FC = () => {

    const arr = [
        { content: 'lorem ipsum', responses: [ { content: "" }, { content: "" } ] },
        { content: 'lorem ipsum', responses: [ { content: "", responses: [ { content: "" } ] } ] },
        // { content: 'lorem ipsum' },
        // { content: 'lorem ipsum' },
    ]

    return (
        <div>
            <CommentLayout/>
            <Response arr={ arr }/>
        </div>
    )
}

export default CommentAndResponses