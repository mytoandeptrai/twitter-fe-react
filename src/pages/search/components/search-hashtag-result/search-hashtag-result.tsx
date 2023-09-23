import { EBoxShadow, EFontSize, EFontWeight } from '@/constants'
import { ROUTES_PATH } from '@/routes'
import { IHashtag } from '@/types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  hashtag: IHashtag
}

const SearchHashTagResult = ({ hashtag }: Props) => {
  const { t } = useTranslation()

  const to = `${ROUTES_PATH.hashTags}/${hashtag?.name}`

  return (
    <StyledRoot to={to}>
      <StyledName>#{hashtag?.name}</StyledName>
      <StyledCounter>
        {t('numberOfTweet')}: <span>{hashtag?.count}</span>
      </StyledCounter>
    </StyledRoot>
  )
}

export default memo(SearchHashTagResult)

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 0.8rem;
`

const StyledName = styled.p`
  font-size: ${EFontSize.Font7};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
`

const StyledCounter = styled.p`
  font-size: ${EFontSize.Font4};

  span {
    font-size: ${EFontSize.Font5};
    font-weight: ${EFontWeight.FontWeight500};
    color: ${({ theme }) => theme.textColor8};
    margin-left: 1rem;
  }
`
