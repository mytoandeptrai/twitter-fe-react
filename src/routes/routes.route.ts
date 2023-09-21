import React from 'react'
const Auth = React.lazy(() => import('@/pages/auth'))
const NewsFeed = React.lazy(() => import('@/pages/news-feed'))
const Search = React.lazy(() => import('@/pages/search'))
const CreateStory = React.lazy(() => import('@/pages/story'))

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
  story: {
    create: '/story/create'
  }
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
    path: ROUTES_PATH.search,
    Element: Search,
    isLazy: true,
    isPrivate: true
  },
  {
    path: ROUTES_PATH.story.create,
    Element: CreateStory,
    isLazy: true
  }
]

export { ROUTES_PATH, routes }
