import { useCallback, useState } from 'react'

const initialVisibleValues = {
  isVisibleMedia: true,
  isShowRecord: false
}

type Props = {
  onSubmit: (event: any) => void
  onChangeInputMessage: (e: any) => void
  onChangeInputFile: (file: File) => void
  value: string
}

export const useTextMessageForm = ({ value, onChangeInputMessage, onChangeInputFile, onSubmit }: Props) => {
  const [visibleValues, setVisibleValues] = useState(initialVisibleValues)

  const onToggleVisibleMedia = () => setVisibleValues((prev) => ({ ...prev, isVisibleMedia: !prev.isVisibleMedia }))
  const onToggleShowRecord = () => setVisibleValues((prev) => ({ ...prev, isShowRecord: !prev.isShowRecord }))

  const onEmojiClick = (emoji: string, value: string) => {
    const textValue = `${value}${emoji}`
    const event = {
      target: {
        value: textValue
      }
    }
    onChangeInputMessage(event)
  }

  const onChangeFile = useCallback(
    (files: FileList) => {
      const file = files?.[0]
      if (file?.type.includes('image')) {
        onChangeInputFile(file)
      }
    },
    [onChangeInputFile]
  )

  return {
    visibleValues,
    value,

    onChangeInputMessage,
    onChangeFile,
    onEmojiClick,
    onToggleVisibleMedia,
    onToggleShowRecord,
    onSubmit
  }
}
