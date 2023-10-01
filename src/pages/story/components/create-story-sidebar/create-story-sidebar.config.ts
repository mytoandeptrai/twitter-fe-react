import { EStoryType } from '@/constants'
import { TFunction } from 'i18next'

const generateStoryOptions = (t: TFunction) => {
  return [
    {
      value: EStoryType.Text,
      label: t('pages.story.text.text')
    },
    {
      value: EStoryType.Media,
      label: t('pages.story.text.media')
    }
  ]
}

export { generateStoryOptions }
