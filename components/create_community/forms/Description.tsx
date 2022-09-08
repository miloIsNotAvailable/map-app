import { FC } from "react";
import { styles } from "../build/CreateStyes";

const Description: FC = () => {

    return <form
        contentEditable
        className={ styles.inputs }
        // placeholder={ "short description" }
    >short description</form>
}

export default Description