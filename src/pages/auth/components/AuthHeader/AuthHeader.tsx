import { EFontWeight } from '@/constants'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { EAuthScreen } from '../../hooks'

type Props = {
  isLoginScreen: boolean
  onChangeScreen: (screen: EAuthScreen) => void
}

const AuthHeader = ({ isLoginScreen, onChangeScreen }: Props) => {
  const { t } = useTranslation()

  const buttonContent = isLoginScreen ? t('common.text.registerHere') : t('common.text.loginHere')
  const subHeading = isLoginScreen ? t('common.text.doNotHaveAnAccount') : t('common.text.doYouHaveAnAccount')

  const onClick = () => {
    const screen = isLoginScreen ? EAuthScreen.Register : EAuthScreen.Login
    onChangeScreen(screen)
  }

  return (
    <React.Fragment>
      <StyledHeader>
        <StyledHeading>{t('common.heading.authenticationGreeting')}</StyledHeading>
        <StyledSubHeading>
          {subHeading}
          <StyledSwitchScreenButton onClick={onClick}>{buttonContent}</StyledSwitchScreenButton>
        </StyledSubHeading>
      </StyledHeader>
    </React.Fragment>
  )
}

export default memo(AuthHeader)

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.backgroundColor1};
`

const StyledHeading = styled.h2`
  font-weight: bold;
  text-align: center;
`

const StyledSubHeading = styled.p`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor3};
`

const StyledSwitchScreenButton = styled.button`
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
  transform: translateY(1px);
`
