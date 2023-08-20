import { Navigate } from 'react-router-dom'
import { ROUTES_PATH } from './routes.route'

type Props = {
  children: JSX.Element
}

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
const PrivateRoute = ({ children }: Props) => {
  /** TODO : Add Logic  to check if user has or not */
  const user = true

  if (!user) return <Navigate to={ROUTES_PATH.auth} />

  return children
}

export default PrivateRoute
