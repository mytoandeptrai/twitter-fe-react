import { useOnClickOutside, useToggle } from '@/hooks'
import React, { memo, useCallback, useMemo, useRef } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import styled from 'styled-components'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import './my-emoji-picker.css'
type Props = {
  onEmojiClick: (data: string) => void
}

const MyEmojiPicker = (props: Props) => {
  const { hide, visible, toggle } = useToggle()

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, hide)

  const onClickEmoji = useCallback(
    (emoji: EmojiClickData, event: MouseEvent) => {
      event.preventDefault()
      const data = emoji?.emoji
      if (typeof props.onEmojiClick === 'function') {
        props.onEmojiClick(data)
      }
    },
    [props]
  )

  const emoji = useMemo(() => {
    return (
      <EmojiPicker onEmojiClick={onClickEmoji} customEmojis={[{ id: 'customEmoji', names: ['emoji'], imgUrl: '' }]} />
    )
  }, [onClickEmoji])

  return (
    <StyledRoot ref={ref}>
      {visible && <StyledEmojiWrapper visible={visible}>{emoji}</StyledEmojiWrapper>}
      <StyledButton onClick={toggle} type='button'>
        <HiOutlineEmojiHappy />
      </StyledButton>
    </StyledRoot>
  )
}

export default memo(MyEmojiPicker)

const StyledRoot = styled.div`
  position: relative;
`

const StyledEmojiWrapper = styled.div<{
  visible: boolean
}>`
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  z-index: 3;
  transform: translateY(20px);
`

const StyledButton = styled.button`
  cursor: pointer;
`
