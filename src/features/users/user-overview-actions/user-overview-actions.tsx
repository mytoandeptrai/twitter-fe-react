import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useUserOverViewActions } from './hook'
import { CommonButton, CommonModal, Loader } from '@/components'
import styled from 'styled-components'

type Props = {
  userId: string
}

const UserOverViewActions = ({ userId }: Props) => {
  const { t } = useTranslation()
  const { isLoading, isMe, editUserInfoFormRef, onShowEditUserInfoForm, onGoToChat, onReportUser } =
    useUserOverViewActions(userId)

  const generateUserActionsContent = () => {
    if (isMe) {
      return <CommonButton onClick={onShowEditUserInfoForm}>{t('common.button.edit')}</CommonButton>
    }

    return (
      <React.Fragment>
        <CommonButton onClick={() => onGoToChat(userId)} disabled={isLoading}>
          {t('common.button.sendMessage')}
        </CommonButton>
        <CommonButton onClick={() => onReportUser(userId)} disabled={isLoading}>
          {t('common.button.reportUser')}
        </CommonButton>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <CommonModal
          header={t('pages.profile.text.editProfile')}
          body={<div>Edit Profile Form</div>}
          ref={editUserInfoFormRef}
        />
      </Suspense>
      <StyledRoot>{generateUserActionsContent()}</StyledRoot>
    </React.Fragment>
  )
}

export default UserOverViewActions

const StyledRoot = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 576px) {
    position: static;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
