import { createSlice } from '@reduxjs/toolkit'
import { EThemes } from '@/constants'
import { ELanguage, TAppState } from '@/types'

const appInitialState: TAppState = {
  socket: null,
  theme: EThemes.LIGHT,
  language: ELanguage.En,
  loading: {
    visible: false,
    component: null
  },
  modal: {
    visible: false,
    props: null
  },
  modalGroupChat: {
    visible: false,
    props: null
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setGlobalLoading: (state, action) => {
      state.loading = action.payload
    },
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    setModal: (state, action) => {
      state.modal = action.payload
    }
  }
})

export const { setTheme, setLanguage, setGlobalLoading, setSocket, setModal } = appSlice.actions
export default appSlice.reducer
