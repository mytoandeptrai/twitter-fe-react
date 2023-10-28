import { useSearchService, useUserService } from '@/services'
import { IUser } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
type Props = {
  members: IUser[]
  onCloseAddMember: () => void
  onAddNewMember: (users: IUser[]) => void
}

export const useRoomAddUser = ({ members, onAddNewMember, onCloseAddMember }: Props) => {
  const { getCurrentUser } = useUserService()
  const { getSearchRequest } = useSearchService()
  const [suggestions, setSuggestions] = useState<IUser[]>([])
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currentUser = getCurrentUser()

  const onFilterUserResponse = useCallback(
    (responseData: IUser[] | [], currentUserId: string, currentMembers: IUser[]) => {
      if (!!responseData.length) {
        /** Filter user with not current user and users are not in current members in group */
        const newUsers = responseData.filter(
          (user: IUser) => user._id !== currentUserId && !currentMembers.some((member) => member._id === user._id)
        )

        return newUsers
      }

      return []
    },
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (!currentUser?._id) return
      setIsLoading(true)
      const query = {
        search: value,
        category: 'user'
      }
      const response = await getSearchRequest<IUser>(query)
      const filterUsers = onFilterUserResponse(response.data as IUser[], currentUser?._id, members)
      setSuggestions(filterUsers)
      setIsLoading(false)
    }, 500),
    []
  )

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      !!value.trim() && debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const onToggleAddSelectedUser = useCallback(
    (user: IUser) => {
      if (!currentUser?._id) return
      const hasSelected = selectedUsers.some((us) => us._id === currentUser?._id || us._id === user._id)

      if (hasSelected) {
        setSelectedUsers((prev) => [...prev].filter((us) => us._id !== user._id))
        return
      }

      setSelectedUsers((prev) => [...prev, user])
    },
    [currentUser?._id, selectedUsers]
  )

  const onAddUsersToMemberList = useCallback(
    (selectedUsers: IUser[]) => {
      onAddNewMember(selectedUsers)
      onCloseAddMember()
    },
    [onAddNewMember, onCloseAddMember]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  return {
    suggestions,
    selectedUsers,
    isLoading,

    onSearch,
    onToggleAddSelectedUser,
    onAddUsersToMemberList,
    onCloseAddMember
  }
}
