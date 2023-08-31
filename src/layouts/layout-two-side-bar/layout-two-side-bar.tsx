import React from 'react'
import { styled } from 'styled-components'

type Props = {
  leftSideBar?: JSX.Element | null
  rightSideBar?: JSX.Element | null
  content: JSX.Element
}

const LayoutTwoSideBar = ({ content, leftSideBar, rightSideBar }: Props) => {
  return (
    <StyledContainer>
      <StyledLeftSideBar>{leftSideBar}</StyledLeftSideBar>
      <StyledMainContent>{content}</StyledMainContent>
      <StyledRightSideBar>{rightSideBar}</StyledRightSideBar>
    </StyledContainer>
  )
}

export default LayoutTwoSideBar

const StyledContainer = styled.div`
  max-width: 75%;
  width: 100%;
  margin: 2.5rem auto;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`

const StyledLeftSideBar = styled.aside`
  width: 30rem;
  max-width: 30rem;
  max-height: 100vh;
  top: 7rem;
  padding: 0 2rem 2rem 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`
const StyledRightSideBar = styled.aside`
  max-height: 100vh;
  position: sticky;
  top: 7rem;
  border-radius: 1.2rem;
  overflow: auto;
  padding: 0 2rem 2rem 2rem;

  width: 30rem;
`
const StyledMainContent = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`
