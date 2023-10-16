import { EFontSize, EFontWeight, EStoryType } from '@/constants'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { generateStoryOptions } from './create-story-sidebar.config'
import { useUserService } from '@/services'
import styled from 'styled-components'
import { AudienceSelector, CommonButton, Logo, SmallAvatar, StyledFlex } from '@/components'
import { IUser } from '@/types'

type Props = {
  onChangeAudience: (audience: number) => void
  onChangeStoryType: (type: EStoryType) => void
}

const CreateStorySideBar = ({ onChangeAudience, onChangeStoryType: onChangeStoryTypeProps }: Props) => {
  const { t } = useTranslation()
  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()

  const storyTypes = useMemo(() => {
    return generateStoryOptions(t)
  }, [t])

  const onChangeStoryType = useCallback(
    (type: EStoryType) => {
      onChangeStoryTypeProps(type)
    },
    [onChangeStoryTypeProps]
  )

  const renderStoryHeading = () => {
    return (
      <React.Fragment>
        <StyledHeading>{t('pages.story.text.create-story')}</StyledHeading>
        <StyledUserInfo>
          <SmallAvatar user={user as IUser} />
          <StyledSubUserInfo>{user?.name}</StyledSubUserInfo>
        </StyledUserInfo>
      </React.Fragment>
    )
  }

  const renderStorySelector = () => {
    return (
      <StyledConfigItemWrapper>
        <StyledSectionTitle>{t('pages.story.text.whoCanSee')}</StyledSectionTitle>
        <AudienceSelector defaultValue={0} onChange={onChangeAudience} />
      </StyledConfigItemWrapper>
    )
  }

  const renderStoryGroupButton = () => {
    return (
      <StyledStoryConfigWrapper>
        <StyledConfigItemWrapper>
          <StyledSectionTitle>{t('pages.story.text.storyType')}</StyledSectionTitle>
          <StyledFlex gap={1}>
            {storyTypes.map((type) => (
              <CommonButton key={type.value} onClick={() => onChangeStoryType(type.value)}>
                {type.label}
              </CommonButton>
            ))}
          </StyledFlex>
        </StyledConfigItemWrapper>
      </StyledStoryConfigWrapper>
    )
  }

  const renderStoryMain = () => {
    return (
      <StyledMain>
        {renderStorySelector()}
        {renderStoryGroupButton()}
      </StyledMain>
    )
  }

  return (
    <StyledRoot>
      <Logo />
      {renderStoryHeading()}
      {renderStoryMain()}
    </StyledRoot>
  )
}

export default CreateStorySideBar

const StyledRoot = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1rem 2.5rem;
  box-shadow: 5px 1px 5px 0px rgb(0 0 0 / 35%);
`

const StyledHeading = styled.h2`
  font-size: 2.4rem;
`

const StyledMain = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid;
  padding-top: 1rem;
`

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 2rem 0;

  img {
    border-radius: 50%;
  }
`

const StyledSubUserInfo = styled.p`
  font-size: ${EFontSize.Font7};
`

const StyledConfigItemWrapper = styled.div`
  margin: 2.5rem 0;
  padding: 1rem 2rem;
  border: 1px solid;
  border-radius: 5px;
`

const StyledSectionTitle = styled.p`
  font-size: ${EFontSize.Font4};
  margin-bottom: 0.5rem;
  font-weight: ${EFontWeight.FontWeight500};
`

const StyledStoryConfigWrapper = styled.div``
