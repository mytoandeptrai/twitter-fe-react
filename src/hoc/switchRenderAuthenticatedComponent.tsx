import { useUserService } from '@/services'
import React from 'react'

const switchRenderAuthenticatedComponent = <P extends Record<string, any>>(
  ShouldBeRenderedComponentIfAuthenticated: React.ComponentType<P>,
  ShouldBeRenderedComponentIfNotAuthenticated?: React.ComponentType<P>
) => {
  const AuthenticatedComponent = ShouldBeRenderedComponentIfAuthenticated
  const NotAuthenticatedComponent = ShouldBeRenderedComponentIfNotAuthenticated

  return (props: P) => {
    const { getCurrentUser } = useUserService()
    const user = getCurrentUser()
    const isAuthenticated = !!user?._id.length

    if (isAuthenticated) {
      return <AuthenticatedComponent {...props} />
    }

    if (NotAuthenticatedComponent) {
      return <NotAuthenticatedComponent {...props} />
    }

    return null
  }
}

export default switchRenderAuthenticatedComponent
