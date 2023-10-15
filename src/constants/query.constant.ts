export const SORT_STALE_TIME = 60 * 60 * 1000 // 1 hour
export const LONG_STATE_TIME = 60 * 60 * 1000 * 24 // 1 day
export const SHORT_EXP_TIME = 1000 * 60 * 5 // 5 minutes
export const DEFAULT_LIST_LIMIT = 20
export const DEFAULT_POPULAR_LIMIT = 5
export const DEFAULT_POPULAR_PAGE = 1

export enum EAuthQuery {
  Login = 'Login',
  Register = 'Register',
  Logout = 'Logout'
}

export enum EUserQuery {
  GetMe = 'GetMe',
  GetUser = 'GetUser',
  GetPopularUser = 'GetPopularUser',
  GetLimitPopularUser = 'GetLimitPopularUser',
  FollowUser = 'FollowUser',
  UnFollowUser = 'UnFollowUser'
}

export enum ETweetQuery {
  GetTweet = 'GetTweet',
  CreateTweet = 'CreateTweet',
  UpdateTweet = 'UpdateTweet',
  GetLatestTweets = 'GetLatestTweets',
  GetNewsFeedTweets = 'GetNewsFeedTweets',
  GetSavedTweets = 'GetSavedTweets',
  GetPopularTweets = 'GetPopularTweets',
  GetTweetByHashTag = 'GetTweetByHashTag',
  GetTweetByUser = 'GetTweetByUser',
  GetTweetMediaByUser = 'GetTweetMediaByUser',
  GetLikedTweetByUser = 'GetLikedTweetByUser',
  Retweet = 'Retweet',
  ReactTweet = 'ReactTweet',
  SaveTweet = 'SaveTweet',
  ReportTweet = 'ReportTweet',
  GetTweetMedias = 'GetTweetMedias',
  GetBookmarkTweets = 'GetBookmarkTweets',
  GetTweetsByHashtag = 'GetTweetsByHashtag',
  DeleteTweet = 'DeleteTweet'
}

export enum EHashTagQuery {
  GetPopularTags = 'GetPopularTags',
  UpdateHashTag = 'UpdateHashTag'
}

export enum EStoryQuery {
  GetStories = 'GetStories',
  CreateStory = 'CreateStory'
}

export enum ECommentQuery {
  GetTweetComments = 'GetTweetComments',
  CreateComment = 'CreateComment',
  ReactComment = 'ReactComment'
}
