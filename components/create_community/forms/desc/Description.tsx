import { FC } from "react";
import { styles } from "../../build/CreateStyes";

const Description: FC = () => {

    return <form
        contentEditable
        suppressContentEditableWarning
        className={ styles.inputs }
        // placeholder={ "short description" }
    >short description</form>
}

export default Description