import React, { memo } from 'react'
import { styled } from 'styled-components'
import { BsCardImage } from 'react-icons/bs'

type Props = {
  htmlFor: string
  isMultiple?: boolean
  onChange: (files: FileList) => void
}

const FileInput = ({ htmlFor, isMultiple = false, onChange: onChangeProps }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeProps(event.target.files as FileList)
    event.target.value = ''
  }

  return (
    <React.Fragment>
      <StyledFileLabel htmlFor={htmlFor}>
        <BsCardImage />
      </StyledFileLabel>
      <StyledFileInput type='file' id={htmlFor} onChange={onChange} multiple={isMultiple} />
    </React.Fragment>
  )
}

export default memo(FileInput)

const StyledFileLabel = styled.label`
  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
    fill: ${({ theme }) => theme.backgroundColor2};
    cursor: pointer;
  }
`

const StyledFileInput = styled.input`
  display: none;
`
