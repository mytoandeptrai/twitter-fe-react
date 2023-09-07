import { EFontSize } from '@/constants'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { useMemo } from 'react'
import { BiError } from 'react-icons/bi'
import styled from 'styled-components'
import { getLinkPreview } from './external-preview-link.config'

type Props = {
  url: string
}

const ExternalPreviewLink = ({ url }: Props) => {
  const LinkNotFound = useMemo(() => {
    return (
      <StyledLinkNotFound>
        <p> Link not found!</p>
        <BiError />
      </StyledLinkNotFound>
    )
  }, [])

  return <StyledLinkPreview fallback={LinkNotFound} fetcher={() => getLinkPreview(url)} url={url} />
}

export default ExternalPreviewLink

const StyledLinkNotFound = styled.div`
  font-size: ${EFontSize.Font6};
  svg {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
  }
`

const StyledLinkPreview = styled(LinkPreview)`
  width: 100%;
  height: 100%;
`
