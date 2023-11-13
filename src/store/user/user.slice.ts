import { IUser } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface IUserState {
  user: IUser | null
  users: IUser[]
  connectedUser: IUser[] | null
  isLoading: boolean
}

const initialState: IUserState = {
  user: null,
  users: [],
  connectedUser: null,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setConnectedUsers: (state, action) => {
      state.connectedUser = action.payload
    }
  }
})

export const { setUser, setConnectedUsers } = userSlice.actions
export const selectSelectedUsersState = (state: RootState) => state.userState.connectedUser

export default userSlice.reducer
