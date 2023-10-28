import { ControlledInput } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface ILabel {
  htmlFor: string
  title: string
}

interface IInput {
  id: string
  type: string
  name: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: any
}

type Props = {
  label: ILabel
  input: IInput
}

const GroupChatInputField = ({ input, label }: Props) => {
  const { t } = useTranslation()
  const { htmlFor, title } = label
  return (
    <StyledRoot>
      <StyledInputLabel htmlFor={htmlFor}>{t(title)}</StyledInputLabel>
      <ControlledInput {...input} placeholder={t(input.placeholder)} customStyles='border: 1px solid #f2f2f2' />
    </StyledRoot>
  )
}

export default GroupChatInputField

const StyledRoot = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

const StyledInputLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`
