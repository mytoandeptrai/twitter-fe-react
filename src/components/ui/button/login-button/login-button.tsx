import { CommonButton } from '@/components'
import { ROUTES_PATH } from '@/routes'
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link to={ROUTES_PATH.auth}>
      <CommonButton>Login</CommonButton>
    </Link>
  )
}

export default LoginButton
