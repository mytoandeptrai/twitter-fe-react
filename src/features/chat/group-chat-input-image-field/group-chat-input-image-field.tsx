import { IMedia } from '@/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface ILabel {
  htmlFor: string
  title: string
  icon: JSX.Element
}

interface IInput {
  type: string
  name: string
  id: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type Props = {
  label: ILabel
  input: IInput
  media: IMedia | null
}

const GroupChatInputImageField = ({ input, label, media }: Props) => {
  const { t } = useTranslation()
  const { htmlFor, icon, title } = label

  const renderInputLabel = () => {
    return (
      <React.Fragment>
        <StyledInput {...input} />
        <StyledInputLabel htmlFor={htmlFor}>
          {t(title)}
          {icon}
        </StyledInputLabel>
      </React.Fragment>
    )
  }

  const renderInputMedia = () => {
    if (media) {
      return (
        <StyledInputImageWrapper>
          <StyledInputImage src={media.url} alt='new-room-photo' loading='lazy' />
        </StyledInputImageWrapper>
      )
    }

    return null
  }

  return (
    <StyledRoot>
      {renderInputLabel()}
      {renderInputMedia()}
    </StyledRoot>
  )
}

export default GroupChatInputImageField

const StyledRoot = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

const StyledInputLabel = styled.label`
  display: flex;
  cursor: pointer;
  margin: 2rem 0;
  gap: 2rem;
  font-size: 1.5rem;
  align-items: center;

  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }
`
const StyledInput = styled.input``

const StyledInputImageWrapper = styled.figure`
  margin-top: 1rem;
`

const StyledInputImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
