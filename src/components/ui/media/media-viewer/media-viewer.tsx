import { EMedia } from '@/constants'
import { useToggle } from '@/hooks'
import { IMedia } from '@/types'
import React from 'react'
import { css, styled } from 'styled-components'
import Lightbox from 'react-image-lightbox'

type Props = {
  data: IMedia
  hasLightBox?: boolean
}

const MediaViewer = ({ data, hasLightBox = false }: Props) => {
  const { hide, show, visible } = useToggle()

  const generateContent = () => {
    let content = <React.Fragment></React.Fragment>
    if (data.type === EMedia.Image) {
      content = (
        <React.Fragment>
          <StyledImage onClick={show} src={data.url} alt={data.url} loading='lazy' />
        </React.Fragment>
      )
    } else {
      content = <StyledVideo src={data.url} controls muted autoPlay loop />
    }

    return content
  }

  const generateModal = () => {
    if (data.type === EMedia.Image && hasLightBox && visible) {
      return (
        <React.Fragment>
          <Lightbox mainSrc={data.url} onCloseRequest={hide} />
        </React.Fragment>
      )
    }

    return <React.Fragment></React.Fragment>
  }

  return (
    <StyledRoot>
      {generateModal()}
      {generateContent()}
    </StyledRoot>
  )
}

export default MediaViewer

const sharedStyle = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const StyledRoot = styled.div`
  ${sharedStyle}
`

const StyledImage = styled.img`
  ${sharedStyle}
`

const StyledVideo = styled.video`
  ${sharedStyle}
`
