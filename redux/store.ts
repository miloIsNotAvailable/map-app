import { configureStore } from '@reduxjs/toolkit'
import { fetchApi } from './api/fetchApi'
import userUserDataSlice from './auth/userDataSlice'
// import newItemSlice from './newItem/newItemSlice'
// import addToCart from './cartSlice/cartSlice'

export const store = configureStore({
  reducer: {
      [fetchApi.reducerPath]: fetchApi.reducer,
      userData: userUserDataSlice,
      // newItemData: newItemSlice,
  },
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware().concat( [ fetchApi.middleware ] )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch