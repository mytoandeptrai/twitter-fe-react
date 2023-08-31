import { DefaultAvatar } from '@/constants'
import React, { memo, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { styled } from 'styled-components'

interface IInitialSrc {
  src: string
  loading: boolean
}

type Props = {
  src: string
  alt: string
  defaultSrc?: any
  customStyles?: string
}

const TIMEOUT = 5000

const ImageWithPlaceHolder = ({ alt, src, customStyles = '', defaultSrc = DefaultAvatar }: Props) => {
  const [initialSrc, setInitialSrc] = useState<IInitialSrc>({
    src,
    loading: true
  })

  const { loading } = initialSrc

  useEffect(() => {
    if (!loading) return

    const timeout = setTimeout(() => {
      setInitialSrc((prev) => ({ ...prev, src: defaultSrc }))
    }, TIMEOUT)

    return () => {
      clearTimeout(timeout)
    }
  }, [defaultSrc, loading])

  return (
    <React.Fragment>
      {loading && <ClipLoader />}
      <StyledImage
        src={src}
        alt={alt}
        hidden={String(loading)}
        styles={customStyles}
        onLoad={() => {
          setInitialSrc((prev) => ({ ...prev, loading: false }))
        }}
        onError={() => {
          setInitialSrc({ loading: false, src: defaultSrc })
        }}
      />
    </React.Fragment>
  )
}

export default memo(ImageWithPlaceHolder)

const StyledImage = styled('img')<{
  styles?: string
  hidden?: string
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ hidden }) => hidden === 'true' && `display: none`}

  ${(props) => props?.styles}
`
