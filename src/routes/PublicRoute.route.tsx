import React from 'react'

// Libs
import { Route } from 'react-router-dom'

interface PropTypes {
  component: React.ComponentType<any>
}

/**
 * Public route component
 *
 * @param Component
 *  Component to be displayed
 * @param rest
 *  Props passed in
 */
const PublicRoute: React.FC<PropTypes> = ({ component: Component, ...rest }) => {
  return <Route {...rest} element={<Component />} />
}

export default PublicRoute
