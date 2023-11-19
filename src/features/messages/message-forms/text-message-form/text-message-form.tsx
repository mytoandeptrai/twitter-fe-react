import { FileInput, MyEmojiPicker } from '@/components'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { BsMic, BsPlus } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import styled from 'styled-components'
import { useTextMessageForm } from './hook'

type Props = {
  onSubmit: (event: any) => void
  onChangeInputMessage: (e: any) => void
  onChangeInputFile: (file: File) => void
  value: string
}

const motionConfig = {
  initial: {
    y: 0,
    opacity: 0,
    zIndex: -1
  },
  animate: {
    y: '-110%',
    opacity: 1,
    zIndex: 0
  },
  exit: {
    y: 0,
    opacity: 0,
    zIndex: -1
  }
}

const TextMessageForm = (props: Props) => {
  const {
    visibleValues: { isShowRecord, isVisibleMedia },
    value,
    onSubmit,
    onChangeInputMessage,
    onChangeFile,
    onEmojiClick,
    onToggleVisibleMedia,
    onToggleShowRecord
  } = useTextMessageForm(props)

  const renderAnimationEmojiField = () => {
    return (
      <StyledMediaItemEmoji>
        <MyEmojiPicker
          onEmojiClick={(data: string) => onEmojiClick(data, value)}
          customStyles='transform: translateY(-450px);'
        />
      </StyledMediaItemEmoji>
    )
  }

  const renderAnimationRecordField = () => {
    return (
      <StyledMediaItem>
        {isShowRecord && <div>Show Record</div>}
        <StyledMicButton onClick={onToggleShowRecord}>
          <BsMic />
        </StyledMicButton>
      </StyledMediaItem>
    )
  }

  const renderAnimationPresence = () => {
    return (
      <AnimatePresence>
        {isVisibleMedia && (
          <motion.div {...motionConfig}>
            <StyledWrapperMediaGroup>
              <FileInput htmlFor={`text-image-file-upload`} onChange={onChangeFile} />
              {renderAnimationEmojiField()}
              {renderAnimationRecordField()}
            </StyledWrapperMediaGroup>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const renderPlusButton = () => {
    return (
      <StyledWrapperButton>
        <StyledPlusButton onClick={onToggleVisibleMedia}>
          <BsPlus />
        </StyledPlusButton>
      </StyledWrapperButton>
    )
  }

  const renderTextMessageContent = () => {
    return (
      <React.Fragment>
        {renderPlusButton()}
        <StyledInput
          type='text'
          name='message'
          placeholder='Message'
          value={value}
          required
          onChange={onChangeInputMessage}
        />
        <StyledSendButton onClick={onSubmit}>
          <IoSend />
        </StyledSendButton>
      </React.Fragment>
    )
  }

  return (
    <StyledRoot onSubmit={onSubmit}>
      {renderAnimationPresence()}
      {renderTextMessageContent()}
    </StyledRoot>
  )
}

export default TextMessageForm

const StyledRoot = styled.form`
  position: absolute;
  bottom: 0;
  width: 95%;
  padding: 5px 15px;
  background: #1c1e21;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

const StyledWrapperMediaGroup = styled.div`
  background: #fff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: #1c1e21;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: #fff;
  padding: 0 1rem;
  transform: translateY(27px);

  label {
    svg {
      --size: 2rem;
      width: var(--size);
      height: var(--size);
    }
  }
`

const StyledWrapperButton = styled.div``

const StyledPlusButton = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  background: #2f80ed;
  color: #fff;
`

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  outline: none;
  font-size: 14px;
  border: none;
  border-radius: 0.8rem;
  background-color: #e0e0e0;
  padding: 1rem;
`

const StyledSendButton = styled.button`
  --size: 4rem;
  width: var(--size);
  height: var(--size);
  background-color: #2f80ed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
`

const StyledMediaItem = styled.div`
  --size: 2rem;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledMediaItemEmoji = styled.div`
  display: block;

  div > button {
    padding: 0;
    margin: 0;
    > svg {
      --size: 2rem;
      width: var(--size);
      height: var(--size);
      fill: #2f80ed;
    }
  }
`

const StyledMicButton = styled.button`
  svg {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
    fill: #2f80ed;
  }
`
