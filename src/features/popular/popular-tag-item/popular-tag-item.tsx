import { EEndpoints, EFontSize, EFontWeight } from '@/constants'
import { IHashtag } from '@/types'
import { nFormatter } from '@/utils'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  data: IHashtag
}

const PopularTagItem = ({ data }: Props) => {
  const { t } = useTranslation()
  const { _id, count, name } = data
  return (
    <StyledTagItemRoot key={`popular-tag-${_id}`} to={`${EEndpoints.HashTag}/${name}`}>
      <StyledTagName>#{name}</StyledTagName>
      <StyledTagCounter>
        {nFormatter(count)} {`${t('common.text.tweet')}${count > 1 ? 's' : ''}`}{' '}
      </StyledTagCounter>
    </StyledTagItemRoot>
  )
}

export default memo(PopularTagItem)

export const StyledTagItemRoot = styled(Link)`
  margin-bottom: 2.5rem;
  display: block;
  color: ${({ theme }) => theme.backgroundColor2};
`

export const StyledTagName = styled.p`
  font-size: ${EFontSize.Font7};
  font-weight: ${EFontWeight.FontWeight600};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`

export const StyledTagCounter = styled.span`
  color: ${({ theme }) => theme.textColor1};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
`
