import { ImageWithPlaceHolder } from '@/components'
import { ROUTES_PATH } from '@/routes'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  name: string
  image: string
  id: string
}

const RoomItem = ({ id, image, name }: Props) => {
  const url = `${ROUTES_PATH.chat}/${id}`
  return (
    <Link to={url} key={`room-id-${id}`}>
      <StyledArticle>
        <StyledImage>
          <ImageWithPlaceHolder alt={name} src={image} />
        </StyledImage>
        <StyledName>{name}</StyledName>
      </StyledArticle>
    </Link>
  )
}

export default RoomItem

const StyledArticle = styled.article`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  transition: all 0.2s;
  color: #000;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`

const StyledName = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`

const StyledImage = styled.figure`
  img {
    --size: 5rem;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: 50%;
    flex-shrink: 0;
  }
`
