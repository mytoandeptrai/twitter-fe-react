import { ExternalPreviewLink, MediaViewer } from '@/components'
import { EFontSize } from '@/constants'
import { ITweet } from '@/types'
import { extractMetadata, initMediaFromUrl } from '@/utils'
import { useMemo } from 'react'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import { NUMBER_OF_SHOW_INDICATORS, generateParsedContentTweet } from './tweet-item-content.config'

type Props = {
  tweet: ITweet
}

const TweetItemContent = ({ tweet }: Props) => {
  const parsedContentTweet = generateParsedContentTweet(tweet.content)
  const { urls } = extractMetadata(tweet.content || '')

  const tweetMedias = useMemo(() => {
    return (tweet?.media || [])?.map((url: string) => {
      const media = initMediaFromUrl(url)

      return (
        <StyledTweetMedia key={media.id}>
          <MediaViewer data={media} />
        </StyledTweetMedia>
      )
    })
  }, [tweet?.media])

  const renderTweetContent = () => {
    if (tweet?.content) {
      return <StyledDescription>{parsedContentTweet}</StyledDescription>
    }

    return null
  }

  const renderTweetUrl = () => {
    if (urls && !!urls.length && !tweet?.media?.length) {
      return <ExternalPreviewLink url={urls[0]} />
    }

    return null
  }

  const renderTweetCarousel = () => {
    if (!!tweet?.media?.length) {
      const isShowIndicators = tweet?.media?.length > NUMBER_OF_SHOW_INDICATORS
      return (
        <Carousel showArrows={false} showIndicators={isShowIndicators} showStatus={isShowIndicators} showThumbs={false}>
          {tweetMedias}
        </Carousel>
      )
    }
  }

  return (
    <StyledRoot>
      {renderTweetContent()}
      {renderTweetUrl()}
      {renderTweetCarousel()}
    </StyledRoot>
  )
}

export default TweetItemContent

const StyledRoot = styled.div``

const StyledDescription = styled.div`
  font-size: ${EFontSize.Font6};
  color: ${({ theme }) => theme.textColor3};
  margin-bottom: 2rem;
`

export const StyledTweetMedia = styled.div`
  height: 40rem;
  object-fit: contain;
  border-radius: 0.8rem;
`
