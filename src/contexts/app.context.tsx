import React, { useContext, useMemo, useReducer } from 'react'

const initialState = {}

const AppContext = React.createContext<{
  state: any
  dispatch: any
} | null>(null)

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === null) {
    throw new Error('AppContext is not available')
  }
  return context
}

export default AppProvider
