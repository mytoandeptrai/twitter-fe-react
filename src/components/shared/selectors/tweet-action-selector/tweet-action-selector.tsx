import { EFormType } from '@/constants'
import { RootState } from '@/store'
import { TFunction } from 'i18next'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdReportProblem } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { BaseSelector } from '../../form'

type Props = {
  renderValue?: (value: EFormType) => React.ReactNode
  onChange: (input: EFormType) => void
  isAuthor: boolean
}

const generateAuthorOptions = (t: TFunction) => {
  return [
    {
      value: EFormType.Update,
      label: t('pages.tweet.update'),
      id: uuid(),
      icon: <AiOutlineEdit />
    },
    {
      value: EFormType.Delete,
      label: t('pages.tweet.delete'),
      id: uuid(),
      icon: <AiOutlineDelete />
    }
  ]
}

const generateNonAuthorOptions = (t: TFunction) => {
  return [
    {
      value: EFormType.Report,
      label: t('pages.tweet.report'),
      id: uuid(),
      icon: <MdReportProblem />
    }
  ]
}

const TweetActionSelector = ({ renderValue, onChange, isAuthor }: Props) => {
  const currentLanguage = useSelector((state: RootState) => state.appState.language)
  const { t } = useTranslation()

  const options = useMemo(() => {
    return isAuthor ? generateAuthorOptions(t) : generateNonAuthorOptions(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, t, isAuthor])

  return <BaseSelector<EFormType> options={options} renderValue={renderValue} onChange={onChange} />
}

export default memo(TweetActionSelector)
