import { RootState } from '@/store'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { BaseSelector } from '../../form'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdPublic } from 'react-icons/md'

type Props = {
  defaultValue?: number
  onChange: (input: number) => void
}

const AudienceSelector = ({ defaultValue, onChange }: Props) => {
  const currentLanguage = useSelector((state: RootState) => state.appState.language)
  const { t } = useTranslation()

  const options = useMemo(() => {
    return [
      {
        value: 0,
        label: t('common.text.everyone'),
        id: uuid(),
        icon: <MdPublic />
      },
      {
        value: 1,
        label: t('common.text.followers'),
        id: uuid(),
        icon: <BsFillPeopleFill />
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage])

  return <BaseSelector<number> options={options} defaultValue={defaultValue} onChange={onChange} />
}

export default memo(AudienceSelector)
