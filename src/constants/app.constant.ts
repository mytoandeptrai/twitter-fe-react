export enum ELocalStorageKey {
  AccessToken = 'accessToken'
}

export enum APP_DISPATCH_ACTIONS {
  SET_LOADING = 'SET_LOADING',
  SET_MODAL = 'SET_MODAL'
}

export enum APP_WINDOW_SIZE {
  OVER_OR_SAME_DESKTOP = 768
}

export enum EFormType {
  View = 'view',
  Update = 'update',
  Create = 'create',
  Delete = 'delete',
  Report = 'report'
}

export enum EUpdateType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

export enum EMedia {
  Image = 'image',
  Video = 'video'
}

export enum EViewMode {
  Block = 'block',
  Flex = 'flex',
  Grid = 'grid',
  None = 'none'
}

export enum EProfileType {
  Home = 'home',
  Liked = 'liked',
  Medias = 'medias'
}

export enum EUserListType {
  Liked = 'liked',
  Saved = 'saved',
  Retweeted = 'retweeted',
  Following = 'following',
  Followed = 'followed'
}

export enum EInteractionButton {
  Like = 'like',
  Save = 'save',
  Comment = 'comment',
  Share = 'share'
}

export enum EExploreType {
  PopularUser = 'popular-users',
  LatestTweets = 'latest-tweets',
  LatestMedias = 'latest-medias',
  PopularTweets = 'popular-tweets'
}

export const MASONRY_CONFIG_BREAKPOINTS = {
  default: 3,
  700: 2,
  500: 1
}
