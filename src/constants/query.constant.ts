export const SORT_STALE_TIME = 60 * 60 * 1000 // 1 hour
export const LONG_STATE_TIME = 60 * 60 * 1000 * 24 // 1 day
export const DEFAULT_LIST_LIMIT = 20

export enum EAuthQuery {
  Login = 'Login',
  Register = 'Register',
  Logout = 'Logout'
}

export enum EUserQuery {
  GetMe = 'GetMe',
  GetUser = 'GetUser',
  GetPopularUser = 'GetPopularUser'
}
