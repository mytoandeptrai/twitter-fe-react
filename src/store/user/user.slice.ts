import { IUser } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

export interface IUserState {
  user: IUser | null
  users: IUser[]
  isLoading: boolean
}

const initialState: IUserState = {
  user: null,
  users: [],
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
