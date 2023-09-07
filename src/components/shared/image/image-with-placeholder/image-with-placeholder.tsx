import { DefaultAvatar } from '@/constants'
import React, { forwardRef, memo, useState } from 'react'
import { styled } from 'styled-components'

type Props = {
  src: string
  alt: string
  defaultSrc?: any
  customStyles?: string
}

const ImageWithPlaceHolder = forwardRef(
  ({ alt, src, customStyles = '', defaultSrc = DefaultAvatar }: Props, ref: any) => {
    const [fallback, setFallback] = useState<string>('')

    const handleError = () => {
      setFallback(fallback)
    }

    return (
      <React.Fragment>
        <StyledImage src={src} alt={alt} styles={customStyles} ref={ref} onError={handleError} loading='lazy' />
      </React.Fragment>
    )
  }
)

export default memo(ImageWithPlaceHolder)

const StyledImage = styled('img')<{
  styles?: string
  hidden?: string
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) => props?.styles}
`
