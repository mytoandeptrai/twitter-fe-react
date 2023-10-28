import React from 'react'
const Auth = React.lazy(() => import('@/pages/auth'))
const NewsFeed = React.lazy(() => import('@/pages/news-feed'))
const Search = React.lazy(() => import('@/pages/search'))
const Notification = React.lazy(() => import('@/pages/notification'))
const CreateStory = React.lazy(() => import('@/pages/story/pages/create'))
const ViewStory = React.lazy(() => import('@/pages/story/pages/view'))
const HashTag = React.lazy(() => import('@/pages/hashtag'))
const TweetDetail = React.lazy(() => import('@/pages/tweet-detail'))
const Explore = React.lazy(() => import('@/pages/explore'))
const Bookmark = React.lazy(() => import('@/pages/bookmark'))
const Profile = React.lazy(() => import('@/pages/profile'))
const Chat = React.lazy(() => import('@/pages/chat'))

interface RoutesType {
  path: string
  Element: React.LazyExoticComponent<React.FC> | React.FC
  isPrivate?: boolean
  isLazy?: boolean
}

const ROUTES_PATH = {
  home: '/',
  auth: '/auth',
  search: '/search',
  bookmark: '/bookmark',
  explore: '/explore',
  notifications: '/notifications',
  profile: '/profile',
  hashTags: '/hashtag',
  tweet: '/tweet',
  chat: '/chat',
  story: {
    create: '/story/create',
    view: '/story/view'
  },
  notFound: '/404'
}

const routes: RoutesType[] = [
  {
    path: ROUTES_PATH.auth,
    Element: Auth,
    isLazy: true
  },
  {
    path: ROUTES_PATH.home,
    Element: NewsFeed,
    isLazy: true,
    isPrivate: true
  },
  {
    path: ROUTES_PATH.explore,
    Element: Explore,
    isLazy: true
  },
  {
    path: ROUTES_PATH.bookmark,
    Element: Bookmark,
    isLazy: true,
    isPrivate: true
  },
  {
    path: ROUTES_PATH.search,
    Element: Search,
    isLazy: true,
    isPrivate: true
  },
  {
    path: ROUTES_PATH.notifications,
    Element: Notification,
    isLazy: true,
    isPrivate: true
  },
  {
    path: ROUTES_PATH.story.create,
    Element: CreateStory,
    isLazy: true
  },
  {
    path: `${ROUTES_PATH.story.view}/:userId`,
    Element: ViewStory,
    isLazy: true
  },
  {
    path: `${ROUTES_PATH.tweet}/:tweetId`,
    Element: TweetDetail,
    isLazy: true
  },
  {
    path: `${ROUTES_PATH.hashTags}/:hashTag`,
    Element: HashTag,
    isLazy: true
  },
  {
    path: `${ROUTES_PATH.profile}/:userId`,
    Element: Profile,
    isLazy: true
  },
  {
    path: `${ROUTES_PATH.chat}/:roomId`,
    Element: Chat,
    isLazy: true
  }
]

export { ROUTES_PATH, routes }
