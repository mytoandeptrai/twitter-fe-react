import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

type IMessageImage = {
  file: File | null
  url: string
  messageText: string
}

type Props = {
  data: IMessageImage
  onCancel: () => void
  onChangeInputMessage: (e: any) => void
  onSubmit: (e: any) => void
}

const motionConfig = {
  initial: {
    opacity: 0,
    scale: 0
  },
  animate: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'left center'
  },
  exit: {
    opacity: 0,
    scale: 0
  },
  transition: {
    values: 0.1
  }
}

const ImageMessageForm = ({ data, onCancel, onChangeInputMessage, onSubmit }: Props) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      <StyledMask onClick={onCancel}></StyledMask>
      <motion.section {...motionConfig}>
        <StyledRoot>
          <StyledMain onSubmit={onSubmit}>
            <StyledImageWrapper>
              <StyledImageFigure>
                <StyledImage src={data.url} alt='image-message-form' loading='lazy' />
              </StyledImageFigure>
              <StyledFileName>{data.file?.name}</StyledFileName>
              <StyledMessage>
                <StyledMessageLabel htmlFor='message'>{t('message')}</StyledMessageLabel>
                <StyledMessageInput
                  type='text'
                  name='message'
                  onChange={onChangeInputMessage}
                  required
                  value={data.messageText}
                />
              </StyledMessage>
            </StyledImageWrapper>

            <StyledGroupButton>
              <StyledButton onClick={onCancel}>{t('cancel')}</StyledButton>
              <StyledButtonSubmit type='submit'>{t('upload')}</StyledButtonSubmit>
            </StyledGroupButton>
          </StyledMain>
        </StyledRoot>
      </motion.section>
    </AnimatePresence>
  )
}

export default ImageMessageForm

const StyledRoot = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  background: #36393f;
  border-radius: 50px;
  z-index: 3;
  border-radius: 0.8rem;
`

const StyledMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`

const StyledMain = styled.form`
  position: relative;
`

const StyledImageWrapper = styled.div`
  display: block;
`

const StyledImageFigure = styled.figure`
  margin: -5rem auto 0 auto;
  width: 50%;
  height: 10rem;
  border-radius: 50px;
  overflow: hidden;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledFileName = styled.p`
  margin: 1rem;
  color: #fff;
  font-weight: 500;
  font-size: 1.3rem;
  word-break: break-all;
  text-align: center;
`

const StyledMessage = styled.div`
  margin: 1.5rem;
  margin-bottom: 0;
`

const StyledMessageLabel = styled.label`
  color: #fff;
  display: block;
  margin-bottom: 1rem;
  font-size: 14px;
`
const StyledMessageInput = styled.input`
  display: block;
  background: #40444b;
  color: #fff;
  padding: 10px;
  width: 100%;
  border-radius: 50px;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`

const StyledGroupButton = styled.div`
  float: right;
  display: flex;
  gap: 1rem;
  margin: 1rem;
  color: #fff;
`
const StyledButton = styled.button`
  font-size: 14px;
  outline: none;
  color: #fff;
`
const StyledButtonSubmit = styled.button`
  font-size: 14px;
  outline: none;
  color: #fff;
  background: #2f80ed;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
`
