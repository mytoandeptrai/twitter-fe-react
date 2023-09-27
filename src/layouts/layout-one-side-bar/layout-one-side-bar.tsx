import { StyledContainer, StyledFlex } from '@/components'
import React from 'react'
import styled from 'styled-components'

type Props = {
  content: JSX.Element
  sideBar?: JSX.Element | null
  isFullWidth?: boolean
  customSideBarWidth?: string
}

const LayoutOneSideBar = ({ sideBar, content, isFullWidth, customSideBarWidth }: Props) => {
  const renderElement = () => {
    if (isFullWidth) {
      return (
        <StyledFlex align='start' gap={2.5}>
          <SideBar customSideBarWidth={customSideBarWidth}>{sideBar}</SideBar>
          <MainContent>{content}</MainContent>
        </StyledFlex>
      )
    }

    return (
      <StyledContainer>
        <StyledFlex align='start' gap={2.5}>
          <SideBar customSideBarWidth={customSideBarWidth}>{sideBar}</SideBar>
          <MainContent>{content}</MainContent>
        </StyledFlex>
      </StyledContainer>
    )
  }

  return <React.Fragment>{renderElement()}</React.Fragment>
}

export default LayoutOneSideBar

const MainContent = styled.div`
  flex: 1;
`

const SideBar = styled.aside<{
  customSideBarWidth?: string
}>`
  width: ${({ customSideBarWidth }) => customSideBarWidth || '25%'};
`
