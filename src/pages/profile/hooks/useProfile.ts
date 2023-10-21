import { EProfileScreen, EUserQuery, LONG_STATE_TIME } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { useUserService } from '@/services'
import { queryStringToObject } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const useProfile = () => {
  const { userId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { screen } = queryStringToObject(location.search)

  const { getUser } = useUserService()

  const onChangeScreen = useCallback(
    (nextScreen: EProfileScreen) => {
      if (screen !== nextScreen) {
        navigate({
          pathname: location.pathname,
          search: `?screen=${nextScreen}`
        })
      }
    },
    [location.pathname, navigate, screen]
  )

  const { data: userData, isLoading } = useQuery([EUserQuery.GetUser, userId], getUser, {
    staleTime: LONG_STATE_TIME,
    retry: 0,
    onError: (error: any) => navigate(ROUTES_PATH.notFound)
  })

  return {
    userData,
    isLoading,
    screen,
    onChangeScreen
  }
}
