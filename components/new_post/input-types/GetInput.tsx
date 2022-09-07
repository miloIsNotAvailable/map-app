import { FC, lazy, Suspense } from "react";
import { useAppSelector } from "../../../redux/hooks";
// import MediaInput from "./MediaInput";
// import TextInput from "./TextInput";
const TextInput = lazy( () => import( "./TextInput" ) )
const MediaInput = lazy( () => import( "./MediaInput" ) )
import { postInputTypeState } from '../../../interfaces/reduxInterfaces'
import { styles } from "../build/PostStyles";
import Fallback from "../../assets/Fallback";

const GetInput: FC = () => {

    const inputs = [
        { type: "text", Component: TextInput },
        { type: "media", Component: MediaInput },
    ]

    const inputType = useAppSelector( ( state: postInputTypeState ) => state.postInputType.type )

    return (
      <div className={ styles.post_input_wrap }>
        {inputs.map(({ type, Component }) => (
          <Suspense
            key={type}
            fallback={
              <Fallback
                width = "60vw"
                height = "calc( 100% - 2rem )"
              />
            }
          >
            {inputType === type && <Component/>}
          </Suspense>
        ))}
      </div>
    );
}

export default GetInput