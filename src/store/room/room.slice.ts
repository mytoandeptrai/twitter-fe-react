import { IJoinedRoom, IRoom } from '@/types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface IRoomState {
  connectedRooms: IRoom[] | null
  joinedRoom: IJoinedRoom | null
}

const initialState: IRoomState = {
  connectedRooms: null,
  joinedRoom: null
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setConnectedRoom: (state, action) => {
      state.connectedRooms = action.payload
    },
    setJoinedRoom: (state, action) => {
      state.joinedRoom = action.payload
    }
  }
})

const selectConnectedRooms = (state: RootState) => state.roomState.connectedRooms

export const getConnectedRoomSelector = (roomId: string) => {
  return createSelector(selectConnectedRooms, (connectedRooms) =>
    connectedRooms ? connectedRooms.find((room) => room?._id === roomId) : null
  )
}

export const { setConnectedRoom, setJoinedRoom } = roomSlice.actions
export default roomSlice.reducer
