import { ControlledInput, FileInput, Loader, MediaViewer, SmallAvatar } from '@/components'
import { switchRenderAuthenticatedComponent } from '@/hoc'
import { useUserService } from '@/services'
import { IComment, ITweet, IUser } from '@/types'
import React, { Suspense, memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useCreateCommentForm } from '../hooks/useCreateCommentForm'
import { ClipLoader } from 'react-spinners'
import { ImCancelCircle } from 'react-icons/im'

const MyEmojiPicker = React.lazy(() => import('@/components/ui/my-emoji-picker/my-emoji-picker'))

type Props = {
  tweet: ITweet
  comment?: IComment
}

const cssOverride = {
  width: '2.5rem',
  height: '2.5rem',
  flexShrink: 0
}

const CreateCommentForm = ({ tweet, comment }: Props) => {
  const { t } = useTranslation()

  const { getCurrentUser } = useUserService()
  const user = getCurrentUser()

  const createCommentFormPayload = {
    tweet,
    comment
  }

  const { media, content, loading, onCancelMedia, onChangeContent, onChangeFile, onEmojiClick, onSubmit } =
    useCreateCommentForm(createCommentFormPayload)

  const shouldIndent = !!comment
  const fileInputId = `comment-file-${comment?._id || tweet?._id}`

  const renderCommentForm = () => {
    return (
      <StyledCommentForm onSubmit={onSubmit} shouldIndent={shouldIndent}>
        <SmallAvatar user={user as IUser} />
        <StyledInputWrapper>
          <ControlledInput
            value={content}
            onChange={onChangeContent}
            placeholder={`${t('addAComment')} ...`}
            disabled={loading}
          />
          {loading && <ClipLoader cssOverride={cssOverride} />}
          <Suspense fallback={<Loader />}>
            <MyEmojiPicker onEmojiClick={onEmojiClick} />
          </Suspense>
          <FileInput htmlFor={fileInputId} onChange={onChangeFile} />
        </StyledInputWrapper>
      </StyledCommentForm>
    )
  }

  const renderCommentFileMedia = () => {
    if (media?.url) {
      return (
        <StyledCommentImageWrapper>
          <StyledCommentImageCancelButton onClick={onCancelMedia}>
            <ImCancelCircle />
          </StyledCommentImageCancelButton>
          <StyledCommentMedia>
            <MediaViewer data={media} hasLightBox />
          </StyledCommentMedia>
        </StyledCommentImageWrapper>
      )
    }
  }

  return (
    <StyledRoot loading={loading}>
      {renderCommentForm()}
      {renderCommentFileMedia()}
    </StyledRoot>
  )
}

export default switchRenderAuthenticatedComponent(memo(CreateCommentForm))

const StyledRoot = styled.div<{
  loading: boolean
}>`
  ${({ loading }) =>
    loading &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`

const StyledCommentForm = styled('form')<{
  shouldIndent?: boolean
}>`
  ${(props) => (!props.shouldIndent ? '' : 'transform: translateX(4rem); width: 94%;margin: 1rem 0;')}
  display: flex;
  gap: 1.6rem;
  padding: 1rem 0;
`

const StyledInputWrapper = styled.div`
  background: #fafafa;
  border: 1px solid #f2f2f2;
  border-radius: 0.8rem;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
`

const StyledCommentImageWrapper = styled.div`
  position: relative;
  height: 10rem;
  margin-top: 1rem;
`

const StyledCommentMedia = styled.div`
  height: 10rem;
  max-width: 20rem;
`

const StyledCommentImageCancelButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }
`
