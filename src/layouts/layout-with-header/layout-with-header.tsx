import React from 'react'
import { Header } from '../components'

type Props = {
  children: React.ReactNode
}

const LayoutWithHeader = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default LayoutWithHeader
