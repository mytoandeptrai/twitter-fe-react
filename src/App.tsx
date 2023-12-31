import { Loader, Loading } from '@/components'
import { useApp, useMyTheme } from '@/hooks'
import NotFound from '@/pages/not-found'
import { routes } from '@/routes'
import PrivateRoute from '@/routes/PrivateRoute.route'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useSocket } from './socket'

const CommonModal = React.lazy(() => import('@/components/ui/modal/common-modal/common-modal'))
const GroupChatCreateModal = React.lazy(() => import('@/features/chat/group-chat-create-modal/group-chat-create-modal'))

function App() {
  // eslint-disable-next-line no-empty-pattern
  const {} = useSocket()
  const { isLoadingUser, modal } = useApp()
  const { theme } = useMyTheme()

  let content = null

  if (isLoadingUser) {
    content = <Loader />
  } else {
    content = (
      <Routes>
        <React.Fragment>
          {routes.map((route) => {
            const { Element, path, isLazy, isPrivate } = route

            const Component = isLazy ? (
              <Suspense fallback={<Loader />}>
                <Element />
              </Suspense>
            ) : (
              <Element />
            )

            const wrapperComponent = (Component: JSX.Element) => {
              if (isPrivate) {
                return <PrivateRoute>{Component}</PrivateRoute>
              }

              return Component
            }

            return <Route key={path} path={path} element={wrapperComponent(Component)} />
          })}
          <Route path='*' element={<NotFound />} />
        </React.Fragment>
      </Routes>
    )
  }

  const renderCommonModal = () => {
    return (
      <Suspense fallback={<Loader />}>
        <CommonModal />
      </Suspense>
    )
  }

  const renderGroupChatCreateModal = () => {
    if (modal.visible) {
      return (
        <Suspense fallback={<Loader />}>
          <GroupChatCreateModal />
        </Suspense>
      )
    }

    return null
  }

  const renderModals = () => {
    return (
      <React.Fragment>
        {renderGroupChatCreateModal()}
        {renderCommonModal()}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Loading />
        {renderModals()}
        {content}
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
