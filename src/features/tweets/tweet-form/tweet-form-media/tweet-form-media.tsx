import { MediaViewer } from '@/components'
import { EFontSize, EFontWeight, EViewMode } from '@/constants'
import { IMedia } from '@/types'
import { memo } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { styled } from 'styled-components'

const MAX_MEDIA_VIEWS = 5
const DEFAULT_MEDIA_VIEWS = 0

type Props = {
  medias: IMedia[]
  onResetMedias: () => void
}

const generateListMode = (mediaLength: number) => {
  let listMode: EViewMode = EViewMode.None
  if (mediaLength > 2) {
    listMode = EViewMode.Grid
  } else if (mediaLength > 1) {
    listMode = EViewMode.Flex
  } else if (mediaLength > 0) {
    listMode = EViewMode.Block
  }
  return listMode
}

const TweetFormMedia = ({ medias, onResetMedias }: Props) => {
  const mediaLength = medias.length
  const listMode = generateListMode(mediaLength)

  const remainingSlots = Math.max(DEFAULT_MEDIA_VIEWS, mediaLength - MAX_MEDIA_VIEWS)

  return (
    <StyledRoot mode={listMode}>
      <StyledResetMediaButton onClick={onResetMedias}>
        <ImCancelCircle />
      </StyledResetMediaButton>
      {medias?.slice(DEFAULT_MEDIA_VIEWS, Math.min(medias.length, MAX_MEDIA_VIEWS)).map((media) => {
        return (
          <StyledItem key={`media-item-preview-${media.id}`}>
            <MediaViewer data={media} />
          </StyledItem>
        )
      })}
      {remainingSlots > 0 && <StyledItemPlaceholder>{remainingSlots}+</StyledItemPlaceholder>}
    </StyledRoot>
  )
}

export default memo(TweetFormMedia)

const StyledItem = styled.article`
  width: 100%;
  height: 100%;
`

const StyledItemPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${EFontSize.GiantFont1};
  font-weight: ${EFontWeight.FontWeight500};
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.textColor1};
`

const StyledResetMediaButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  z-index: 9;

  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }
`

const StyledRoot = styled.div<{
  mode: EViewMode
}>`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2rem;

  display: ${(props) => props.mode};

  ${(props) =>
    props.mode === 'block' &&
    `
        height: 30rem;
    `};

  ${(props) =>
    props.mode === 'flex' &&
    `
        & > img{
            width: 50%;
        }
    `};

  ${(props) =>
    props.mode === 'grid' &&
    `
        grid-template-rows: repeat(2, 20rem);
        grid-template-columns: repeat(6, 1fr);
        
        ${StyledItem}:nth-of-type(1){
            grid-row: 1;
            grid-column: 1/span 3;
        }
        
        ${StyledItem}:nth-of-type(2){
            grid-row: 1;
            grid-column: 4/-1;
        }
        
        ${StyledItem}:nth-of-type(3){
            grid-row: 2;
            grid-column: 1/span 2;
        }
        
        ${StyledItem}:nth-of-type(4){
            grid-row: 2;
            grid-column: 3/span 2;
        }
        
        ${StyledItem}:nth-of-type(5), ${StyledItemPlaceholder}{
            grid-row: 2;
            grid-column: 5/-1;
            position: relative;
        }
    `}
`
