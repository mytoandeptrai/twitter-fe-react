import { EBoxShadow, EFontSize, EFontWeight } from '@/constants'
import { styled } from 'styled-components'

type Props = {
  title: JSX.Element
  content: any
}

const LayoutWithSectionHeading = ({ title, content }: Props) => {
  return (
    <StyledRoot>
      <StyledHeader>{title}</StyledHeader>
      <StyledContent>{content}</StyledContent>
    </StyledRoot>
  )
}

export default LayoutWithSectionHeading

const StyledRoot = styled.div`
  background: #ffffff;
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  margin-bottom: 2.5rem;
  min-height: 13rem;
`

const StyledHeader = styled.header`
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor1};
  margin-bottom: 2rem;
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight600};
`

const StyledContent = styled.div``
