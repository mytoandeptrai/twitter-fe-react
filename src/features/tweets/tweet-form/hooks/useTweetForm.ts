import { EMedia, ETweetQuery, EUpdateType } from '@/constants'
import { TweetModel } from '@/models'
import {
  EventBusName,
  onPushEventBusHandler,
  useHashtagService,
  useQueryService,
  useTweetService,
  useUploadService,
  useUserService
} from '@/services'
import { AppDispatch } from '@/store'
import { setGlobalLoading } from '@/store/app/app.slice'
import { ICreateTweetDTO, IMedia, ITweet } from '@/types'
import { extractMetadata, initMediaFromUrl } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import _get from 'lodash/get'
import { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

type Props = {
  tweet?: ITweet | null
}

export const useTweetForm = ({ tweet }: Props) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch<AppDispatch>()

  const { getCurrentUser } = useUserService()
  const author = useMemo(() => getCurrentUser(), [getCurrentUser])

  const { createTweetMutation, updateTweetMutation } = useTweetService()
  const { optimisticUpdateInfinityList } = useQueryService()
  const { uploadMedias } = useUploadService()
  const { updateHashTags } = useHashtagService()

  const [audience, setAudience] = useState<number>(tweet?.audience || 0)
  const [body, setBody] = useState(tweet?.content || '')
  const [medias, setMedias] = useState<IMedia[]>([])
  const [initialMedias, setInitialMedias] = useState(tweet?.media?.map(initMediaFromUrl) || [])

  const filterImageOrVideoMedia = useCallback((file: File) => {
    return file.type.split('/')[0].includes('image') ? EMedia.Image : EMedia.Video
  }, [])

  const onCreateImagesArray = useCallback(
    (files: FileList): IMedia[] => {
      return Array.from(files).map((file) => ({
        id: uuid(),
        file,
        url: URL.createObjectURL(file),
        type: filterImageOrVideoMedia(file)
      }))
    },
    [filterImageOrVideoMedia]
  )

  const onResetContent = useCallback(() => setBody(''), [])

  const onDispatchLoadingRedux = useCallback(
    (visible: boolean) => {
      const payload = {
        visible,
        component: null
      }

      dispatch(setGlobalLoading(payload))
    },
    [dispatch]
  )

  const onResetMedias = useCallback(() => {
    setMedias([])
    setInitialMedias([])
  }, [])

  const onResetAll = useCallback(() => {
    onResetMedias()
    setAudience(0)
    onResetContent()
    setGlobalLoading(false)
  }, [onResetContent, onResetMedias])

  const onChangeAudience = useCallback((value: number) => setAudience(value), [])

  const onChangeBody = useCallback((value: string) => setBody(value), [])

  const onChangeFile = useCallback(
    (files: FileList) => {
      if (files.length === 0) return
      const newMedias: IMedia[] = onCreateImagesArray(files)
      setMedias(newMedias)
    },
    [onCreateImagesArray]
  )

  const onSubmitFailed = useCallback(
    (error: any) => {
      onResetAll()
      onPushEventBusHandler({
        type: EventBusName.Error,
        payload: _get(error, 'response.data.message', 'Something went wrong!')
      })
    },
    [onResetAll]
  )

  const onSubmitSuccess = useCallback(() => {
    const initialHashtags = tweet?.tags || []
    const { hashtags: newHashtags } = extractMetadata(body || '')
    updateHashTags(initialHashtags, newHashtags)
    onResetAll()
    queryClient.invalidateQueries([ETweetQuery.GetLatestTweets])
  }, [body, onResetAll, queryClient, tweet?.tags, updateHashTags])

  const prepareNewMedias = useCallback(async () => {
    let newMedias: IMedia[] = [...initialMedias]

    if (medias.length > 0) {
      const mediaResponse = await uploadMedias(medias?.map((media: IMedia) => media?.file as File) || [])
      if (!mediaResponse?.some(Boolean)) {
        return newMedias
      }
      newMedias = [...mediaResponse.map(initMediaFromUrl), ...initialMedias]
    }

    return newMedias
  }, [initialMedias, medias, uploadMedias])

  const createNewTweet = useCallback(
    (newMedias: IMedia[], hashtags: string[]) => {
      return {
        content: body,
        audience,
        media: newMedias?.map((media) => media.url),
        tags: hashtags
      }
    },
    [body, audience]
  )

  const submitTweet = useCallback(
    async (newTweet: ICreateTweetDTO) => {
      optimisticUpdateInfinityList({
        data: new TweetModel({
          ...newTweet,
          _id: tweet?._id || uuid(),
          author,
          createdAt: new Date(),
          updatedAt: new Date()
        } as ITweet).getData(),
        queryKey: ETweetQuery.GetLatestTweets,
        type: tweet ? EUpdateType.Update : EUpdateType.Create
      })

      const options = {
        onSuccess: onSubmitSuccess,
        onError: onSubmitFailed,
        onSettled: () => {
          onDispatchLoadingRedux(false)
        }
      }

      if (tweet) {
        updateTweetMutation.mutate(
          {
            tweetId: tweet._id,
            updatedTweet: newTweet
          },
          { ...options }
        )
      } else {
        createTweetMutation.mutate(newTweet, {
          ...options
        })
      }
    },
    [
      optimisticUpdateInfinityList,
      tweet,
      author,
      onSubmitSuccess,
      onSubmitFailed,
      onDispatchLoadingRedux,
      updateTweetMutation,
      createTweetMutation
    ]
  )

  const onSubmit = useCallback(
    async (callback?: () => void) => {
      if (!body && medias.length === 0) return

      onDispatchLoadingRedux(true)

      const newMedias = await prepareNewMedias()
      if (!newMedias) return

      const { hashtags } = extractMetadata(body)
      const newTweet = createNewTweet(newMedias, hashtags)

      await submitTweet(newTweet)

      callback && callback()
    },
    [body, medias.length, onDispatchLoadingRedux, prepareNewMedias, createNewTweet, submitTweet]
  )

  return {
    body,
    medias,
    initialMedias,
    audience,

    onSubmit,
    onChangeFile,
    onResetMedias,
    onChangeAudience,
    onChangeBody
  }
}
