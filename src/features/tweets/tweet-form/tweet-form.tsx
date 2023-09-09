import { AudienceSelector, CommonButton, FileInput, LinkTextArea, StyledFlex } from '@/components'
import { EFontSize, EFontWeight, EFormType } from '@/constants'
import { switchRenderAuthenticatedComponent } from '@/hoc'
import { LayoutWithSectionHeading } from '@/layouts'
import { IMedia, ITweet } from '@/types'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { useTweetForm } from './hooks'
import { TweetFormMedia } from './tweet-form-media'

type TCreateTweetFormProps = {
  type: EFormType.Create
}

type TEditTweetFormProps = {
  type: EFormType.Update
  data: ITweet
  onCancel: () => void
}

type Props = TCreateTweetFormProps | TEditTweetFormProps

const TweetForm = (props: Props) => {
  const { t } = useTranslation()

  const tweet = props.type === EFormType.Create ? null : props.data

  const {
    audience,
    body,
    initialMedias,
    medias,
    onChangeAudience,
    onChangeBody,
    onChangeFile,
    onResetMedias,
    onSubmit
  } = useTweetForm({ tweet })

  const formMedias = useMemo((): IMedia[] => {
    return [...medias, ...initialMedias]
  }, [initialMedias, medias])

  const inputFileId = useMemo((): string => {
    if (props.type === EFormType.Create) {
      return 'new-tweet-media'
    }

    return `update-tweet-media-${props.data._id}`
  }, [props])

  const onClickButtonSubmit = async () => {
    await onSubmit(() => {
      if (props.type === EFormType.Update) {
        props.onCancel()
      }
    })
  }

  const title = useMemo(() => {
    if (props.type === EFormType.Create) {
      return <StyledHeading>{t('common.text.whatOnYourMind')}</StyledHeading>
    }

    return <></>
  }, [props.type, t])

  const content = useMemo(() => {
    return props.type === EFormType.Create ? 'pages.tweet.create' : 'pages.tweet.update'
  }, [props.type])

  return (
    <React.Fragment>
      <LayoutWithSectionHeading
        title={title}
        content={
          <React.Fragment>
            <StyledRoot type={props.type}>
              <StyledMain>
                <StyledTweetInputWrapper>
                  <LinkTextArea value={body} onChange={onChangeBody} />
                </StyledTweetInputWrapper>
                <TweetFormMedia medias={formMedias} onResetMedias={onResetMedias} />
              </StyledMain>

              <StyledFlex align='center' justify='space-between'>
                <StyledFlex gap={1.5} align='center'>
                  <FileInput htmlFor={inputFileId} onChange={onChangeFile} isMultiple />
                  <AudienceSelector defaultValue={audience} onChange={onChangeAudience} />
                </StyledFlex>
                <CommonButton onClick={onClickButtonSubmit}>{t(`${content}`)}</CommonButton>
              </StyledFlex>
            </StyledRoot>
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

export default switchRenderAuthenticatedComponent(memo(TweetForm))

const StyledHeading = styled.h4`
  color: var(--gray-2);
  border-bottom: 1px solid var(--gray-5);
  font-weight: ${EFontWeight.FontWeight600};
  font-size: ${EFontSize.Font3};
`
const StyledRoot = styled.div<{
  type: EFormType
}>`
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  margin-bottom: 2.5rem;
  min-width: auto;
  max-width: 100%;

  ${({ type }) => type === EFormType.Update && 'max-width: 50rem;'}
`

const StyledMain = styled.div``

const StyledTweetInputWrapper = styled.div`
  min-height: 10rem;
  margin-bottom: 2rem;
  overflow: auto;
`
