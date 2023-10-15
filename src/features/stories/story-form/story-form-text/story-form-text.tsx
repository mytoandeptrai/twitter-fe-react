import { StyledFlex } from '@/components'
import React, { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStoryFormText } from './hook'
import { BACKGROUND_LIST } from '@/constants'
type Props = {
  onCancel: () => void
  onSubmit: (text: string) => void
}

const StoryFormText = (props: Props) => {
  const { t } = useTranslation()
  const {
    storyFormValue,

    onChangeText,
    onChangeBackground,
    onSubmitHandler,
    onCancelStoryText
  } = useStoryFormText(props)

  const { background, text } = storyFormValue

  const renderStoryTextArea = () => {
    return (
      <React.Fragment>
        <StyledLabel>{t('pages.story.text.addYourTextHere')}</StyledLabel>
        <StyledTextArea onChange={onChangeText} rows={7} value={text} />
      </React.Fragment>
    )
  }

  const renderStoryBackgroundList = () => {
    return (
      <React.Fragment>
        <StyledBackgroundList>
          {BACKGROUND_LIST.map((color: string, index: number) => {
            return (
              <StyledBackgroundItem
                key={index}
                onClick={() => onChangeBackground(color)}
                style={{
                  background: color,
                  cursor: 'pointer',
                  outline: `${color === background ? '2px solid blue' : ''} `
                }}
              />
            )
          })}
        </StyledBackgroundList>
      </React.Fragment>
    )
  }

  const renderStoryAside = () => {
    return (
      <StyledAside>
        {renderStoryTextArea()}
        {renderStoryBackgroundList()}
      </StyledAside>
    )
  }

  const renderStoryMain = () => {
    return (
      <StyledMain>
        <StyledLabel>{t('pages.story.text.preview')}</StyledLabel>
        <StyledTextStoryPreview style={{ background }}>
          <StyledTextDisplay>{text}</StyledTextDisplay>
        </StyledTextStoryPreview>
      </StyledMain>
    )
  }

  const renderStoryButtonGroup = () => {
    const disabled = !storyFormValue.text
    return (
      <StyledGroupButton>
        <StyledCancelButton disabled={disabled} onClick={onCancelStoryText}>
          {t('pages.story.text.cancel')}
        </StyledCancelButton>
        <StyledSaveButton disabled={disabled} onClick={onSubmitHandler}>
          {t('pages.story.text.save')}
        </StyledSaveButton>
      </StyledGroupButton>
    )
  }

  return (
    <StyledRoot>
      <StyledFlex gap={4} justify='center' align='center'>
        {renderStoryAside()}
        {renderStoryMain()}
      </StyledFlex>
      {renderStoryButtonGroup()}
    </StyledRoot>
  )
}

export default StoryFormText

const StyledRoot = styled.div`
  max-width: 50%;
  margin: 0 auto;
`

const StyledAside = styled.aside`
  padding: 2rem;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 20%);
  border-radius: 1rem;
  background: #fff;
`
const StyledLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  margin: 1rem 0;
  font-weight: 500;
  border-top: 1px solid var(--gray-4);
  padding-top: 1rem;
  margin-bottom: 2rem;
`

const StyledMain = styled.main`
  background: #fff;
  border-radius: 1rem;
  padding: 1rem 3rem 3rem 3rem;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 20%);
`

const StyledTextStoryPreview = styled('div')<{
  style: CSSProperties
}>`
  --size: 40rem;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  ${({ style }) => ({ ...style })}
`

const StyledTextArea = styled.textarea`
  padding: 1rem;
  border-radius: 8px;
  resize: none;
`

const StyledBackgroundList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
  grid-gap: 0.5rem;
  grid-gap: 1rem;
  gap: 1rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--gray-4);
  padding: 2rem 0;
`

const StyledBackgroundItem = styled.li`
  list-style: none;
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
`

const StyledTextDisplay = styled.p`
  font-size: 2rem;
  color: #fff;
  word-break: break-all;
  padding: 1.5rem;
`

const StyledGroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`

const StyledSaveButton = styled.button`
  padding: 0.8rem 2.4rem;
  background: ${({ theme }) => theme.backgroundColor2};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;

  &:disabled {
    cursor: initial;
    background: var(--gray-4);
    color: #000;
  }
`

const StyledCancelButton = styled.button`
  padding: 0.8rem 2.4rem;
  background: ${({ theme }) => theme.backgroundColor5};
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;

  &:disabled {
    cursor: initial;
    background: var(--gray-4);
  }
`
