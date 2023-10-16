import { useStoryService, useUserService } from '@/services'
import { IStory, IStoryUserMetadata, IUser } from '@/types'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { hasNextButtonHandler, hasPreviousButtonHandler } from '../view-story-content.config'
import classes from '../view-story-content.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES_PATH } from '@/routes'

type Props = {
  currentStory: IStory[]
  activeStoryIdx: number
  storyOwners: IUser[]
  activeStory: IStory | null
  userStoryMetadata: IStoryUserMetadata | null
  onViewUserStories: (userId: string) => void
  onChangeActiveStoryIdx: (newActiveId: number) => void
}

export const useViewStoryContent = (props: Props) => {
  const {
    activeStory,
    currentStory,
    activeStoryIdx,
    storyOwners,
    userStoryMetadata,

    onViewUserStories,
    onChangeActiveStoryIdx
  } = props

  const { deleteStoryMutation } = useStoryService()
  const { getCurrentUser } = useUserService()
  const currentUser = getCurrentUser()
  const navigate = useNavigate()

  const itemsRef = useRef<Array<HTMLDivElement | null>>([])

  const isBothCurrentUserAndOwner = useMemo(() => {
    return currentUser?._id === activeStory?.owner?._id
  }, [currentUser, activeStory])

  const hasArrowButtonGroup = useMemo(() => {
    const payload = {
      storiesData: currentStory,
      activeStoryIdx,
      userStoryMetadata
    }
    const hasPreviousButton = hasPreviousButtonHandler(payload) || false
    const hasNextButton = hasNextButtonHandler(payload) || false

    return {
      hasPreviousButton,
      hasNextButton
    }
  }, [activeStoryIdx, currentStory, userStoryMetadata])

  const onLeftArrowClick = useCallback(
    (activeStoryIdx: number, userStoryMetadata: IStoryUserMetadata | null) => {
      /** If the active story is not the first story, go to prev story */
      if (activeStoryIdx !== 0) {
        const newActiveStoryIdx = activeStoryIdx - 1
        return onChangeActiveStoryIdx(newActiveStoryIdx)
      }

      /** If the active story is the first story, go to views the stories of prev user if has */
      const previousUserStoryIdx = userStoryMetadata?.prevUserId
      !!previousUserStoryIdx && onViewUserStories(previousUserStoryIdx)
    },
    [onChangeActiveStoryIdx, onViewUserStories]
  )

  const onRightArrowClick = useCallback(
    (activeStoryIdx: number, userStoryMetadata: IStoryUserMetadata | null, currentStories: IStory[]) => {
      /** If the active story is not the last story, go to next story */
      if (activeStoryIdx !== currentStories.length - 1) {
        const newActiveStoryIdx = activeStoryIdx + 1
        return onChangeActiveStoryIdx(newActiveStoryIdx)
      }

      /** If the active story is the last story, go to views the stories of next user if has */
      const nextUserStoryIdx = userStoryMetadata?.nextUserId
      !!nextUserStoryIdx && onViewUserStories(nextUserStoryIdx)
    },
    [onChangeActiveStoryIdx, onViewUserStories]
  )

  const onDeleteStory = useCallback(
    async (storyId?: string) => {
      if (!storyId) {
        return
      }

      await deleteStoryMutation.mutateAsync({
        storyId: storyId
      })

      // reload the page
      window.location.reload()
    },
    [deleteStoryMutation]
  )

  /** side effect for trigger animation in story */
  useEffect(() => {
    /** There is no story -> back to home page */
    if (!currentStory || currentStory.length === 0) {
      navigate(ROUTES_PATH.home)
      return
    }

    /** Detect for add animation to story */
    if (itemsRef.current) {
      itemsRef.current.forEach((item: HTMLDivElement | null, index: number) => {
        if (item) {
          /** Detect if element end of animation */
          item.addEventListener('animationend', () => {
            /** Get next story by using index */
            const nextIdx = index + 1
            if (index < itemsRef.current.length) {
              /** Add class active for the next story -> means that the next story will start with class active to trigger animation */
              itemsRef.current[nextIdx]?.classList.add(classes.active)
            }

            /** Remove old story element had ended of its animation */
            item.classList.remove(classes.active)
            item.classList.add(classes.passed)

            /** If still has story of current user -> view next story by on change active story idx  */
            if (nextIdx < currentStory.length) {
              onChangeActiveStoryIdx(nextIdx)
              return
            }

            /** After, if there is no story of current user, we will check move for the next user who has story*/
            if (userStoryMetadata?.nextUserId) {
              const nextUserId = userStoryMetadata?.nextUserId
              onViewUserStories(nextUserId)
              return
            }

            /** After all above, if there are both no story and no nextUserId, we will back to home page */
            navigate(ROUTES_PATH.home)
          })
        }
      })
    }

    return () => {
      if (itemsRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        itemsRef.current.forEach((item: HTMLDivElement | null) => {
          if (item) {
            item.removeEventListener('animationend', () => {
              item.classList.remove(classes.active)
              item.classList.remove(classes.passed)
            })
          }
        })
      }
    }
  }, [currentStory, navigate, onChangeActiveStoryIdx, onViewUserStories, userStoryMetadata?.nextUserId])

  /** side effect for view story */
  // useEffect(() => {
  //   ;(async () => {
  //     if (activeStory && currentUser?._id) {
  //       const viewerIds = activeStory?.viewerIds || []

  //       if (!viewerIds.includes(currentUser._id)) {
  //         const payload = { storyId: activeStory._id }
  //         await updateStoryMutation.mutateAsync(payload)
  //       }
  //     }
  //   })()
  //   return () => {}
  // }, [activeStory, currentUser?._id, updateStoryMutation])

  return {
    activeStory,
    currentStory,
    activeStoryIdx,
    storyOwners,
    isBothCurrentUserAndOwner,
    itemsRef,
    hasArrowButtonGroup,
    userStoryMetadata,

    onRightArrowClick,
    onLeftArrowClick,
    onDeleteStory
  }
}
