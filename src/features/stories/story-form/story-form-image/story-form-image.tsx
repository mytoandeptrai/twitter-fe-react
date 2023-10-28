import React from 'react'
import styled from 'styled-components'
import { useStoryFormImage } from './hook'
import { useTranslation } from 'react-i18next'
import { FabricJSCanvas } from 'fabricjs-react'
import { StyledFlex } from '@/components'
import { BsCardImage } from 'react-icons/bs'

type Props = {
  onCancel: () => void
  onSubmit: (text: string) => void
}

const StoryFormImage = (props: Props) => {
  const { t } = useTranslation()
  const {
    editor,
    textBoxCounter,
    file,
    isDisabledSaveButton,

    onReady,
    onFileChange,
    onDeleteSelectionsInCanvas,
    onTextColorChange,
    onAddTextToCanvas,
    onSaveToServer,
    onCancelAll
  } = useStoryFormImage(props)

  const renderTextStoryCanvas = () => {
    if (!!textBoxCounter) {
      return (
        <StyledTextColorForm>
          <StyledTextColorFormLabel htmlFor='image-story-text-color'>{t('textColor')}</StyledTextColorFormLabel>
          <input type='color' id='image-story-text-color' onChange={(e) => onTextColorChange(e, editor)} />
        </StyledTextColorForm>
      )
    }

    return null
  }

  const renderStoryImageAside = () => {
    if (file) {
      return (
        <StyledAside>
          <StyledAddTextButton onClick={() => onAddTextToCanvas(editor)}>{t('addText')}</StyledAddTextButton>
          <StyledDeleteSelectionButton onClick={onDeleteSelectionsInCanvas}>
            {t('deleteSelections')}
          </StyledDeleteSelectionButton>
          {renderTextStoryCanvas()}
        </StyledAside>
      )
    }

    return null
  }

  const renderStoryImageUpload = () => {
    if (!file) {
      return (
        <StyledImageForm>
          <input type='file' onChange={(e) => onFileChange(e, editor)} id='imageFormInput' />
          <StyledImageFormLabel htmlFor='imageFormInput'>
            <BsCardImage />
            <p>{t('common.text.uploadImage')}</p>
          </StyledImageFormLabel>
        </StyledImageForm>
      )
    }

    return null
  }

  const renderStoryImageMain = () => {
    return (
      <StyledMain>
        {renderStoryImageUpload()}
        <StyledCanvas>
          <FabricJSCanvas onReady={onReady} />
        </StyledCanvas>
      </StyledMain>
    )
  }

  const renderStoryImageGroupButton = () => {
    return (
      <StyledGroupButton>
        <StyledCancelButton disabled={isDisabledSaveButton} onClick={onCancelAll}>
          {t('pages.story.text.cancel')}
        </StyledCancelButton>
        <StyledSaveButton disabled={isDisabledSaveButton} onClick={() => onSaveToServer(editor, file)}>
          {t('pages.story.text.save')}
        </StyledSaveButton>
      </StyledGroupButton>
    )
  }

  return (
    <StyledRoot>
      <StyledFlex gap={5} justify='center' align='center'>
        {renderStoryImageAside()}
        {renderStoryImageMain()}
      </StyledFlex>
      {renderStoryImageGroupButton()}
    </StyledRoot>
  )
}

export default StoryFormImage

const StyledRoot = styled.div`
  max-width: 50%;
  margin: 0 auto;
`

const StyledAside = styled.aside`
  background-color: #fff;
  box-shadow: var(--box-shadow-1);
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border-radius: 1rem;
  min-height: 40rem;
  min-width: 30rem;
`

const StyledMain = styled.main`
  width: 40rem;
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: relative;
  background-color: #fff;
  box-shadow: var(--shadow-1);
`

const StyledCanvas = styled.div`
  div {
    width: 40rem;
    height: 60rem;
  }
`

const StyledImageForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  height: 100%;
`

const StyledImageFormLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  gap: 1rem;
  cursor: pointer;
`

const StyledTextColorForm = styled.p`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
  align-items: center;
`

const StyledTextColorFormLabel = styled.label`
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
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
    opacity: 0.7;
    filter: brightness(0.7);
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
    background: #eb5757;
  }
`

const StyledAddTextButton = styled.button`
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

const StyledDeleteSelectionButton = styled.button`
  padding: 0.8rem 2.4rem;
  background: ${({ theme }) => theme.backgroundColor5};
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;

  &:disabled {
    cursor: initial;
    background: #eb5757;
  }
`
