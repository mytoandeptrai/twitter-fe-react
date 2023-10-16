import React from 'react'
import { EFormType } from '@/constants'
import { RootState } from '@/store'
import { TFunction } from 'i18next'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { BaseSelector } from '../../form'

type Props = {
  renderValue?: (value: EFormType) => React.ReactNode
  onChange: (input: EFormType) => void
}

const generateStoryOptions = (t: TFunction) => {
  return [
    {
      value: EFormType.Delete,
      label: t('pages.story.text.delete'),
      id: uuid(),
      icon: <AiOutlineDelete />
    }
  ]
}

const StoryActionSelector = ({ renderValue, onChange }: Props) => {
  const currentLanguage = useSelector((state: RootState) => state.appState.language)
  const { t } = useTranslation()

  const options = useMemo(() => {
    return generateStoryOptions(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, t])

  return <BaseSelector<EFormType> options={options} renderValue={renderValue} onChange={onChange} />
}

export default memo(StoryActionSelector)
