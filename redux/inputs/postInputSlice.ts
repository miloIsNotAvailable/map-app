import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { inputType } from '../../interfaces/reduxInterfaces'

const initialState: inputType = {
    type: "text"
}

const postInputTypeSlice = createSlice( {
    name: 'postInputTypeSlice',
    initialState,
    reducers: {
        getInputType: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.type = action.payload.type
        }
    }
} )

export const { 
    getInputType
} = postInputTypeSlice.actions

export default postInputTypeSlice.reducer