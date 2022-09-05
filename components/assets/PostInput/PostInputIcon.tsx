import { FC } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { getInputType } from '../../../redux/inputs/postInputSlice'

interface Props {
    icon: string,
    name: string
}

const PostInputIcons: FC<Props> = ( { 
    icon, 
    name 
} ) => {

    const dispatch = useAppDispatch() 
    const handleGetInputType: () => void = () => {
        dispatch( getInputType( { type: name } ) )
    }

    return (
      <img
        onClick={ handleGetInputType }
        style={{ 
            width: "var(--icon-size)", 
            height: "var(--icon-size)" 
        }}
        src={icon}
      />
    );
}

export default PostInputIcons