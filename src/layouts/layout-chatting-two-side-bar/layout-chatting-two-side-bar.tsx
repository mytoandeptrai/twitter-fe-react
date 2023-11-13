import React from 'react'
import styled from 'styled-components'

type Props = {
  leftSideBar: JSX.Element
  rightSideBar: JSX.Element
  content: JSX.Element
}

const LayoutChattingTwoSideBar = ({ content, leftSideBar, rightSideBar }: Props) => {
  return (
    <StyledContainer>
      <StyledLeftSideBar>{leftSideBar}</StyledLeftSideBar>
      <StyledMainContent>{content}</StyledMainContent>
      <StyledRightSideBar>{rightSideBar}</StyledRightSideBar>
    </StyledContainer>
  )
}

export default LayoutChattingTwoSideBar

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 58% 20%;
  min-height: 100vh;
  gap: 1rem;
  background-color: #e0e0e0;
  width: 100%;
`

const StyledLeftSideBar = styled.aside``

const StyledRightSideBar = styled.aside``

const StyledMainContent = styled.main`
  border: 1px solid #e0e0e0;
`
