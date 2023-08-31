import { extractMetadata } from '@/utils'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsTrash } from 'react-icons/bs'
import styled from 'styled-components'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const LinkTextArea = ({ value, onChange: onChangeProps, placeholder = 'common.text.whatOnYourMind' }: Props) => {
  const { t } = useTranslation()
  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    if (value) {
      const { urls: extractedUrls } = extractMetadata(value)
      return setUrls(extractedUrls)
    }

    setUrls([])
  }, [value])

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    onChangeProps(inputValue)
  }

  const onRemoveLinks = () => {
    setUrls([])
  }

  return (
    <StyledRoot>
      <StyledTextArea value={value} onChange={onChange} placeholder={t(`${placeholder}`)} />
      {urls?.length > 0 && (
        <StyledLinkPreviewWrapper>
          <StyledRemoveLinkBtn onClick={onRemoveLinks}>
            <BsTrash />
          </StyledRemoveLinkBtn>
        </StyledLinkPreviewWrapper>
      )}
    </StyledRoot>
  )
}

export default memo(LinkTextArea)

const StyledRoot = styled.div``

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  border: none;
  resize: none;
  outline: none;
`
const StyledLinkPreviewWrapper = styled.div`
  position: relative;
  min-height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: gray;
  color: #fff;
`

const StyledRemoveLinkBtn = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.backgroundColor3};
  color: ${({ theme }) => theme.textColor1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  --size: 3rem;
  height: var(--size);
  width: var(--size);
`
