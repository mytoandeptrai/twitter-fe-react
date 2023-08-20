import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/app.slice'
import userSlice from './user/user.slice'

export const store = configureStore({
  reducer: {
    appState: appSlice,
    userState: userSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
