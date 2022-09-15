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
        },

        getCommunity: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.community = action.payload.community
        },

        getTitle: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.title = action.payload.title
        },

        getContent: (
            state: inputType,
            action: PayloadAction<inputType>
        ) => {
            state.content = action.payload.content
        }
    }
} )

export const { 
    getInputType,
    getCommunity,
    getContent,
    getTitle
} = postInputTypeSlice.actions

export default postInputTypeSlice.reducer