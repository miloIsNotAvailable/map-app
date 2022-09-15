import { FC, lazy, Suspense } from "react";
import { postInputTypeState } from '../../../interfaces/reduxInterfaces'
import { styles } from "../build/PostStyles";
import Fallback from "../../assets/Fallback";
import AddCommunity from "../../assets/PostInput/PostInputCommunity";
import { useRedux } from "../../../hooks/useRedux";

const TextInput = lazy( () => import( "./TextInput" ) )
const MediaInput = lazy( () => import( "./MediaInput" ) )

const GetInput: FC = () => {

    const inputs = [
        { type: "text", Component: TextInput },
        { type: "media", Component: MediaInput },
    ]

    const [ { postInputType } ] = useRedux<postInputTypeState>()

    return (
      <div className={ styles.post_input_wrap }>
        <AddCommunity/>
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
            {postInputType?.type === type && <Component/>}
          </Suspense>
        ))}
      </div>
    );
}

export default GetInput