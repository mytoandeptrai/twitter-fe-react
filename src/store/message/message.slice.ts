import { IMessage } from '@/types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface IMessageState {
  newMessage: IMessage | null
  messages: any
}

const initialState: IMessageState = {
  newMessage: null,
  messages: {}
}

export const messageSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.newMessage = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    }
  }
})

const selectMessagesState = (state: RootState) => state.messageState.messages

export const getMessagesInRoom = (roomId: string) => {
  return createSelector(selectMessagesState, (messagesState) => messagesState?.[roomId] || [])
}

export const { setNewMessage, setMessages } = messageSlice.actions
export default messageSlice.reducer
