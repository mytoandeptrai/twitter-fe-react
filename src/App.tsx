import { Loader, Loading } from '@/components'
import { useApp, useMyTheme } from '@/hooks'
import NotFound from '@/pages/not-found'
import { routes } from '@/routes'
import PrivateRoute from '@/routes/PrivateRoute.route'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

function App() {
  const { isLoadingUser } = useApp()
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

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Loading />
        {/* Add common modal below  */}
        {/* <Suspense fallback={<Loader />}>
          <Modal />
        </Suspense> */}
        {content}
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
