import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'
import { FileInput } from '../../form'
import { CommonButton } from '../../button'

interface IImageSrc {
  file: File | null
  preview: string
}

type Props = {
  id: string
  src: string
  label: string
  updatable: boolean
  wrapperCustomStyles?: string

  onOk: (file: File) => Promise<void>
}

const ImageWithUpload = (props: Props) => {
  const { onOk, src, id, updatable, wrapperCustomStyles } = props
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<IImageSrc>({
    file: null,
    preview: src
  })

  useLayoutEffect(() => {
    if (src) {
      setImageSrc((prev) => ({
        ...prev,
        file: null,
        preview: src
      }))
    }
  }, [src])

  useEffect(() => {
    return () => {
      if (imageSrc.preview) URL.revokeObjectURL(imageSrc.preview)
    }
  }, [imageSrc.preview])

  const onChange = useCallback((files: FileList) => {
    const file = files?.[0]
    if (!file) return
    setImageSrc((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file)
    }))
  }, [])

  const onCancel = useCallback((src: string) => {
    setImageSrc((prev) => ({
      ...prev,
      file: null,
      preview: src
    }))
  }, [])

  const onSubmit = useCallback(
    async (file: File | null) => {
      if (!file) return

      setIsLoading(true)
      try {
        await onOk(file)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    },
    [onOk]
  )

  const renderLoading = () => {
    if (isLoading) {
      return (
        <StyledLoadingWrapper>
          <ClipLoader />
        </StyledLoadingWrapper>
      )
    }

    return null
  }

  const renderInputFile = () => {
    if (!imageSrc?.file) {
      return <FileInput htmlFor={`updatable-image-${id}`} onChange={onChange} />
    }

    return (
      <StyledActionButtons>
        {!!onOk && (
          <CommonButton onClick={() => onSubmit(imageSrc.file)} disabled={isLoading}>
            {t('common.button.update')}
          </CommonButton>
        )}
        <StyledCancelButton onClick={() => onCancel(imageSrc.preview)} disabled={isLoading}>
          {t('common.button.cancel')}
        </StyledCancelButton>
      </StyledActionButtons>
    )
  }

  const renderImageUpload = () => {
    if (updatable) {
      return <StyledUpdateArea>{renderInputFile()}</StyledUpdateArea>
    }

    return null
  }

  return (
    <StyledRoot customStyles={wrapperCustomStyles}>
      {renderLoading()}
      <StyledImage src={imageSrc.preview} alt={`updatable-image`} />
      {renderImageUpload()}
    </StyledRoot>
  )
}

export default memo(ImageWithUpload)

const StyledImage = styled('img')<{
  customStyles?: string
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ customStyles }) => customStyles}
`

const StyledUpdateArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: none;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    cursor: pointer;

    svg {
      --size: 1.5rem;
      width: var(--size);
      height: var(--size);
    }
  }

  input {
    display: none;
  }
`

const StyledRoot = styled('div')<{
  customStyles?: string
}>`
  --size: 15rem;
  width: var(--size);
  height: var(--size);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;

  ${({ customStyles }) => customStyles}

  &:hover ${StyledUpdateArea} {
    display: block;
    transition: all 1s linear;
  }
`

const StyledActionButtons = styled.div`
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 0;

  button:disabled {
    cursor: initial;
  }
`

const StyledCancelButton = styled.button`
  border-radius: 5px;
  color: #fff;
`

const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`
