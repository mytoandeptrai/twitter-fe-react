import { useMyTheme } from '@/hooks'
import { RootState } from '@/store'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { styled } from 'styled-components'

const Loading = () => {
  const { theme } = useMyTheme()
  const loading = useSelector((state: RootState) => state.appState.loading)

  return (
    <StyledRoot visible={loading.visible.toString()}>
      {loading.component ? loading.component : <ClipLoader color={theme.backgroundColor1} />}
    </StyledRoot>
  )
}

export default memo(Loading)

const StyledRoot = styled.div<{
  visible?: string
}>`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => {
    return theme.backgroundColor3
  }};
  opacity: 0.5;
  display: ${({ visible }) => {
    const flexOrNone = visible === 'true'
    return flexOrNone ? 'flex' : 'none'
  }};
  align-items: center;
  justify-content: center;
`
