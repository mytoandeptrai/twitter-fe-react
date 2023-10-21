import { EUserListType } from '@/constants'
import { BaseControlledRef, IUser } from '@/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateUserList, generateUserListHeader } from '../user-overview-statistics.config'

export const useUserOverViewStatistics = (user: IUser) => {
  const { t } = useTranslation()
  const [type, setType] = useState<EUserListType | ''>('')
  const userListModalRef = useRef<BaseControlledRef>(null)

  const modalUserLisHeader = useMemo(() => {
    return generateUserListHeader(t, type)
  }, [t, type])

  const userList = useMemo(() => {
    return generateUserList(user, type)
  }, [type, user])

  const showUserListModal = useCallback((userListType: EUserListType) => {
    if (userListModalRef.current && userListModalRef.current?.show) {
      setType(userListType)
      userListModalRef.current?.show()
    }
  }, [])

  return {
    type,
    modalUserLisHeader,
    userList,
    userListModalRef,
    showUserListModal
  }
}
