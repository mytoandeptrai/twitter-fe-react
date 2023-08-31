import TweeterLightIcon from '@/assets/images/tweeter-light.svg'
import TweeterSmallIcon from '@/assets/images/tweeter-small.svg'
import TweeterMainIcon from '@/assets/images/tweeter.svg'
import { APP_WINDOW_SIZE, EThemes } from '@/constants'
import { useWindowSize } from '@/hooks'
import { ROUTES_PATH } from '@/routes'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

type Props = {
  isDark?: boolean
}

const Logo = ({ isDark = false }: Props): JSX.Element => {
  const theme = useSelector((state: RootState) => state.appState.theme)
  const { width } = useWindowSize()

  let imageSrc = theme !== EThemes.LIGHT ? TweeterLightIcon : TweeterMainIcon
  const isDesktopScreen = ((width ?? 0) as number) > APP_WINDOW_SIZE.OVER_OR_SAME_DESKTOP

  if (isDesktopScreen) {
    imageSrc = TweeterSmallIcon
  }

  return (
    <Link to={ROUTES_PATH.home}>
      <StyledLogoImg src={imageSrc} alt='Logo' dark={String(isDark)} />
    </Link>
  )
}

export default Logo

const StyledLogoImg = styled.img<{
  dark?: string
}>`
  filter: ${({ dark }) => (dark === 'true' ? 'invert(1)' : 'invert(0)')};
`
