import { RootState } from '@/store'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import { IoMaleFemaleSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { BaseSelector } from '../../form'

type Props = {
  defaultValue?: number
  onChange: (input: number) => void
}

const GenderSelector = ({ defaultValue, onChange }: Props) => {
  const currentLanguage = useSelector((state: RootState) => state.appState.language)
  const { t } = useTranslation()

  const options = useMemo(() => {
    return [
      {
        value: 0,
        label: t('common.text.male'),
        id: uuid(),
        icon: <IoMdMale />
      },
      {
        value: 1,
        label: t('common.text.female'),
        id: uuid(),
        icon: <IoMdFemale />
      },
      {
        value: 2,
        label: t('common.text.other'),
        id: uuid(),
        icon: <IoMaleFemaleSharp />
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage])

  return <BaseSelector<number> options={options} defaultValue={defaultValue} onChange={onChange} />
}

export default memo(GenderSelector)
