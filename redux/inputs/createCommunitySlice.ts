import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createCommunityType } from '../../interfaces/reduxInterfaces'

const initialState: Partial<createCommunityType> = {
    desc: "",
    img: "",
    name: "",
    newTag: "",
    tags: []
}

const createCommunitySlice = createSlice( {
    name: 'createCommunitySlice',
    initialState,
    reducers: {
        getTags: (
            state: Partial<createCommunityType>,
            action: PayloadAction<Partial<createCommunityType>>
        ) => {
            const chosen = !!state.tags?.find( n => n === action.payload.newTag )

            if( !chosen )   
                state.tags = [...state.tags!, action.payload.newTag!] 
        },

        removeTags: (
            state: Partial<createCommunityType>,
            action: PayloadAction<Partial<createCommunityType>>
        ) => {
            action.payload.newTag && state.tags?.splice( state.tags.indexOf( action.payload.newTag), 1 )
        },
    }
} )

export const { 
    getTags,
    removeTags
} = createCommunitySlice.actions

export default createCommunitySlice.reducer