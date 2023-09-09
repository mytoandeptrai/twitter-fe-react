import { ROUTES_PATH } from '@/routes'
import { stopPropagation } from '@/utils'
import nl2br from 'react-nl2br'
import { Link } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'

const url_regex = /(https?:\/\/\S+)/g
const hashtags_regex = /(#[\w]+)/g

const generateParsedContentTweet = (content: string) => {
  let replacedText: any = ''
  const brContent = nl2br(content)

  /** Match url */
  replacedText = reactStringReplace(brContent, url_regex, (match, i) => (
    <Link key={match + i} to={match} onClick={stopPropagation}>
      {match}
    </Link>
  ))

  /** Match hashtags */
  replacedText = reactStringReplace(replacedText, hashtags_regex, (match, i) => (
    <Link key={match + i} to={`${ROUTES_PATH.hashTags}/${match}`} onClick={stopPropagation}>
      {match}
    </Link>
  ))

  return replacedText
}

const NUMBER_OF_SHOW_INDICATORS = 1

export { NUMBER_OF_SHOW_INDICATORS, generateParsedContentTweet }
