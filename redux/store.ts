import { configureStore } from '@reduxjs/toolkit'
import { fetchApi } from './api/fetchApi'
import userUserDataSlice from './auth/userDataSlice'
import postInputType from './inputs/postInputSlice'
import createCommunity from './inputs/createCommunitySlice'
import postActions from './postActions/postActionsSlice'
import commentType from './commentTypes/CommentTypes'

export const store = configureStore({
  reducer: {
      [fetchApi.reducerPath]: fetchApi.reducer,
      userData: userUserDataSlice,
      postInputType,
      createCommunity,
      postActions,
      commentType
  },
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware().concat( [ fetchApi.middleware ] )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch