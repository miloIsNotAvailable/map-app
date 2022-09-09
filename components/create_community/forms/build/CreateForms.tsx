import { FC, lazy, Suspense } from "react";
import Fallback from "../../../assets/Fallback";
import { styles } from "../../build/CreateStyes";
import DisplayTags from "../tags/DisplayTags";
const Tags = lazy( () => import( "../tags/Tags" ) )
const Description = lazy( () => import( "../desc/Description" ) )

const CreateForms: FC = () => {

    return (
        <div className={styles.input_wrap}>
          <Suspense fallback={<Fallback width="100%" height="100%" />}>
            <Description />
          </Suspense>
          <Suspense fallback={<Fallback width="100%" height="100%"/>}>
            <Tags />
          </Suspense>
          <DisplayTags/>
        </div>
    )
}

export default CreateForms