import { ImageWithPlaceHolder } from '@/components'
import { RoomImageChatGallery } from '@/features'
import { IRoom, IUser } from '@/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  room: IRoom | null
  guest: IUser | null
  chatImages: string[]
  onChangeShowMemberList: (value: boolean) => void
}

const customStyles = `--size: 8rem;
width: var(--size);
height: var(--size);
object-fit: cover;
border-radius: 50%;`

const ChatRightSidebar = ({ room, guest, chatImages, onChangeShowMemberList }: Props) => {
  const { t } = useTranslation()
  const roomInfos = useMemo(() => {
    const { isDm, members, image, name } = room || {}
    const roomImage = (isDm ? guest?.avatar : image) ?? ''
    const roomName = (isDm ? guest?.name : name) ?? ''
    return {
      isDm,
      members,
      roomImage,
      roomName
    }
  }, [room, guest])

  const renderChatRoomInfo = () => {
    if (!roomInfos?.roomName) return null

    if (roomInfos?.isDm) {
      return (
        <StyledChartArticleRoomInfoLink>
          <Link to={`/profile/${guest?._id}`}>{roomInfos?.roomName}</Link>
        </StyledChartArticleRoomInfoLink>
      )
    }

    return <StyledChartArticleRoomInfoName>{roomInfos?.roomName}</StyledChartArticleRoomInfoName>
  }

  const renderChatArticle = () => {
    return (
      <StyledChatArticle>
        <StyledChatArticleImageWrapper>
          <ImageWithPlaceHolder
            src={roomInfos?.roomImage}
            alt={`${roomInfos?.roomName}-bg`}
            customStyles={customStyles}
          />
        </StyledChatArticleImageWrapper>
        {renderChatRoomInfo()}
      </StyledChatArticle>
    )
  }

  const renderChatAction = () => {
    if (!roomInfos?.isDm) {
      return <StyledChartAction onClick={() => onChangeShowMemberList(true)}>{t('roomMemberList')}</StyledChartAction>
    }

    return null
  }

  const renderChatImageGallery = () => {
    if (!!chatImages.length) {
      return <RoomImageChatGallery images={chatImages} />
    }

    return null
  }

  return (
    <React.Fragment>
      {renderChatArticle()}
      {renderChatAction()}
      {renderChatImageGallery()}
    </React.Fragment>
  )
}

export default ChatRightSidebar

const StyledChatArticle = styled.article`
  text-align: center;
  margin-top: 1rem;
`

const StyledChatArticleImageWrapper = styled.figure``

const StyledChartArticleRoomInfoLink = styled.figcaption`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1rem 0;

  a {
    color: #000000;
    &:hover {
      text-decoration: underline;
      transition: all 0.5s linear;
    }
  }
`

const StyledChartArticleRoomInfoName = styled.figcaption`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1rem 0;
`

const StyledChartAction = styled.button`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
  width: 100%;
`
