import { DARK_THEME, EThemes, LIGHT_THEME } from '@/constants'
import { RootState } from '@/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useMyTheme = () => {
  const theme = useSelector((state: RootState) => state.appState.theme)

  const getTheme = useMemo(() => {
    switch (theme) {
      case EThemes.LIGHT:
        return LIGHT_THEME
      case EThemes.DARK:
        return DARK_THEME
    }
  }, [theme])

  return {
    theme: getTheme
  }
}
