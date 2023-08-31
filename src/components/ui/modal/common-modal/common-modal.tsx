import { CommonButton } from '@/components'
import { EBorder, EFontSize, EFontWeight } from '@/constants'
import { useToggle } from '@/hooks'
import { BaseControlledRef, NewAnimatePresenceProps } from '@/types'
import { safeCallFn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Ref, forwardRef, memo, useCallback, useImperativeHandle } from 'react'
import { styled } from 'styled-components'
import { config } from './common-modal.config'

export interface IModalProps {
  body?: React.ReactNode
  okText?: React.ReactNode
  header?: React.ReactNode
  cancelText?: React.ReactNode

  customHeaderStyles?: string
  customRootStyles?: string
  zIndex?: number

  onOk?: () => void
  onCancel?: () => void
}

const CommonModal = (props: IModalProps, ref: Ref<BaseControlledRef>): JSX.Element => {
  const {
    body,
    header,
    okText,
    zIndex,
    cancelText,

    onOk,
    onCancel,

    customHeaderStyles,
    customRootStyles
  } = props

  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence

  const { hide, show, visible } = useToggle()

  const onHidden = useCallback(() => {
    hide()
    document.body.style.overflow = 'auto'
  }, [hide])

  const onShow = useCallback(() => {
    show()
    document.body.style.overflow = 'hidden'
  }, [show])

  const onDismiss = () => {
    onHidden()
    safeCallFn(onCancel as Function)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => {
          return onShow()
        },
        hide: () => {
          return onHidden()
        }
      }
    },
    [onHidden, onShow]
  )

  const renderModal = (isVisible: boolean) => {
    if (!isVisible) {
      return null
    }

    return (
      <StyledRoot zIndex={zIndex} {...config} customRootStyles={customRootStyles}>
        <StyledMask onClick={onDismiss} />
        <StyledMainContent>
          <StyledHeader customHeaderStyles={customHeaderStyles}>{header}</StyledHeader>
          <StyledBody>{body}</StyledBody>
          {onOk && onCancel && (
            <StyledFooter>
              <CommonButton onClick={onOk}>{okText || 'OK'}</CommonButton>
              <StyledCancelButton onClick={onDismiss}>{cancelText || 'Cancel'}</StyledCancelButton>
            </StyledFooter>
          )}
        </StyledMainContent>
      </StyledRoot>
    )
  }

  return <NewAnimatePresence>{renderModal(visible)}</NewAnimatePresence>
}

export default memo(forwardRef(CommonModal))

export const StyledRoot = styled(motion.div)<{
  zIndex?: number
  customRootStyles?: string
}>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => (props.zIndex ? props.zIndex : '100')};
  ${(props) => props.customRootStyles};
`

export const StyledMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

export const StyledMainContent = styled.div`
  max-width: 70%;
  background: #fff;
  z-index: 1;
  border-radius: 8px;
  padding: 2rem;
`
export const StyledHeader = styled('div')<{
  customHeaderStyles?: string
}>`
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  font-weight: ${EFontWeight.FontWeight500};
  font-size: ${EFontSize.Font3};
  border-bottom: ${EBorder.Border1};
  ${(props) => props.customHeaderStyles};
`
export const StyledBody = styled.div`
  max-height: 50rem;
  overflow-x: hidden;
  overflow-y: overlay;
  padding: 1.5rem;
`
export const StyledFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: end;
  border-top: 1px solid var(--gray-4);
  margin-top: 2rem;
  gap: 1rem;
`

export const StyledCancelButton = styled.button`
  background: var(--red);
  color: #fff;
  font-weight: ${EFontWeight.FontWeight500};
  border-radius: 5px;
  padding: 0.5rem 2rem;
`
