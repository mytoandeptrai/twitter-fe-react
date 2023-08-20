import React from 'react'

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
