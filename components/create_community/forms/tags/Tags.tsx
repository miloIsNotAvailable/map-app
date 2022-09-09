import { FC, useRef } from "react";
import { useRedux } from "../../../../hooks/useRedux";
import { createCommunityState } from "../../../../interfaces/reduxInterfaces";
import { getTags } from "../../../../redux/inputs/createCommunitySlice";
import { styles } from "../../build/CreateStyes";

const Tags: FC = () => {

    // const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement | null>( null )

    // const selector = useAppSelector( ( state: createCommunityState ) => state.createCommunity.tags )
    const [ { createCommunity }, dispatch ] = useRedux<createCommunityState>()
    console.log( createCommunity?.tags )

    const addTag: () => void = () => {
        
        if( !inputRef.current || !inputRef.current.value ) return

        dispatch( getTags( {
            newTag: inputRef.current.value,
        } ) )
    }

    return (
        <div className={ styles.add_tags_wrap }>
            <input
                ref={ inputRef }
                className={ styles.inputs }
                placeholder={ "tags" }
            />
            <div className={ styles.add_tags } onClick={ addTag }>
                {"+"}
            </div>
        </div>
    )
}

export default Tags